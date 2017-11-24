const _ = require('lodash')

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

function createDescriptor (def, clients, proto) {
  /**
   * @name descriptor
   * @public
   * @class
   * Protocol Buffer utility descriptor represents friendlier descriptor object with utility methods for
   * protocol buffer inspection.
   * @type {Object}
   */
  const descriptor = {
    /**
     * Returns an array of namespace names within the protocol buffer definition
     * @return {Array} array of names
     * @memberof descriptor
     * @example
     * const grpcinspect = require('grpc-inspect')
     * const grpc = require('grpc')
     * const pbpath = path.resolve(__dirname, './route_guide.proto')
     * const proto = grpc.load(pbpath)
     * const d = grpcinspect(proto)
     * console.log(d.namespaceNames()) // ['routeguide']
     */
    namespaceNames: function () {
      return _.keys(this.namespaces)
    },

    /**
     * Returns an array of service names
     * @param {String} namespace Optional name of namespace to get services.
     *                           If not present returns service names of all services within the definition.
     * @return {Array} array of names
     * @memberof descriptor
     * @example
     * const grpcinspect = require('grpc-inspect')
     * const grpc = require('grpc')
     * const pbpath = path.resolve(__dirname, './route_guide.proto')
     * const proto = grpc.load(pbpath)
     * const d = const grpcinspect(proto)
     * console.log(d.serviceNames()) // ['RouteGuide']
     */
    serviceNames: function (namespace) {
      if (namespace) {
        if (!this.namespaces[namespace]) {
          return []
        }
        return _.keys(this.namespaces[namespace].services)
      } else {
        const r = []
        _.forOwn(this.namespaces, n => r.push(..._.keys(n.services)))
        return r
      }
    },

    /**
     * Returns the utility descriptor for the service given a servie name.
     * Assumes there are no duplicate service names within the definition.
     * @param {String} service name of the service
     * @return {Object} service utility descriptor
     * @memberof descriptor
     * @example
     * const grpcinspect = require('grpc-inspect')
     * const grpc = require('grpc')
     * const pbpath = path.resolve(__dirname, './route_guide.proto')
     * const proto = grpc.load(pbpath)
     * const d = grpcinspect(proto)
     * console.dir(d.service('RouteGuide'))
     */
    service: function (service) {
      let s
      const ns = _.values(this.namespaces)
      if (!ns || !ns.length) {
        return s
      }

      for (let i = 0; i < ns.length; i++) {
        const n = ns[i]
        if (n.services[service]) {
          s = n.services[service]
          break
        }
      }

      return s
    },

    /**
     * Returns an array of method names for a service
     * @param {String} service name of the service
     * @return {Array} array of names
     * @memberof descriptor
     * @example
     * const grpcinspect = require('grpc-inspect')
     * const grpc = require('grpc')
     * const pbpath = path.resolve(__dirname, './route_guide.proto')
     * const proto = grpc.load(pbpath)
     * const d = grpcinspect(proto)
     * console.log(d.methodNames('RouteGuide')) // [ 'GetFeature', 'ListFeatures', 'RecordRoute', 'RouteChat' ]
     */
    methodNames: function (service) {
      const s = this.service(service)
      return s ? _.map(s.methods, 'name') : []
    },

    /**
     * Returns an array the utility descriptors for the methods of a service.
     * Assumes there are no duplicate service names within the definition.
     * @param {String} service name of the service
     * @return {Array} array of method utility descriptors
     * @memberof descriptor
     * @example
     * const grpcinspect = require('grpc-inspect')
     * const grpc = require('grpc')
     * const pbpath = path.resolve(__dirname, './route_guide.proto')
     * const proto = grpc.load(pbpath)
     * const d = grpcinspect(proto)
     * console.dir(d.methods('RouteGuide'))
     */
    methods: function (service) {
      const s = this.service(service)
      return s ? s.methods || [] : []
    },

    /**
     * Returns the internal proto object
     * @return {Object} the internal proto object
     * @memberof descriptor
     * @example
     * const grpcinspect = require('grpc-inspect')
     * const grpc = require('grpc')
     * const pbpath = path.resolve(__dirname, './route_guide.proto')
     * const proto = grpc.load(pbpath)
     * const d = grpcinspect(proto)
     * console.dir(d.proto())
     */
    proto: function () {
      return proto
    },

    /**
     * Gets the gRPC service / client object / function
     * @param  {serviceName} serviceName The service name
     * @return {Object} the Client object
     * @memberof descriptor
     * @example
     * const grpcinspect = require('grpc-inspect')
     * const grpc = require('grpc')
     * const pbpath = path.resolve(__dirname, './route_guide.proto')
     * const proto = grpc.load(pbpath)
     * const d = grpcinspect(proto)
     * console.dir(d.client('RouteGuide'))
     */
    client: function (serviceName) {
      return clients[serviceName]
    }
  }

  return Object.assign(Object.create(descriptor), def)
}

function isMessage (obj) {
  return ((typeof obj.name === 'string' && obj.name.toLowerCase() === 'message') || !obj.service)
}

function isService (v) {
  return !!(v && typeof v === 'function' && v.super_ && typeof v.super_ === 'function')
}

function hasPackage (proto) {
  let hasPkg = false
  _.forOwn(proto, (nv, k) => {
    if (!hasPkg) {
      _.forOwn(nv, (v, k) => {
        if (v && typeof v === 'function' && v.super_ && typeof v.super_ === 'function') {
          hasPkg = true
        }
      })
    }
  })

  if (hasPkg) {
    return hasPkg
  }

  _.forOwn(proto, (nv, k) => {
    if (!hasPkg) {
      _.forOwn(nv, (v, k) => {
        if (v && typeof v === 'function' && v.encode && typeof v.encode === 'function') {
          hasPkg = true
        }
      })
    }
  })

  if (hasPkg) {
    return hasPkg
  }

  let packageDetected = false
  _.forOwn(proto, (nv, k) => {
    if (nv && typeof nv === 'function' && nv.super_ && typeof nv.super_ === 'function') {
      packageDetected = true
    }
  })

  if (packageDetected) {
    return false
  }

  _.forOwn(proto, (nv, k) => {
    if (!hasPkg) {
      _.forOwn(nv, (v, k) => {
        if (v && _.isPlainObject(v)) {
          hasPkg = true
        }
      })
    }
  })

  return hasPkg
}

function hasService (proto, hasPackage) {
  let hasSrvc = false
  _.forOwn(proto, (nv, k) => {
    if (!hasPackage) {
      if (!hasSrvc) {
        hasSrvc = isService(nv)
      }
    } else {
      _.forOwn(nv, (v, kk) => {
        if (!hasSrvc) {
          hasSrvc = isService(v)
        }
      })
    }
  })

  return hasSrvc
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

  // check if the proto specifies a package name
  const hasPkg = hasPackage(proto)
  const hasSrvc = hasService(proto, hasPkg)

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

  return createDescriptor(def, clients, proto)
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
