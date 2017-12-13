import test from 'ava'
import path from 'path'
import grpc from 'grpc'

const lib = require('../lib')

const BASE_PATH = path.resolve(__dirname, './protos')
const PROTO_PATH = BASE_PATH + '/common-no-package.proto'

const loaded = grpc.load(PROTO_PATH)

test('getMessages', t => {
  const actual = lib.getMessages(loaded)
  console.dir(actual, {depth: 3, colors: true})
  const expected = [{ name: 'Point', path: ['routeguide', 'Point'] },
    { name: 'Rectangle', path: ['routeguide', 'Rectangle'] },
    { name: 'Feature', path: ['routeguide', 'Feature'] },
    { name: 'RouteNote', path: ['routeguide', 'RouteNote'] },
    { name: 'RouteSummary', path: ['routeguide', 'RouteSummary'] }
  ]

//   t.deepEqual(actual, expected)
})

test('getServices', t => {
  const actual = lib.getServices(loaded)
  console.dir(actual, {depth: 3, colors: true})
//   t.equal(actual.name, 'RouteGuide')
//   t.deepEqual(actual.path, ['routeguide', 'RouteGuide'])
//   t.truthy(actual.client)
//   t.truthy(actual.service)
})

// test('getMessageDescriptors', t => {
//   console.dir(loaded, {depth: 7, colors: true})
//   const actual = lib.getMessageDescriptors(loaded)
//   console.dir(actual, {depth: 3, colors: true})
// })
