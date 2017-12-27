const _ = require('lodash')
const util = require('./util')

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

  const messages = util.getMessages(proto)
  const services = util.getServices(proto)
  const hasPkg = hasPackage(messages, services)
  const hasSrvc = services.length > 0

  if (proto.options) {
    def.options = proto.options
  }

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

  messages.forEach(m => {
    if (!def.namespaces[m.namespace]) {
      def.namespaces[m.namespace] = {
        name: m.namespace,
        messages: {},
        services: {}
      }
    }

    if (def.namespaces[m.namespace]) {
      if (!def.namespaces[m.namespace].messages) {
        def.namespaces[m.namespace].messages = {}
      }

      if (!def.namespaces[m.namespace].messages[m.name]) {
        def.namespaces[m.namespace].messages[m.name] = {
          name: m.name
        }
      }
    }
  })

  services.forEach(s => {
    if (!def.namespaces[s.namespace]) {
      def.namespaces[s.namespace] = {
        name: s.namespace,
        messages: {},
        services: {}
      }
    }

    if (def.namespaces[s.namespace]) {
      if (!def.namespaces[s.namespace].services) {
        def.namespaces[s.namespace].services = {}
      }

      if (!def.namespaces[s.namespace].services[s.name]) {
        def.namespaces[s.namespace].services[s.name] = {
          name: s.name
        }
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
