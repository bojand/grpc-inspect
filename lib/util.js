const _ = require('lodash')
const traverse = require('traverse')

function isGRPCMessage (v) {
  return v && typeof v === 'function' && v.encode && typeof v.encode === 'function'
}

function isPBMessage (v) {
  return v && v.name && _.isString(v.name) && _.isObject(v.fields) && _.isObject(v.parent)
}

function getMessages (proto) {
  const messages = []
  let ptype = ''
  let isMsg = false
  traverse(proto).forEach(function (v) {
    isMsg = isGRPCMessage(v)
    if (!ptype && isMsg) {
      ptype = 'grpc'
    }
    if ((!ptype || ptype === 'pb') && !isMsg) {
      isMsg = !this.circular && this.path.indexOf('nested') === -1 && isPBMessage(v)
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
      messages.push({
        name: this.key,
        path: this.path,
        namespace
      })
    }
  })

  return messages
}

function getServices (proto) {
  const services = []
  traverse(proto).forEach(function (v) {
    if (v && typeof v === 'function' && v.service) {
      let namespace = ''
      if (this.path && this.path.length > 1) {
        const nsPath = _.clone(this.path)
        nsPath.pop()
        namespace = nsPath.join('.')
      }
      services.push({
        name: this.key,
        path: this.path,
        namespace,
        client: v,
        service: v.service
      })
    }
  })

  return services
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

exports.isGRPCMessage = isGRPCMessage
exports.isPBMessage = isPBMessage
exports.getMessages = getMessages
exports.getServices = getServices
exports.createDescriptor = createDescriptor
