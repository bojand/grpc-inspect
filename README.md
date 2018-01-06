# grpc-inspect

[![npm version](https://img.shields.io/npm/v/grpc-inspect.svg?style=flat-square)](https://www.npmjs.com/package/grpc-inspect)
[![build status](https://img.shields.io/travis/bojand/grpc-inspect/master.svg?style=flat-square)](https://travis-ci.org/bojand/grpc-inspect)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg?style=flat-square)](https://standardjs.com)
[![License](https://img.shields.io/github/license/bojand/grpc-inspect.svg?style=flat-square)](https://raw.githubusercontent.com/bojand/grpc-inspect/master/LICENSE)

gRPC Protocol Buffer utility module that generates a descriptor object representing a
friendlier descriptor object with utility methods for protocol buffer inspection.

## Installation

`npm install grpc-inspect`

## Overview

`helloworld.proto`


```
syntax = "proto3";

option java_multiple_files = true;
option java_package = "io.grpc.examples.helloworld";
option java_outer_classname = "HelloWorldProto";
option objc_class_prefix = "HLW";

package helloworld;

service Greeter {
  // Sends a greeting
  rpc SayHello (HelloRequest) returns (HelloReply) {}
}

message HelloRequest {
  string name = 1;
}

message HelloReply {
  string message = 1;
}
```


Sample usage:


```js
const gi = require('grpc-inspect')
const grpc = require('grpc')
const pbpath = path.resolve(__dirname, './route_guide.proto')
const proto = grpc.load(pbpath)
const d = gi(proto)
console.dir(d)
```


Returned utility descriptor:


```js
{ namespaces:
   { helloworld:
      { name: 'helloworld',
        messages:
         { HelloRequest:
            { name: 'HelloRequest',
              fields:
               [ { name: 'name',
                   type: 'string',
                   id: 1,
                   required: false,
                   repeated: false,
                   map: false,
                   defaultValue: '' } ] },
           HelloReply:
            { name: 'HelloReply',
              fields:
               [ { name: 'message',
                   type: 'string',
                   id: 1,
                   required: false,
                   repeated: false,
                   map: false,
                   defaultValue: '' } ] } },
        services:
         { Greeter:
            { name: 'Greeter',
              package: 'helloworld',
              methods:
               [ { name: 'SayHello',
                   requestStream: false,
                   responseStream: false,
                   requestName: 'HelloRequest',
                   responseName: 'HelloReply' } ] } } } },
  file: '/Users/me/protos/helloworld.proto',
  options:
   { java_multiple_files: true,
     java_package: 'io.grpc.examples.helloworld',
     java_outer_classname: 'HelloWorldProto',
     objc_class_prefix: 'HLW' } }
```


**NOTE** If no package name is specified in the protocol buffer definition an empty `''` string is used for the package / namespace name.

## API Reference

<a name="descriptor"></a>

### descriptor : <code>Object</code>
Protocol Buffer utility descriptor represents friendlier descriptor object with utility methods for
protocol buffer inspection.

**Kind**: global class  
**Access**: public  

* [descriptor](#descriptor) : <code>Object</code>
    * [.namespaceNames()](#descriptor.namespaceNames) ⇒ <code>Array</code>
    * [.serviceNames(namespace)](#descriptor.serviceNames) ⇒ <code>Array</code>
    * [.service(service)](#descriptor.service) ⇒ <code>Object</code>
    * [.methodNames(service)](#descriptor.methodNames) ⇒ <code>Array</code>
    * [.methods(service)](#descriptor.methods) ⇒ <code>Array</code>
    * [.proto()](#descriptor.proto) ⇒ <code>Object</code>
    * [.client(serviceName)](#descriptor.client) ⇒ <code>Object</code>

<a name="descriptor.namespaceNames"></a>

#### descriptor.namespaceNames() ⇒ <code>Array</code>
Returns an array of namespace names within the protocol buffer definition

**Kind**: static method of [<code>descriptor</code>](#descriptor)  
**Returns**: <code>Array</code> - array of names  
**Example**  

```js
const grpcinspect = require('grpc-inspect')
const grpc = require('grpc')
const pbpath = path.resolve(__dirname, './route_guide.proto')
const proto = grpc.load(pbpath)
const d = grpcinspect(proto)
console.log(d.namespaceNames()) // ['routeguide']
```

<a name="descriptor.serviceNames"></a>

#### descriptor.serviceNames(namespace) ⇒ <code>Array</code>
Returns an array of service names

**Kind**: static method of [<code>descriptor</code>](#descriptor)  
**Returns**: <code>Array</code> - array of names  

| Param | Type | Description |
| --- | --- | --- |
| namespace | <code>String</code> | Optional name of namespace to get services.                           If not present returns service names of all services within the definition. |

**Example**  

```js
const grpcinspect = require('grpc-inspect')
const grpc = require('grpc')
const pbpath = path.resolve(__dirname, './route_guide.proto')
const proto = grpc.load(pbpath)
const d = const grpcinspect(proto)
console.log(d.serviceNames()) // ['RouteGuide']
```

<a name="descriptor.service"></a>

#### descriptor.service(service) ⇒ <code>Object</code>
Returns the utility descriptor for the service given a servie name.
Assumes there are no duplicate service names within the definition.

**Kind**: static method of [<code>descriptor</code>](#descriptor)  
**Returns**: <code>Object</code> - service utility descriptor  

| Param | Type | Description |
| --- | --- | --- |
| service | <code>String</code> | name of the service |

**Example**  

```js
const grpcinspect = require('grpc-inspect')
const grpc = require('grpc')
const pbpath = path.resolve(__dirname, './route_guide.proto')
const proto = grpc.load(pbpath)
const d = grpcinspect(proto)
console.dir(d.service('RouteGuide'))
```

<a name="descriptor.methodNames"></a>

#### descriptor.methodNames(service) ⇒ <code>Array</code>
Returns an array of method names for a service

**Kind**: static method of [<code>descriptor</code>](#descriptor)  
**Returns**: <code>Array</code> - array of names  

| Param | Type | Description |
| --- | --- | --- |
| service | <code>String</code> | name of the service |

**Example**  

```js
const grpcinspect = require('grpc-inspect')
const grpc = require('grpc')
const pbpath = path.resolve(__dirname, './route_guide.proto')
const proto = grpc.load(pbpath)
const d = grpcinspect(proto)
console.log(d.methodNames('RouteGuide')) // [ 'GetFeature', 'ListFeatures', 'RecordRoute', 'RouteChat' ]
```

<a name="descriptor.methods"></a>

#### descriptor.methods(service) ⇒ <code>Array</code>
Returns an array the utility descriptors for the methods of a service.
Assumes there are no duplicate service names within the definition.

**Kind**: static method of [<code>descriptor</code>](#descriptor)  
**Returns**: <code>Array</code> - array of method utility descriptors  

| Param | Type | Description |
| --- | --- | --- |
| service | <code>String</code> | name of the service |

**Example**  

```js
const grpcinspect = require('grpc-inspect')
const grpc = require('grpc')
const pbpath = path.resolve(__dirname, './route_guide.proto')
const proto = grpc.load(pbpath)
const d = grpcinspect(proto)
console.dir(d.methods('RouteGuide'))
```

<a name="descriptor.proto"></a>

#### descriptor.proto() ⇒ <code>Object</code>
Returns the internal proto object

**Kind**: static method of [<code>descriptor</code>](#descriptor)  
**Returns**: <code>Object</code> - the internal proto object  
**Example**  

```js
const grpcinspect = require('grpc-inspect')
const grpc = require('grpc')
const pbpath = path.resolve(__dirname, './route_guide.proto')
const proto = grpc.load(pbpath)
const d = grpcinspect(proto)
console.dir(d.proto())
```

<a name="descriptor.client"></a>

#### descriptor.client(serviceName) ⇒ <code>Object</code>
Gets the gRPC service / client object / function

**Kind**: static method of [<code>descriptor</code>](#descriptor)  
**Returns**: <code>Object</code> - the Client object  

| Param | Type | Description |
| --- | --- | --- |
| serviceName | <code>serviceName</code> | The service name |

**Example**  

```js
const grpcinspect = require('grpc-inspect')
const grpc = require('grpc')
const pbpath = path.resolve(__dirname, './route_guide.proto')
const proto = grpc.load(pbpath)
const d = grpcinspect(proto)
console.dir(d.client('RouteGuide'))
```

<a name="grpcinspect"></a>

### grpcinspect(input) ⇒ <code>Object</code>
Returns protocol buffer utility descriptor.
Takes a loaded grpc / protocol buffer object and returns a friendlier descriptor object

**Kind**: global function  
**Returns**: <code>Object</code> - the utility descriptor  

| Param | Type | Description |
| --- | --- | --- |
| input | <code>Object</code> | loaded proto object |

**Example**  

```js
const gi = require('grpc-inspect')
const grpc = require('grpc')
const pbpath = path.resolve(__dirname, './route_guide.proto')
const proto = grpc.load(pbpath)
const d = gi(proto)
console.dir(d)
```

## License

  Apache 2.0
