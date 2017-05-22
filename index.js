const _ = require('lodash')
const grpc = require('grpc')

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
     * const grpcinstect = require('grpc-inspect')
     * const pbpath = path.resolve(__dirname, './route_guide.proto')
     * const d = grpcinstect(pbpath)
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
     * const grpcinstect = require('grpc-inspect')
     * const pbpath = path.resolve(__dirname, './route_guide.proto')
     * const d = const grpcinstect(pbpath)
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
     * const grpcinstect = require('grpc-inspect')
     * const pbpath = path.resolve(__dirname, './route_guide.proto')
     * const d = grpcinstect(pbpath)
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
     * const grpcinstect = require('grpc-inspect')
     * const pbpath = path.resolve(__dirname, './route_guide.proto')
     * const d = grpcinstect(pbpath)
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
     * const grpcinstect = require('grpc-inspect')
     * const pbpath = path.resolve(__dirname, './route_guide.proto')
     * const d = grpcinstect(pbpath)
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
     * const grpcinstect = require('grpc-inspect')
     * const pbpath = path.resolve(__dirname, './route_guide.proto')
     * const d = grpcinstect(pbpath)
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
     * const grpcinstect = require('grpc-inspect')
     * const pbpath = path.resolve(__dirname, './route_guide.proto')
     * const d = grpcinstect(pbpath)
     * console.dir(d.client('RouteGuide'))
     */
    client: function (serviceName) {
      return clients[serviceName]
    }
  }

  return Object.assign(Object.create(descriptor), def)
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

  const isPB6 = Boolean(proto.nested)
  const po = isPB6 ? proto.nested : proto

  _.forOwn(po, (nv, k) => {
    const namespace = {
      name: k,
      messages: {},
      services: {}
    }

    _.forOwn(nv, (npv, k) => {
      if (!isPB6 && ((typeof npv.name === 'string' && npv.name.toLowerCase() === 'message') || !npv.service)) {
        namespace.messages[k] = {
          name: k
        }
      }
    })

    _.forOwn(nv, (npv, k) => {
      if (isPB6 && npv && !npv.nested) {
        if (_.isObject(npv) && !npv.methods) {
          const msg = mapp(npv, TYPE_PROPS)
          if (msg.name) {
            msg.fields = _.map(npv.fields, getFieldDef)
            namespace.messages[msg.name] = msg
          }
        } else if (_.isObject(npv)) {
          clients[k] = npv
          const srvc = createPB6Service(npv, namespace)
          namespace.services[k] = srvc
        }
      } else if (npv && !isPB6 && ((_.isString(npv.name) && npv.name.toLowerCase() === 'client') || (npv.service))) {
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
          }
        } else {
          throw new Error('Unsupported service format')
        }
      }
    })

    def.namespaces[namespace.name] = namespace
  })

  return createDescriptor(def, clients, proto)
}

function createPB6Service (npv, namespace) {
  const srvc = mapp(npv, SERVICE_PROPS)
  delete srvc.options
  srvc.package = namespace.name
  srvc.methods = []
  _.forOwn(npv.methods, (method, methodName) => {
    const md = mapp(method, METHOD_PROPS)
    if (_.isUndefined(md.responseStream)) {
      md.responseStream = false
    }
    if (_.isUndefined(md.requestStream)) {
      md.requestStream = false
    }
    if (md.requestType && !md.requestName) {
      md.requestName = md.requestType
    }
    if (md.responseType && !md.responseName) {
      md.responseName = md.responseType
    }
    delete md.responseType
    delete md.requestType
    delete md.type
    srvc.methods.push(md)
  })
  return srvc
}

function doProto13 (k, def, namespace, npv) {
  const srvc = mapp(npv, SERVICE_PROPS)
  srvc.name = k
  srvc.package = namespace.name
  srvc.methods = []

  _.forOwn(npv.service, (method, methodName) => {
    const name = method.originalName
    const md = mapp(method, METHOD_PROPS_13)
    md.name = name
    if (_.has(method, 'requestType.name')) {
      md.requestName = _.get(method, 'requestType.name')

      // fill in the message in the name space from the request type
      if (!namespace.messages[method.requestType.name]) {
        namespace.messages[method.requestType.name] = {
          name: method.requestType.name
        }
      }
      if (!namespace.messages[method.requestType.name].fields) {
        const fields = _.map(method.requestType._fields, getFieldDef)
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
        namespace.messages[method.requestType.name] = {
          name: method.requestType.name
        }
      }
      if (!namespace.messages[method.responseType.name].fields) {
        const fields = _.map(method.responseType._fields, getFieldDef)
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
 * @param  {Object} loaded proto object
 * @return {Object} the utility descriptor
 * @example
 * const gi = require('grpc-inspect')
 * const pbpath = path.resolve(__dirname, './route_guide.proto')
 * const d = gi(pbpath)
 * console.dir(d)
 */
function grpcinspect (input, root) {
  let proto
  if (_.isString(input) && _.isString(root)) {
    proto = grpc.load({ file: input, root: root })
  } else if (_.isString(input)) {
    proto = grpc.load(input)
  } else if (_.isObject(input)) {
    proto = input
  } else {
    throw new Error('Invalid input type. Expected a string')
  }

  return create(proto)
}
