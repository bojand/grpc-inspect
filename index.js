const _ = require('lodash')
const util = require('./lib/util')

const TYPE_PROPS = ['name', 'options', 'extensions']
const FIELD_PROPS = ['options', 'name', 'type', 'rule', 'id', 'extend', 'required', 'optional', 'repeated', 'map', 'defaultValue', 'long']
const SERVICE_PROPS = ['name', 'options', 'path']
const METHOD_PROPS = ['name', 'options', 'type', 'requestType', 'requestStream', 'responseType', 'responseStream', 'requestName', 'responseName']
const METHOD_PROPS_13 = ['name', 'options', 'type', 'requestStream', 'responseStream', 'requestName', 'responseName']

module.exports = grpcinspect

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

function isMessage (obj) {
  return ((typeof obj.name === 'string' && obj.name.toLowerCase() === 'message') || !obj.service)
}

function hasPackage (messages, services) {
  const inMessages = _(messages)
    .map('namespace')
    .compact()
    .value()

  if (inMessages.length > 0) {
    return true
  }

  const inServices = _(services)
    .map('namespace')
    .compact()
    .value()

  return inServices.length > 0
}

function create (proto) {
  if (!proto) {
    return {}
  }

  const def = {
    namespaces: {}
  }

  const clients = {}

  if (proto.options) {
    def.options = proto.options
  }

  const messages = util.getMessages(proto)
  const services = util.getServices(proto)
  const hasPkg = hasPackage(messages, services)
  const hasSrvc = services.length > 0

  _.forOwn(proto, (nv, k) => {
    const packageName = hasPkg ? k : ''
    const serviceObject = hasPkg ? nv : proto

    const namespace = {
      name: packageName,
      messages: {},
      services: {}
    }

    _.forOwn(serviceObject, (npv, k) => {
      if (isMessage(npv)) {
        namespace.messages[k] = {
          name: k
        }
      }
    })

    if (hasSrvc) {
      _.forOwn(serviceObject, (npv, k) => {
        if (npv &&
          (((_.isString(npv.name) && npv.name.toLowerCase() === 'client') || (npv.service)) ||
            (npv && typeof npv === 'function' && npv.super_ && typeof npv.super_ === 'function'))) {
          clients[k] = npv

          if (_.has(npv, 'service.parent.children')) {
            doProto12(k, def, namespace, npv)
          } else if (npv.service) {
            const nskeys = Object.keys(npv.service)
            if (nskeys && nskeys.length) {
              const zk = nskeys[0]
              if (npv.service[zk] && npv.service[zk].originalName) {
                doProto13(k, def, namespace, npv)
              }
            } else {
              doProto13(k, def, namespace, npv)
            }
          } else {
            throw new Error('Unsupported service format')
          }
        }
      })
    }

    def.namespaces[namespace.name] = namespace
  })

  return util.createDescriptor(def, clients, proto)
}

function doProto13 (k, def, namespace, npv) {
  const srvc = mapp(npv, SERVICE_PROPS)
  srvc.name = k
  srvc.package = namespace.name
  srvc.methods = []

  _.forOwn(npv.service, (method, methodName) => {
    const name = method.originalName
    const md = mapp(method, METHOD_PROPS_13)
    md.name = name || methodName
    if (_.has(method, 'requestType.name')) {
      md.requestName = _.get(method, 'requestType.name')

      // fill in the message in the name space from the request type
      if (!namespace.messages[method.requestType.name]) {
        namespace.messages[method.requestType.name] = {
          name: method.requestType.name
        }
      }
      if (!namespace.messages[method.requestType.name].fields) {
        const fp = method.requestType._fields || method.requestType.fields
        const fields = _.map(fp, getFieldDef)
        namespace.messages[method.requestType.name].fields = fields
      }

      // fill in options if not there
      if ((!def.options || _.isEmpty(def.options)) &&
        (_.has(method, 'requestType.parent.options') && !_.isEmpty(method.requestType.parent.options))) {
        def.options = method.requestType.parent.options
      }
    }
    if (_.has(method, 'responseType.name')) {
      md.responseName = _.get(method, 'responseType.name')

      // fill in the message in the name space from the response type
      if (!namespace.messages[method.responseType.name]) {
        namespace.messages[method.responseType.name] = {
          name: method.responseType.name
        }
      }
      if (!namespace.messages[method.responseType.name].fields) {
        const fp = method.responseType._fields || method.responseType.fields
        const fields = _.map(fp, getFieldDef)
        namespace.messages[method.responseType.name].fields = fields
      }
    }

    srvc.methods.push(md)
  })

  namespace.services[k] = srvc
}

function doProto12 (k, def, namespace, npv) {
  const srvc = mapp(npv, SERVICE_PROPS)
  srvc.name = k
  srvc.package = namespace.name

  const msgChildren = _.get(npv, 'service.parent.children')
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
          namespace.messages[msg.name] = msg
        }
      }
    })
  }

  const srvcChidren = _.get(npv, 'service.children')
  if (srvcChidren &&
    Array.isArray(srvcChidren) &&
    srvcChidren.length) {
    srvc.methods = _.map(srvcChidren, m => mapp(m, METHOD_PROPS))
  }

  // if (_.has(npv, 'service.options') && !_.isEmpty(npv.service.options)) {
  //   srvc.options = npv.service.options
  // }

  namespace.services[k] = srvc

  if ((!def.options || _.isEmpty(def.options)) &&
    (_.has(npv, 'service.parent.options') && !_.isEmpty(npv.service.parent.options))) {
    def.options = npv.service.parent.options
  }
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
