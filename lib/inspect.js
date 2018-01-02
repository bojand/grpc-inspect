const _ = require('lodash')
const traverse = require('traverse')
const util = require('./util')

const METHOD_PROPS = ['name', 'options', 'type', 'requestStream', 'responseStream', 'requestName', 'responseName' /*, 'requestType', 'responseType' */ ]
const FIELD_PROPS = ['options', 'name', 'type', 'rule', 'id', 'extend', 'required', 'optional', 'repeated', 'map', 'defaultValue', 'long']
const TYPE_PROPS = ['name', 'options', 'extensions']

function mapp (t, props) {
  return _.pickBy(_.pick(t, props), v => {
    if (_.isNull(v) || _.isUndefined(v)) {
      return false
    } else if (_.isObject(v) && _.isEmpty(v)) {
      return false
    }
    return true
  })
}

function getFieldDef (f) {
  const nf = mapp(f, FIELD_PROPS)
  if (_.isObject(f.resolvedType) && f.resolvedType.name) {
    nf.type = f.resolvedType.name
  } else if (_.isObject(f.type) && f.type.name) {
    nf.type = f.type.name
  }
  return nf
}

function getMessage (service) {
  const msgChildren = _.get(service, 'service.parent.children')
  if (msgChildren &&
    Array.isArray(msgChildren) &&
    msgChildren.length) {
    msgChildren.forEach(c => {
      let isMsg = true
      if (_.isString(c.className) && c.className.toLowerCase() === 'service') {
        isMsg = false
      }
      if (isMsg) {
        const msg = mapp(c, TYPE_PROPS)
        if (msg.name) {
          msg.fields = _.map(c._fields, getFieldDef)
          return msg
        }
      }
    })
  }
}

function getRequestMessage (method) {
  let rm = {}
  if (_.has(method, 'requestType.name')) {
    rm.name = method.requestType.name
    const fp = method.requestType._fields || method.requestType.fields
    rm.fields = _.map(fp, getFieldDef)
  }
  return rm
}

function getResponseMessage (method) {
  let rm = {}
  if (_.has(method, 'responseType.name')) {
    rm.name = method.responseType.name
    const fp = method.responseType._fields || method.responseType.fields
    rm.fields = _.map(fp, getFieldDef)
  }
  return rm
}

function create (proto) {
  if (!proto) {
    return {}
  }

  const def = {
    namespaces: {}
  }

  if (proto.options) {
    def.options = proto.options
  }

  let clients = {}

  const messages = util.getMessages(proto)
  const services = util.getServices(proto)
  const ns1 = _.map(messages, 'namespace')
  const ns2 = _.map(services, 'namespace')
  const allns = _.concat(ns1, ns2)
  const ns = _.uniq(allns)

  ns.forEach(n => {
    def.namespaces[n] = {
      name: n,
      messages: {},
      services: {}
    }
  })

  // services.forEach(s => {
  //   if (!def.namespaces[s.namespace]) {
  //     def.namespaces[s.namespace] = {
  //       name: s.namespace,
  //       messages: {},
  //       services: {}
  //     }
  //   }

  //   if (def.namespaces[s.namespace]) {
  //     if (!def.namespaces[s.namespace].services) {
  //       def.namespaces[s.namespace].services = {}
  //     }

  //     if (!def.namespaces[s.namespace].services[s.name]) {
  //       def.namespaces[s.namespace].services[s.name] = {
  //         name: s.name
  //       }
  //     }
  //   }
  // })

  traverse(proto).forEach(function (v) {
    if (v &&
      (((_.isString(v.name) && v.name.toLowerCase() === 'client') || (v.service)) ||
        (v && typeof npv === 'function' && v.super_ && typeof v.super_ === 'function'))) {
      clients[this.key] = v
    }

    if (v && typeof v === 'function' && v.service) {
      let namespace = ''
      if (this.path && this.path.length > 1) {
        const nsPath = _.clone(this.path)
        nsPath.pop()
        namespace = nsPath.join('.')
      }

      if (!def.namespaces) {
        def.namespaces = {}
      }

      if (!def.namespaces[namespace]) {
        def.namespaces[namespace] = {
          name: namespace,
          messages: {},
          services: {}
        }
      }

      let methods = []

      const methodNames = _.keys(v.service)
      if (methodNames.length > 0) {
        methods = _.map(v.service, (m, name) => {
          const md = mapp(m, METHOD_PROPS)
          md.name = m.originalName || name

          // mutate messages into definition
          if (_.isObject(m.requestType) && m.requestType.name) {
            md.requestName = m.requestType.name
            if (!def.namespaces[namespace].messages[md.requestName]) {
              const rtmd = getRequestMessage(m)
              if (rtmd) {
                def.namespaces[namespace].messages[md.requestName] = rtmd
              }
            }
          }
          if (_.isObject(m.responseType) && m.responseType.name) {
            md.responseName = m.responseType.name
            if (!def.namespaces[namespace].messages[md.responseName]) {
              const rtmd = getResponseMessage(m)
              if (rtmd) {
                def.namespaces[namespace].messages[md.responseName] = rtmd
              }
            }
          }
          const msgd = getMessage(v.service)
          if (msgd && msgd.name) {
            if (!def.namespaces[namespace].messages[msgd.name]) {
              def.namespaces[namespace].messages[msgd.name] = msgd
            }
          }

          // fill in options if not there
          if ((!def.options || _.isEmpty(def.options)) &&
            (_.has(m, 'requestType.parent.options') && !_.isEmpty(m.requestType.parent.options))) {
            def.options = m.requestType.parent.options
          }

          return md
        })
      }

      def.namespaces[namespace].services[this.key] = {
        name: this.key,
        package: namespace,
        methods
      }

      let nsd = def.namespaces[namespace]
      if (!nsd || !nsd.messages || !nsd.messages.length) {
        messages.forEach(m => {
          if (m.namespace === nsd.name) {
            if (!nsd.messages) {
              nsd.messages = {}
            }
            nsd.messages[m.name] = {
              name: m.name
            }
          }
        })
      }
    }
  })

  return util.createDescriptor(def, clients, proto)
}

/**
 * Returns protocol buffer utility descriptor.
 * Takes a loaded grpc / protocol buffer object and returns a friendlier descriptor object
 * @param  {Object} input loaded proto object
 * @return {Object} the utility descriptor
 * @example
 * const gi = require('grpc-inspect')
 * const grpc = require('grpc')
 * const pbpath = path.resolve(__dirname, './route_guide.proto')
 * const proto = grpc.load(pbpath)
 * const d = gi(proto)
 * console.dir(d)
 */
function grpcinspect (input) {
  let proto
  if (_.isObject(input)) {
    proto = input
  } else {
    throw new Error('Invalid input type. Expected an object')
  }

  return create(proto)
}

exports.inspect = grpcinspect
exports.create = create
