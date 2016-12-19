import test from 'ava'
import path from 'path'
import grpc from 'grpc'

const gu = require('../')
const expected = require('./route_guide_expected')

const PROTO_PATH = path.resolve(__dirname, './protos/route_guide.proto')

test('should get full descriptor', t => {
  const d = gu(PROTO_PATH)
  t.truthy(d)
  t.deepEqual(d, expected.expectedDescriptor)
})

test('should get full descriptor with loaded proto', t => {
  const d = gu(grpc.load(PROTO_PATH))
  t.truthy(d)
  t.deepEqual(d, expected.expectedDescriptor)
})

test('should get service names', t => {
  const d = gu(PROTO_PATH)
  t.truthy(d)
  t.deepEqual(d.serviceNames(), ['RouteGuide'])
})

test('should get service names given a namespace', t => {
  const d = gu(PROTO_PATH)
  t.truthy(d)
  t.deepEqual(d.serviceNames('routeguide'), ['RouteGuide'])
})

test('should get empty array for service names given an unknown namespace', t => {
  const d = gu(PROTO_PATH)
  t.truthy(d)
  t.deepEqual(d.serviceNames('asdf'), [])
})

test('should get namespace names', t => {
  const d = gu(PROTO_PATH)
  t.truthy(d)
  t.deepEqual(d.namespaceNames(), ['routeguide'])
})

test('should get method names for a service', t => {
  const d = gu(PROTO_PATH)
  t.truthy(d)
  t.deepEqual(d.methodNames('RouteGuide'), ['GetFeature', 'ListFeatures', 'RecordRoute', 'RouteChat'])
})

test('should get methods for a service', t => {
  const d = gu(PROTO_PATH)
  t.truthy(d)
  t.deepEqual(d.methods('RouteGuide'), expected.expectedMethods)
})

test('should get the proto using proto()', t => {
  const proto = grpc.load(PROTO_PATH)
  const d = gu(proto)
  t.truthy(d)
  const p = d.proto()
  t.is(p, proto)
})

test('should get the client for service using client()', t => {
  const proto = grpc.load(PROTO_PATH)
  const d = gu(proto)
  t.truthy(d)
  const c = d.client('RouteGuide')
  const expected = proto.routeguide.RouteGuide
  t.is(c, expected)
})

test('should get undefined client for an unknown service using client()', t => {
  const proto = grpc.load(PROTO_PATH)
  const d = gu(proto)
  t.truthy(d)
  const c = d.client('asdf')
  t.falsy(c)
})
