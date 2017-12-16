import test from 'ava'
import path from 'path'
import grpc from 'grpc'

const lib = require('../lib')

const BASE_PATH = path.resolve(__dirname, './protos')

test('getMessages - common-no-package.proto', t => {
  const protoPath = BASE_PATH + '/common-no-package.proto'
  const loaded = grpc.load(protoPath)
  const actual = lib.getMessages(loaded)
  const expected = [{ name: 'Animal', path: ['Animal'], namespace: '' }]
  t.deepEqual(actual, expected)
})

test('getMessages - common.proto', t => {
  const protoPath = BASE_PATH + '/common.proto'
  const loaded = grpc.load(protoPath)
  const actual = lib.getMessages(loaded)
  const expected = [{
    name: 'Animal',
    path: ['common', 'Animal'],
    namespace: 'common'
  }]
  t.deepEqual(actual, expected)
})

test('getMessages - dotpkg.proto', t => {
  const protoPath = BASE_PATH + '/dotpkg.proto'
  const loaded = grpc.load(protoPath)
  const actual = lib.getMessages(loaded)
  const expected = [{
    name: 'FooMessage',
    path: ['foo', 'bar', 'FooMessage'],
    namespace: 'foo.bar'
  }]
  t.deepEqual(actual, expected)
})

test('getMessages - empty-service-no-package.proto', t => {
  const protoPath = BASE_PATH + '/empty-service-no-package.proto'
  const loaded = grpc.load(protoPath)
  const actual = lib.getMessages(loaded)
  const expected = []
  t.deepEqual(actual, expected)
})

test('getMessages - empty-service.proto', t => {
  const protoPath = BASE_PATH + '/empty-service.proto'
  const loaded = grpc.load(protoPath)
  const actual = lib.getMessages(loaded)
  const expected = []
  t.deepEqual(actual, expected)
})

test('getMessages - human.proto', t => {
  const protoPath = BASE_PATH + '/human.proto'
  const loaded = grpc.load(protoPath)
  const actual = lib.getMessages(loaded)
  const expected = [{
    name: 'Animal',
    path: ['common', 'Animal'],
    namespace: 'common'
  },
  {
    name: 'Person',
    path: ['human', 'Person'],
    namespace: 'human'
  },
  {
    name: 'MakeHumanRes',
    path: ['human', 'MakeHumanRes'],
    namespace: 'human'
  }
  ]
  t.deepEqual(actual, expected)
})

test('getMessages - no-package-name.proto', t => {
  const protoPath = BASE_PATH + '/no-package-name.proto'
  const loaded = grpc.load(protoPath)
  const actual = lib.getMessages(loaded)
  const expected = [
    { name: 'HelloRequest', path: ['HelloRequest'], namespace: '' },
    { name: 'HelloReply', path: ['HelloReply'], namespace: '' }
  ]
  t.deepEqual(actual, expected)
})

test('getMessages - relative_import.proto', t => {
  const protoPath = BASE_PATH + '/relative_import.proto'
  const loaded = grpc.load(protoPath)
  const actual = lib.getMessages(loaded)
  const expected = [{ name: 'TestRequest', path: ['TestRequest'], namespace: '' },
    { name: 'TestResponse', path: ['TestResponse'], namespace: '' }
  ]
  t.deepEqual(actual, expected)
})

test('getMessages - route_guide.proto', t => {
  const protoPath = BASE_PATH + '/route_guide.proto'
  const loaded = grpc.load(protoPath)
  const actual = lib.getMessages(loaded)
  const expected = [{
    name: 'Point',
    path: ['routeguide', 'Point'],
    namespace: 'routeguide'
  },
  {
    name: 'Rectangle',
    path: ['routeguide', 'Rectangle'],
    namespace: 'routeguide'
  },
  {
    name: 'Feature',
    path: ['routeguide', 'Feature'],
    namespace: 'routeguide'
  },
  {
    name: 'RouteNote',
    path: ['routeguide', 'RouteNote'],
    namespace: 'routeguide'
  },
  {
    name: 'RouteSummary',
    path: ['routeguide', 'RouteSummary'],
    namespace: 'routeguide'
  }
  ]
  t.deepEqual(actual, expected)
})
