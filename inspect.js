const _ = require('lodash')
const lib = require('lib')

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
