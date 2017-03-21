const _ = require('lodash')
const grpc = require('grpc')

const TYPE_PROPS = ['name', 'options', 'extensions']
const FIELD_PROPS = ['options', 'name', 'type', 'rule', 'id', 'extend', 'required', 'optional', 'repeated', 'map', 'defaultValue', 'long']
const SERVICE_PROPS = ['name', 'options']
const METHOD_PROPS = ['name', 'options', 'type', 'requestType', 'requestStream', 'responseType', 'responseStream', 'requestName', 'responseName']

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

  _.forOwn(proto, (nv, k) => {
    const namespace = {
      name: k,
      messages: {},
      services: {}
    }

    _.forOwn(nv, (npv, k) => {
      if ((typeof npv.name === 'string' && npv.name.toLowerCase() === 'message') || !npv.service) {
        namespace.messages[k] = {
          name: k
        }
      }
    })

    _.forOwn(nv, (npv, k) => {
      if ((_.isString(npv.name) && npv.name.toLowerCase() === 'client') || (npv.service)) {
        clients[k] = npv

        const srvc = mapp(npv, SERVICE_PROPS)
        srvc.name = k

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
                msg.fields = _.map(c._fields, f => {
                  const nf = mapp(f, FIELD_PROPS)
                  if (_.isObject(f.resolvedType) && f.resolvedType.name) {
                    nf.type = f.resolvedType.name
                  } else if (_.isObject(f.type) && f.type.name) {
                    nf.type = f.type.name
                  }
                  return nf
                })
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

        namespace.services[k] = srvc

        if ((!def.options || _.isEmpty(def.options)) &&
          (_.has(npv, 'service.parent.options') && !_.isEmpty(npv.service.parent.options))) {
          def.options = npv.service.parent.options
        }
      }
    })
    def.namespaces[namespace.name] = namespace
  })

  return createDescriptor(def, clients, proto)
}

/**
 * Returns protocol buffer utility descriptor.
 * Takes a path to proto definition file and loads it using <code>grpc</code> and generates a
 * friendlier descriptor object with utility methods.
 * If object is passed it's assumed to be an already loaded proto.
 * @param  {String|Object} input path to proto definition or loaded proto object
 * @param  {String} root specify the directory in which to search for imports
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
    proto = grpc.load({file: input, root: root})
  } else if (_.isString(input)) {
    proto = grpc.load(input)
  } else if (_.isObject(input)) {
    proto = input
  } else {
    throw new Error('Invalid input type. Expected a string')
  }

  return create(proto)
}
