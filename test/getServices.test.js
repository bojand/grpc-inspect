import test from 'ava'
import path from 'path'
import grpc from 'grpc'

const lib = require('../lib')

const BASE_PATH = path.resolve(__dirname, './protos')

test('getServices - common-no-package.proto', t => {
  const protoPath = BASE_PATH + '/common-no-package.proto'
  const loaded = grpc.load(protoPath)
  const actual = lib.getServices(loaded)
  const expected = []
  t.deepEqual(actual, expected)
})

test('getServices - common.proto', t => {
  const protoPath = BASE_PATH + '/common.proto'
  const loaded = grpc.load(protoPath)
  const actual = lib.getServices(loaded)
  const expected = []
  t.deepEqual(actual, expected)
})

test('getServices - dotpkg.proto', t => {
  const protoPath = BASE_PATH + '/dotpkg.proto'
  const loaded = grpc.load(protoPath)
  const actual = lib.getServices(loaded)
  t.truthy(actual)
  t.true(Array.isArray(actual))
  t.truthy(actual[0])
  t.is(actual[0].name, 'FooService')
  t.deepEqual(actual[0].path, [ 'foo', 'bar', 'FooService' ])
  t.is(actual[0].namespace, 'foo.bar')
  t.truthy(actual[0].client)
  t.truthy(actual[0].service)
  t.truthy(actual[0].service.doSomething)
})

test('getServices - empty-service-no-package.proto', t => {
  const protoPath = BASE_PATH + '/empty-service-no-package.proto'
  const loaded = grpc.load(protoPath)
  const actual = lib.getServices(loaded)
  t.truthy(actual)
  t.true(Array.isArray(actual))
  t.truthy(actual[0])
  t.is(actual[0].name, 'RouteGuide')
  t.deepEqual(actual[0].path, [ 'RouteGuide' ])
  t.is(actual[0].namespace, '')
  t.truthy(actual[0].client)
  t.deepEqual(actual[0].service, {})
})

test('getServices - empty-service.proto', t => {
  const protoPath = BASE_PATH + '/empty-service.proto'
  const loaded = grpc.load(protoPath)
  const actual = lib.getServices(loaded)
  t.truthy(actual)
  t.true(Array.isArray(actual))
  t.truthy(actual[0])
  t.is(actual[0].name, 'RouteGuide')
  t.deepEqual(actual[0].path, [ 'routeguide', 'RouteGuide' ])
  t.is(actual[0].namespace, 'routeguide')
  t.truthy(actual[0].client)
  t.deepEqual(actual[0].service, {})
})

test('getServices - human.proto', t => {
  const protoPath = BASE_PATH + '/human.proto'
  const loaded = grpc.load(protoPath)
  const actual = lib.getServices(loaded)
  t.truthy(actual)
  t.true(Array.isArray(actual))
  t.truthy(actual[0])
  t.is(actual[0].name, 'HumanService')
  t.deepEqual(actual[0].path, [ 'human', 'HumanService' ])
  t.is(actual[0].namespace, 'human')
  t.truthy(actual[0].client)
  t.truthy(actual[0].service)
  t.truthy(actual[0].service.makeHuman)
  t.truthy(actual[0].service.addAnimal)
})

test('getServices - no-package-name.proto', t => {
  const protoPath = BASE_PATH + '/no-package-name.proto'
  const loaded = grpc.load(protoPath)
  const actual = lib.getServices(loaded)
  t.truthy(actual)
  t.true(Array.isArray(actual))
  t.truthy(actual[0])
  t.is(actual[0].name, 'Greeter')
  t.deepEqual(actual[0].path, [ 'Greeter' ])
  t.is(actual[0].namespace, '')
  t.truthy(actual[0].client)
  t.truthy(actual[0].service)
  t.truthy(actual[0].service.sayHello)
})

test('getServices - relative_import.proto', t => {
  const protoPath = BASE_PATH + '/relative_import.proto'
  const loaded = grpc.load(protoPath)
  const actual = lib.getServices(loaded)
  t.truthy(actual)
  t.true(Array.isArray(actual))
  t.truthy(actual[0])
  t.is(actual[0].name, 'RelativeImport')
  t.deepEqual(actual[0].path, [ 'relative', 'RelativeImport' ])
  t.is(actual[0].namespace, 'relative')
  t.truthy(actual[0].client)
  t.truthy(actual[0].service)
  t.truthy(actual[0].service.testRelativeImport)
})

test('getServices - route_guide.proto', t => {
  const protoPath = BASE_PATH + '/route_guide.proto'
  const loaded = grpc.load(protoPath)
  const actual = lib.getServices(loaded)
  t.truthy(actual)
  t.true(Array.isArray(actual))
  t.truthy(actual[0])
  t.is(actual[0].name, 'RouteGuide')
  t.deepEqual(actual[0].path, [ 'routeguide', 'RouteGuide' ])
  t.is(actual[0].namespace, 'routeguide')
  t.truthy(actual[0].client)
  t.truthy(actual[0].service)
  t.truthy(actual[0].service.getFeature)
  t.truthy(actual[0].service.listFeatures)
  t.truthy(actual[0].service.recordRoute)
  t.truthy(actual[0].service.routeChat)
})

// test('getMessageDescriptors', t => {
//   console.dir(loaded, {depth: 7, colors: true})
//   const actual = lib.getMessageDescriptors(loaded)
//   console.dir(actual, {depth: 3, colors: true})
// })
