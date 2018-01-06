const _ = require('lodash')
const traverse = require('traverse')
const util = require('./util')

const METHOD_PROPS = ['name', 'options', 'type', 'requestStream', 'responseStream', 'requestName', 'responseName'] /*, 'requestType', 'responseType' */
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

  let ptype = ''
  traverse(proto).forEach(function (v) {
    // collect client(s)
    if (v &&
      (((_.isString(v.name) && v.name.toLowerCase() === 'client') || (v.service)) ||
        (v && typeof npv === 'function' && v.super_ && typeof v.super_ === 'function'))) {
      clients[this.key] = v
    }

    // collect messages
    let isMsg = util.isGRPCMessage(v)
    if (!ptype && isMsg) {
      ptype = 'grpc'
    }
    if ((!ptype || ptype === 'pb') && !isMsg) {
      isMsg = !this.circular && this.path.indexOf('nested') === -1 && util.isPBMessage(v)
      if (!ptype && isMsg) {
        ptype = 'pb'
      }
    }
    if ((!ptype || ptype === 'pbload') && !isMsg) {
      isMsg = _.isPlainObject(v) && _.isEmpty(v)
      if (!ptype && isMsg) {
        ptype = 'pbload'
      }
    }
    if (isMsg) {
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

      const msg = mapp(v, TYPE_PROPS)

      if (!msg.name || (msg.name && msg.name !== this.key)) {
        msg.name = this.key
      }
      if (v._fields || v.fields) {
        msg.fields = _.map(v._fields || v.fields, getFieldDef)
      }
      def.namespaces[namespace].messages[msg.name] = _.merge(def.namespaces[namespace].messages[msg.name] || {}, msg)
    }

    // collect services (along with messages)
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
            const rtmd = getRequestMessage(m)
            if (rtmd) {
              def.namespaces[namespace].messages[md.requestName] = _.merge(def.namespaces[namespace].messages[md.requestName] || {}, rtmd)
            }
          }
          if (_.isObject(m.responseType) && m.responseType.name) {
            md.responseName = m.responseType.name
            const rtmd = getResponseMessage(m)
            if (rtmd) {
              def.namespaces[namespace].messages[md.responseName] = _.merge(def.namespaces[namespace].messages[md.responseName] || {}, rtmd)
            }
          }
          const msgd = getMessage(v.service)
          if (msgd && msgd.name) {
            def.namespaces[namespace].messages[msgd.name] = _.merge(def.namespaces[namespace].messages[msgd.requestName] || {}, msgd)
          }

          // fill in options if not there
          if ((!def.options || _.isEmpty(def.options)) &&
            (_.has(m, 'requestType.parent.options') && !_.isEmpty(m.requestType.parent.options))) {
            def.options = m.requestType.parent.options
          }

          return md
        })
      }

      // set into definition
      def.namespaces[namespace].services[this.key] = {
        name: this.key,
        package: namespace,
        methods
      }

      // for pbjs loaded protos traverse doesn't go into service,
      // so we have to traverse inside manually
      if (ptype === 'pb') {
        traverse(v.service).forEach(function (sv) {
          const isPBMsg = !this.circular && util.isPBMessage(sv)
          if (isPBMsg) {
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

            const msg = mapp(sv, TYPE_PROPS)
            if (msg.name) {
              if (sv._fields || sv.fields) {
                msg.fields = _.map(sv._fields || sv.fields, getFieldDef)
              }
            }
            def.namespaces[namespace].messages[msg.name] = _.merge(def.namespaces[namespace].messages[msg.name] || {}, msg)
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

module.exports = grpcinspect
