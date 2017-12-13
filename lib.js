const _ = require('lodash')
const traverse = require('traverse')

const TYPE_PROPS = ['name', 'options', 'extensions']
const FIELD_PROPS = ['options', 'name', 'type', 'rule', 'id', 'extend', 'required', 'optional', 'repeated', 'map', 'defaultValue', 'long']
const SERVICE_PROPS = ['name', 'options', 'path']
const METHOD_PROPS = ['name', 'options', 'type', 'requestType', 'requestStream', 'responseType', 'responseStream', 'requestName', 'responseName']
const METHOD_PROPS_13 = ['name', 'options', 'type', 'requestStream', 'responseStream', 'requestName', 'responseName']

function getMessages (proto) {
  const messages = []
  traverse(proto).forEach(function (v) {
    if (v && typeof v === 'function' && v.encode && typeof v.encode === 'function') {
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

function getMessageDescriptors (proto) {
  const res = {}
  
  traverse(proto).forEach(function (v) {
    if (v && v.className) {
      services.push({
        name: this.key,
        path: this.path,
        client: v,
        service: v.service
      })
    }
  })

  return res
}

function create (proto) {

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

exports.grpcinspect = grpcinspect
exports.create = create
exports.getMessages = getMessages
exports.getServices = getServices
exports.getgetMessageDescriptors = getMessageDescriptors
