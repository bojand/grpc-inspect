grpc@1.0.x

```js
{ routeguide:
   { Point:
      { [Function: Message]
        encode: [Function],
        decode: [Function],
        decodeDelimited: [Function],
        decode64: [Function],
        decodeHex: [Function],
        decodeJSON: [Function] },
     Rectangle:
      { [Function: Message]
        encode: [Function],
        decode: [Function],
        decodeDelimited: [Function],
        decode64: [Function],
        decodeHex: [Function],
        decodeJSON: [Function] },
     Feature:
      { [Function: Message]
        encode: [Function],
        decode: [Function],
        decodeDelimited: [Function],
        decode64: [Function],
        decodeHex: [Function],
        decodeJSON: [Function] },
     RouteNote:
      { [Function: Message]
        encode: [Function],
        decode: [Function],
        decodeDelimited: [Function],
        decode64: [Function],
        decodeHex: [Function],
        decodeJSON: [Function] },
     RouteSummary:
      { [Function: Message]
        encode: [Function],
        decode: [Function],
        decodeDelimited: [Function],
        decode64: [Function],
        decodeHex: [Function],
        decodeJSON: [Function] },
     RouteGuide:
      { [Function: Client]
        service:
         T {
           builder:
            Builder {
              ns:
               T {
                 builder: [Circular],
                 parent: null,
                 name: '',
                 className: 'Namespace',
                 children: [Array],
                 options: {},
                 syntax: 'proto2' },
              ptr:
               T {
                 builder: [Circular],
                 parent: null,
                 name: '',
                 className: 'Namespace',
                 children: [Array],
                 options: {},
                 syntax: 'proto2' },
              resolved: false,
              result: null,
              files:
               { '/Users/bdjurkovic/dev/nodejs/grpc-inspect/test/protos/route_guide.proto': true },
              importRoot: null,
              options: { convertFieldsToCamelCase: false, populateAccessors: true } },
           parent:
            T {
              builder:
               Builder {
                 ns: [Object],
                 ptr: [Object],
                 resolved: false,
                 result: null,
                 files: [Object],
                 importRoot: null,
                 options: [Object] },
              parent:
               T {
                 builder: [Object],
                 parent: null,
                 name: '',
                 className: 'Namespace',
                 children: [Array],
                 options: {},
                 syntax: 'proto2' },
              name: 'routeguide',
              className: 'Namespace',
              children: [ [Object], [Object], [Object], [Object], [Object], [Circular] ],
              options:
               { java_multiple_files: true,
                 java_package: 'io.grpc.examples.routeguide',
                 java_outer_classname: 'RouteGuideProto',
                 objc_class_prefix: 'RTG' },
              syntax: 'proto2' },
           name: 'RouteGuide',
           className: 'Service',
           children:
            [ T {
                builder: [Object],
                parent: [Circular],
                name: 'GetFeature',
                className: 'Service.RPCMethod',
                options: {},
                requestName: 'Point',
                responseName: 'Feature',
                requestStream: false,
                responseStream: false,
                resolvedRequestType: [Object],
                resolvedResponseType: [Object] },
              T {
                builder: [Object],
                parent: [Circular],
                name: 'ListFeatures',
                className: 'Service.RPCMethod',
                options: {},
                requestName: 'Rectangle',
                responseName: 'Feature',
                requestStream: false,
                responseStream: true,
                resolvedRequestType: [Object],
                resolvedResponseType: [Object] },
              T {
                builder: [Object],
                parent: [Circular],
                name: 'RecordRoute',
                className: 'Service.RPCMethod',
                options: {},
                requestName: 'Point',
                responseName: 'RouteSummary',
                requestStream: true,
                responseStream: false,
                resolvedRequestType: [Object],
                resolvedResponseType: [Object] },
              T {
                builder: [Object],
                parent: [Circular],
                name: 'RouteChat',
                className: 'Service.RPCMethod',
                options: {},
                requestName: 'RouteNote',
                responseName: 'RouteNote',
                requestStream: true,
                responseStream: true,
                resolvedRequestType: [Object],
                resolvedResponseType: [Object] } ],
           options: { '(meta).description': 'Description', '(option)': 'Option' },
           syntax: 'proto2',
           clazz: null,
           grpc_options: undefined } } } }
```

grpc@1.2.x

```js
{ routeguide:
   { Point:
      { [Function: Message]
        encode: [Function],
        decode: [Function],
        decodeDelimited: [Function],
        decode64: [Function],
        decodeHex: [Function],
        decodeJSON: [Function] },
     Rectangle:
      { [Function: Message]
        encode: [Function],
        decode: [Function],
        decodeDelimited: [Function],
        decode64: [Function],
        decodeHex: [Function],
        decodeJSON: [Function] },
     Feature:
      { [Function: Message]
        encode: [Function],
        decode: [Function],
        decodeDelimited: [Function],
        decode64: [Function],
        decodeHex: [Function],
        decodeJSON: [Function] },
     RouteNote:
      { [Function: Message]
        encode: [Function],
        decode: [Function],
        decodeDelimited: [Function],
        decode64: [Function],
        decodeHex: [Function],
        decodeJSON: [Function] },
     RouteSummary:
      { [Function: Message]
        encode: [Function],
        decode: [Function],
        decodeDelimited: [Function],
        decode64: [Function],
        decodeHex: [Function],
        decodeJSON: [Function] },
     RouteGuide:
      { [Function: Client]
        service:
         T {
           builder:
            Builder {
              ns:
               T {
                 builder: [Circular],
                 parent: null,
                 name: '',
                 className: 'Namespace',
                 children: [Array],
                 options: {},
                 syntax: 'proto2' },
              ptr:
               T {
                 builder: [Circular],
                 parent: null,
                 name: '',
                 className: 'Namespace',
                 children: [Array],
                 options: {},
                 syntax: 'proto2' },
              resolved: false,
              result: null,
              files:
               { '/Users/bdjurkovic/dev/nodejs/grpc-inspect/test/protos/route_guide.proto': true },
              importRoot: null,
              options: { convertFieldsToCamelCase: false, populateAccessors: true } },
           parent:
            T {
              builder:
               Builder {
                 ns: [Object],
                 ptr: [Object],
                 resolved: false,
                 result: null,
                 files: [Object],
                 importRoot: null,
                 options: [Object] },
              parent:
               T {
                 builder: [Object],
                 parent: null,
                 name: '',
                 className: 'Namespace',
                 children: [Array],
                 options: {},
                 syntax: 'proto2' },
              name: 'routeguide',
              className: 'Namespace',
              children: [ [Object], [Object], [Object], [Object], [Object], [Circular] ],
              options:
               { java_multiple_files: true,
                 java_package: 'io.grpc.examples.routeguide',
                 java_outer_classname: 'RouteGuideProto',
                 objc_class_prefix: 'RTG' },
              syntax: 'proto2' },
           name: 'RouteGuide',
           className: 'Service',
           children:
            [ T {
                builder: [Object],
                parent: [Circular],
                name: 'GetFeature',
                className: 'Service.RPCMethod',
                options: {},
                requestName: 'Point',
                responseName: 'Feature',
                requestStream: false,
                responseStream: false,
                resolvedRequestType: [Object],
                resolvedResponseType: [Object] },
              T {
                builder: [Object],
                parent: [Circular],
                name: 'ListFeatures',
                className: 'Service.RPCMethod',
                options: {},
                requestName: 'Rectangle',
                responseName: 'Feature',
                requestStream: false,
                responseStream: true,
                resolvedRequestType: [Object],
                resolvedResponseType: [Object] },
              T {
                builder: [Object],
                parent: [Circular],
                name: 'RecordRoute',
                className: 'Service.RPCMethod',
                options: {},
                requestName: 'Point',
                responseName: 'RouteSummary',
                requestStream: true,
                responseStream: false,
                resolvedRequestType: [Object],
                resolvedResponseType: [Object] },
              T {
                builder: [Object],
                parent: [Circular],
                name: 'RouteChat',
                className: 'Service.RPCMethod',
                options: {},
                requestName: 'RouteNote',
                responseName: 'RouteNote',
                requestStream: true,
                responseStream: true,
                resolvedRequestType: [Object],
                resolvedResponseType: [Object] } ],
           options: { '(meta).description': 'Description', '(option)': 'Option' },
           syntax: 'proto2',
           clazz: null,
           grpc_options: { deprecatedArgumentOrder: false } } } } }
```

grpc@1.3.x

```js
{ routeguide:
   { Point:
      { [Function: Message]
        encode: [Function],
        decode: [Function],
        decodeDelimited: [Function],
        decode64: [Function],
        decodeHex: [Function],
        decodeJSON: [Function] },
     Rectangle:
      { [Function: Message]
        encode: [Function],
        decode: [Function],
        decodeDelimited: [Function],
        decode64: [Function],
        decodeHex: [Function],
        decodeJSON: [Function] },
     Feature:
      { [Function: Message]
        encode: [Function],
        decode: [Function],
        decodeDelimited: [Function],
        decode64: [Function],
        decodeHex: [Function],
        decodeJSON: [Function] },
     RouteNote:
      { [Function: Message]
        encode: [Function],
        decode: [Function],
        decodeDelimited: [Function],
        decode64: [Function],
        decodeHex: [Function],
        decodeJSON: [Function] },
     RouteSummary:
      { [Function: Message]
        encode: [Function],
        decode: [Function],
        decodeDelimited: [Function],
        decode64: [Function],
        decodeHex: [Function],
        decodeJSON: [Function] },
     RouteGuide:
      { [Function: Client]
        service:
         { getFeature:
            { originalName: 'GetFeature',
              path: '/routeguide.RouteGuide/GetFeature',
              requestStream: false,
              responseStream: false,
              requestType:
               T {
                 builder: [Object],
                 parent: [Object],
                 name: 'Point',
                 className: 'Message',
                 children: [Array],
                 options: {},
                 syntax: 'proto3',
                 extensions: undefined,
                 clazz: [Object],
                 isGroup: false,
                 _fields: [Array],
                 _fieldsById: [Object],
                 _fieldsByName: [Object],
                 _oneofsByName: {} },
              responseType:
               T {
                 builder: [Object],
                 parent: [Object],
                 name: 'Feature',
                 className: 'Message',
                 children: [Array],
                 options: {},
                 syntax: 'proto3',
                 extensions: undefined,
                 clazz: [Object],
                 isGroup: false,
                 _fields: [Array],
                 _fieldsById: [Object],
                 _fieldsByName: [Object],
                 _oneofsByName: {} },
              requestSerialize: [Function: serialize],
              requestDeserialize: [Function: deserialize],
              responseSerialize: [Function: serialize],
              responseDeserialize: [Function: deserialize] },
           listFeatures:
            { originalName: 'ListFeatures',
              path: '/routeguide.RouteGuide/ListFeatures',
              requestStream: false,
              responseStream: true,
              requestType:
               T {
                 builder: [Object],
                 parent: [Object],
                 name: 'Rectangle',
                 className: 'Message',
                 children: [Array],
                 options: {},
                 syntax: 'proto3',
                 extensions: undefined,
                 clazz: [Object],
                 isGroup: false,
                 _fields: [Array],
                 _fieldsById: [Object],
                 _fieldsByName: [Object],
                 _oneofsByName: {} },
              responseType:
               T {
                 builder: [Object],
                 parent: [Object],
                 name: 'Feature',
                 className: 'Message',
                 children: [Array],
                 options: {},
                 syntax: 'proto3',
                 extensions: undefined,
                 clazz: [Object],
                 isGroup: false,
                 _fields: [Array],
                 _fieldsById: [Object],
                 _fieldsByName: [Object],
                 _oneofsByName: {} },
              requestSerialize: [Function: serialize],
              requestDeserialize: [Function: deserialize],
              responseSerialize: [Function: serialize],
              responseDeserialize: [Function: deserialize] },
           recordRoute:
            { originalName: 'RecordRoute',
              path: '/routeguide.RouteGuide/RecordRoute',
              requestStream: true,
              responseStream: false,
              requestType:
               T {
                 builder: [Object],
                 parent: [Object],
                 name: 'Point',
                 className: 'Message',
                 children: [Array],
                 options: {},
                 syntax: 'proto3',
                 extensions: undefined,
                 clazz: [Object],
                 isGroup: false,
                 _fields: [Array],
                 _fieldsById: [Object],
                 _fieldsByName: [Object],
                 _oneofsByName: {} },
              responseType:
               T {
                 builder: [Object],
                 parent: [Object],
                 name: 'RouteSummary',
                 className: 'Message',
                 children: [Array],
                 options: {},
                 syntax: 'proto3',
                 extensions: undefined,
                 clazz: [Object],
                 isGroup: false,
                 _fields: [Array],
                 _fieldsById: [Object],
                 _fieldsByName: [Object],
                 _oneofsByName: {} },
              requestSerialize: [Function: serialize],
              requestDeserialize: [Function: deserialize],
              responseSerialize: [Function: serialize],
              responseDeserialize: [Function: deserialize] },
           routeChat:
            { originalName: 'RouteChat',
              path: '/routeguide.RouteGuide/RouteChat',
              requestStream: true,
              responseStream: true,
              requestType:
               T {
                 builder: [Object],
                 parent: [Object],
                 name: 'RouteNote',
                 className: 'Message',
                 children: [Array],
                 options: {},
                 syntax: 'proto3',
                 extensions: undefined,
                 clazz: [Object],
                 isGroup: false,
                 _fields: [Array],
                 _fieldsById: [Object],
                 _fieldsByName: [Object],
                 _oneofsByName: {} },
              responseType:
               T {
                 builder: [Object],
                 parent: [Object],
                 name: 'RouteNote',
                 className: 'Message',
                 children: [Array],
                 options: {},
                 syntax: 'proto3',
                 extensions: undefined,
                 clazz: [Object],
                 isGroup: false,
                 _fields: [Array],
                 _fieldsById: [Object],
                 _fieldsByName: [Object],
                 _oneofsByName: {} },
              requestSerialize: [Function: serialize],
              requestDeserialize: [Function: deserialize],
              responseSerialize: [Function: serialize],
              responseDeserialize: [Function: deserialize] } } } } }
```

grpc@1.4.x:

```js
{ routeguide:
   { Point:
      { [Function: Message]
        encode: [Function],
        decode: [Function],
        decodeDelimited: [Function],
        decode64: [Function],
        decodeHex: [Function],
        decodeJSON: [Function] },
     Rectangle:
      { [Function: Message]
        encode: [Function],
        decode: [Function],
        decodeDelimited: [Function],
        decode64: [Function],
        decodeHex: [Function],
        decodeJSON: [Function] },
     Feature:
      { [Function: Message]
        encode: [Function],
        decode: [Function],
        decodeDelimited: [Function],
        decode64: [Function],
        decodeHex: [Function],
        decodeJSON: [Function] },
     RouteNote:
      { [Function: Message]
        encode: [Function],
        decode: [Function],
        decodeDelimited: [Function],
        decode64: [Function],
        decodeHex: [Function],
        decodeJSON: [Function] },
     RouteSummary:
      { [Function: Message]
        encode: [Function],
        decode: [Function],
        decodeDelimited: [Function],
        decode64: [Function],
        decodeHex: [Function],
        decodeJSON: [Function] },
     RouteGuide:
      { [Function: ServiceClient]
        super_: [Function: Client],
        service:
         { getFeature:
            { originalName: 'GetFeature',
              path: '/routeguide.RouteGuide/GetFeature',
              requestStream: false,
              responseStream: false,
              requestType:
               T {
                 builder: [Object],
                 parent: [Object],
                 name: 'Point',
                 className: 'Message',
                 children: [Array],
                 options: {},
                 syntax: 'proto3',
                 extensions: undefined,
                 clazz: [Object],
                 isGroup: false,
                 _fields: [Array],
                 _fieldsById: [Object],
                 _fieldsByName: [Object],
                 _oneofsByName: {} },
              responseType:
               T {
                 builder: [Object],
                 parent: [Object],
                 name: 'Feature',
                 className: 'Message',
                 children: [Array],
                 options: {},
                 syntax: 'proto3',
                 extensions: undefined,
                 clazz: [Object],
                 isGroup: false,
                 _fields: [Array],
                 _fieldsById: [Object],
                 _fieldsByName: [Object],
                 _oneofsByName: {} },
              requestSerialize: [Function: serialize],
              requestDeserialize: [Function: deserialize],
              responseSerialize: [Function: serialize],
              responseDeserialize: [Function: deserialize] },
           listFeatures:
            { originalName: 'ListFeatures',
              path: '/routeguide.RouteGuide/ListFeatures',
              requestStream: false,
              responseStream: true,
              requestType:
               T {
                 builder: [Object],
                 parent: [Object],
                 name: 'Rectangle',
                 className: 'Message',
                 children: [Array],
                 options: {},
                 syntax: 'proto3',
                 extensions: undefined,
                 clazz: [Object],
                 isGroup: false,
                 _fields: [Array],
                 _fieldsById: [Object],
                 _fieldsByName: [Object],
                 _oneofsByName: {} },
              responseType:
               T {
                 builder: [Object],
                 parent: [Object],
                 name: 'Feature',
                 className: 'Message',
                 children: [Array],
                 options: {},
                 syntax: 'proto3',
                 extensions: undefined,
                 clazz: [Object],
                 isGroup: false,
                 _fields: [Array],
                 _fieldsById: [Object],
                 _fieldsByName: [Object],
                 _oneofsByName: {} },
              requestSerialize: [Function: serialize],
              requestDeserialize: [Function: deserialize],
              responseSerialize: [Function: serialize],
              responseDeserialize: [Function: deserialize] },
           recordRoute:
            { originalName: 'RecordRoute',
              path: '/routeguide.RouteGuide/RecordRoute',
              requestStream: true,
              responseStream: false,
              requestType:
               T {
                 builder: [Object],
                 parent: [Object],
                 name: 'Point',
                 className: 'Message',
                 children: [Array],
                 options: {},
                 syntax: 'proto3',
                 extensions: undefined,
                 clazz: [Object],
                 isGroup: false,
                 _fields: [Array],
                 _fieldsById: [Object],
                 _fieldsByName: [Object],
                 _oneofsByName: {} },
              responseType:
               T {
                 builder: [Object],
                 parent: [Object],
                 name: 'RouteSummary',
                 className: 'Message',
                 children: [Array],
                 options: {},
                 syntax: 'proto3',
                 extensions: undefined,
                 clazz: [Object],
                 isGroup: false,
                 _fields: [Array],
                 _fieldsById: [Object],
                 _fieldsByName: [Object],
                 _oneofsByName: {} },
              requestSerialize: [Function: serialize],
              requestDeserialize: [Function: deserialize],
              responseSerialize: [Function: serialize],
              responseDeserialize: [Function: deserialize] },
           routeChat:
            { originalName: 'RouteChat',
              path: '/routeguide.RouteGuide/RouteChat',
              requestStream: true,
              responseStream: true,
              requestType:
               T {
                 builder: [Object],
                 parent: [Object],
                 name: 'RouteNote',
                 className: 'Message',
                 children: [Array],
                 options: {},
                 syntax: 'proto3',
                 extensions: undefined,
                 clazz: [Object],
                 isGroup: false,
                 _fields: [Array],
                 _fieldsById: [Object],
                 _fieldsByName: [Object],
                 _oneofsByName: {} },
              responseType:
               T {
                 builder: [Object],
                 parent: [Object],
                 name: 'RouteNote',
                 className: 'Message',
                 children: [Array],
                 options: {},
                 syntax: 'proto3',
                 extensions: undefined,
                 clazz: [Object],
                 isGroup: false,
                 _fields: [Array],
                 _fieldsById: [Object],
                 _fieldsByName: [Object],
                 _oneofsByName: {} },
              requestSerialize: [Function: serialize],
              requestDeserialize: [Function: deserialize],
              responseSerialize: [Function: serialize],
              responseDeserialize: [Function: deserialize] } } } } }
```

grpc@1.6.x

```js
{ routeguide:
   { Point:
      { [Function: Message]
        encode: [Function],
        decode: [Function],
        decodeDelimited: [Function],
        decode64: [Function],
        decodeHex: [Function],
        decodeJSON: [Function] },
     Rectangle:
      { [Function: Message]
        encode: [Function],
        decode: [Function],
        decodeDelimited: [Function],
        decode64: [Function],
        decodeHex: [Function],
        decodeJSON: [Function] },
     Feature:
      { [Function: Message]
        encode: [Function],
        decode: [Function],
        decodeDelimited: [Function],
        decode64: [Function],
        decodeHex: [Function],
        decodeJSON: [Function] },
     RouteNote:
      { [Function: Message]
        encode: [Function],
        decode: [Function],
        decodeDelimited: [Function],
        decode64: [Function],
        decodeHex: [Function],
        decodeJSON: [Function] },
     RouteSummary:
      { [Function: Message]
        encode: [Function],
        decode: [Function],
        decodeDelimited: [Function],
        decode64: [Function],
        decodeHex: [Function],
        decodeJSON: [Function] },
     RouteGuide:
      { [Function: ServiceClient]
        super_: [Function: Client],
        service:
         { getFeature:
            { originalName: 'GetFeature',
              path: '/routeguide.RouteGuide/GetFeature',
              requestStream: false,
              responseStream: false,
              requestType:
               T {
                 builder: [Object],
                 parent: [Object],
                 name: 'Point',
                 className: 'Message',
                 children: [Array],
                 options: {},
                 syntax: 'proto3',
                 extensions: undefined,
                 clazz: [Object],
                 isGroup: false,
                 _fields: [Array],
                 _fieldsById: [Object],
                 _fieldsByName: [Object],
                 _oneofsByName: {} },
              responseType:
               T {
                 builder: [Object],
                 parent: [Object],
                 name: 'Feature',
                 className: 'Message',
                 children: [Array],
                 options: {},
                 syntax: 'proto3',
                 extensions: undefined,
                 clazz: [Object],
                 isGroup: false,
                 _fields: [Array],
                 _fieldsById: [Object],
                 _fieldsByName: [Object],
                 _oneofsByName: {} },
              requestSerialize: [Function: serialize],
              requestDeserialize: [Function: deserialize],
              responseSerialize: [Function: serialize],
              responseDeserialize: [Function: deserialize] },
           listFeatures:
            { originalName: 'ListFeatures',
              path: '/routeguide.RouteGuide/ListFeatures',
              requestStream: false,
              responseStream: true,
              requestType:
               T {
                 builder: [Object],
                 parent: [Object],
                 name: 'Rectangle',
                 className: 'Message',
                 children: [Array],
                 options: {},
                 syntax: 'proto3',
                 extensions: undefined,
                 clazz: [Object],
                 isGroup: false,
                 _fields: [Array],
                 _fieldsById: [Object],
                 _fieldsByName: [Object],
                 _oneofsByName: {} },
              responseType:
               T {
                 builder: [Object],
                 parent: [Object],
                 name: 'Feature',
                 className: 'Message',
                 children: [Array],
                 options: {},
                 syntax: 'proto3',
                 extensions: undefined,
                 clazz: [Object],
                 isGroup: false,
                 _fields: [Array],
                 _fieldsById: [Object],
                 _fieldsByName: [Object],
                 _oneofsByName: {} },
              requestSerialize: [Function: serialize],
              requestDeserialize: [Function: deserialize],
              responseSerialize: [Function: serialize],
              responseDeserialize: [Function: deserialize] },
           recordRoute:
            { originalName: 'RecordRoute',
              path: '/routeguide.RouteGuide/RecordRoute',
              requestStream: true,
              responseStream: false,
              requestType:
               T {
                 builder: [Object],
                 parent: [Object],
                 name: 'Point',
                 className: 'Message',
                 children: [Array],
                 options: {},
                 syntax: 'proto3',
                 extensions: undefined,
                 clazz: [Object],
                 isGroup: false,
                 _fields: [Array],
                 _fieldsById: [Object],
                 _fieldsByName: [Object],
                 _oneofsByName: {} },
              responseType:
               T {
                 builder: [Object],
                 parent: [Object],
                 name: 'RouteSummary',
                 className: 'Message',
                 children: [Array],
                 options: {},
                 syntax: 'proto3',
                 extensions: undefined,
                 clazz: [Object],
                 isGroup: false,
                 _fields: [Array],
                 _fieldsById: [Object],
                 _fieldsByName: [Object],
                 _oneofsByName: {} },
              requestSerialize: [Function: serialize],
              requestDeserialize: [Function: deserialize],
              responseSerialize: [Function: serialize],
              responseDeserialize: [Function: deserialize] },
           routeChat:
            { originalName: 'RouteChat',
              path: '/routeguide.RouteGuide/RouteChat',
              requestStream: true,
              responseStream: true,
              requestType:
               T {
                 builder: [Object],
                 parent: [Object],
                 name: 'RouteNote',
                 className: 'Message',
                 children: [Array],
                 options: {},
                 syntax: 'proto3',
                 extensions: undefined,
                 clazz: [Object],
                 isGroup: false,
                 _fields: [Array],
                 _fieldsById: [Object],
                 _fieldsByName: [Object],
                 _oneofsByName: {} },
              responseType:
               T {
                 builder: [Object],
                 parent: [Object],
                 name: 'RouteNote',
                 className: 'Message',
                 children: [Array],
                 options: {},
                 syntax: 'proto3',
                 extensions: undefined,
                 clazz: [Object],
                 isGroup: false,
                 _fields: [Array],
                 _fieldsById: [Object],
                 _fieldsByName: [Object],
                 _oneofsByName: {} },
              requestSerialize: [Function: serialize],
              requestDeserialize: [Function: deserialize],
              responseSerialize: [Function: serialize],
              responseDeserialize: [Function: deserialize] } } } } }
```

grpc@1.7.3

```js
{ routeguide:
   { Point:
      { [Function: Message]
        encode: [Function],
        decode: [Function],
        decodeDelimited: [Function],
        decode64: [Function],
        decodeHex: [Function],
        decodeJSON: [Function] },
     Rectangle:
      { [Function: Message]
        encode: [Function],
        decode: [Function],
        decodeDelimited: [Function],
        decode64: [Function],
        decodeHex: [Function],
        decodeJSON: [Function] },
     Feature:
      { [Function: Message]
        encode: [Function],
        decode: [Function],
        decodeDelimited: [Function],
        decode64: [Function],
        decodeHex: [Function],
        decodeJSON: [Function] },
     RouteNote:
      { [Function: Message]
        encode: [Function],
        decode: [Function],
        decodeDelimited: [Function],
        decode64: [Function],
        decodeHex: [Function],
        decodeJSON: [Function] },
     RouteSummary:
      { [Function: Message]
        encode: [Function],
        decode: [Function],
        decodeDelimited: [Function],
        decode64: [Function],
        decodeHex: [Function],
        decodeJSON: [Function] },
     RouteGuide:
      { [Function: ServiceClient]
        super_: [Function: Client],
        service:
         { getFeature:
            { originalName: 'GetFeature',
              path: '/routeguide.RouteGuide/GetFeature',
              requestStream: false,
              responseStream: false,
              requestType:
               T {
                 builder: [Object],
                 parent: [Object],
                 name: 'Point',
                 className: 'Message',
                 children: [Array],
                 options: {},
                 syntax: 'proto3',
                 extensions: undefined,
                 clazz: [Object],
                 isGroup: false,
                 _fields: [Array],
                 _fieldsById: [Object],
                 _fieldsByName: [Object],
                 _oneofsByName: {} },
              responseType:
               T {
                 builder: [Object],
                 parent: [Object],
                 name: 'Feature',
                 className: 'Message',
                 children: [Array],
                 options: {},
                 syntax: 'proto3',
                 extensions: undefined,
                 clazz: [Object],
                 isGroup: false,
                 _fields: [Array],
                 _fieldsById: [Object],
                 _fieldsByName: [Object],
                 _oneofsByName: {} },
              requestSerialize: [Function: serialize],
              requestDeserialize: [Function: deserialize],
              responseSerialize: [Function: serialize],
              responseDeserialize: [Function: deserialize] },
           listFeatures:
            { originalName: 'ListFeatures',
              path: '/routeguide.RouteGuide/ListFeatures',
              requestStream: false,
              responseStream: true,
              requestType:
               T {
                 builder: [Object],
                 parent: [Object],
                 name: 'Rectangle',
                 className: 'Message',
                 children: [Array],
                 options: {},
                 syntax: 'proto3',
                 extensions: undefined,
                 clazz: [Object],
                 isGroup: false,
                 _fields: [Array],
                 _fieldsById: [Object],
                 _fieldsByName: [Object],
                 _oneofsByName: {} },
              responseType:
               T {
                 builder: [Object],
                 parent: [Object],
                 name: 'Feature',
                 className: 'Message',
                 children: [Array],
                 options: {},
                 syntax: 'proto3',
                 extensions: undefined,
                 clazz: [Object],
                 isGroup: false,
                 _fields: [Array],
                 _fieldsById: [Object],
                 _fieldsByName: [Object],
                 _oneofsByName: {} },
              requestSerialize: [Function: serialize],
              requestDeserialize: [Function: deserialize],
              responseSerialize: [Function: serialize],
              responseDeserialize: [Function: deserialize] },
           recordRoute:
            { originalName: 'RecordRoute',
              path: '/routeguide.RouteGuide/RecordRoute',
              requestStream: true,
              responseStream: false,
              requestType:
               T {
                 builder: [Object],
                 parent: [Object],
                 name: 'Point',
                 className: 'Message',
                 children: [Array],
                 options: {},
                 syntax: 'proto3',
                 extensions: undefined,
                 clazz: [Object],
                 isGroup: false,
                 _fields: [Array],
                 _fieldsById: [Object],
                 _fieldsByName: [Object],
                 _oneofsByName: {} },
              responseType:
               T {
                 builder: [Object],
                 parent: [Object],
                 name: 'RouteSummary',
                 className: 'Message',
                 children: [Array],
                 options: {},
                 syntax: 'proto3',
                 extensions: undefined,
                 clazz: [Object],
                 isGroup: false,
                 _fields: [Array],
                 _fieldsById: [Object],
                 _fieldsByName: [Object],
                 _oneofsByName: {} },
              requestSerialize: [Function: serialize],
              requestDeserialize: [Function: deserialize],
              responseSerialize: [Function: serialize],
              responseDeserialize: [Function: deserialize] },
           routeChat:
            { originalName: 'RouteChat',
              path: '/routeguide.RouteGuide/RouteChat',
              requestStream: true,
              responseStream: true,
              requestType:
               T {
                 builder: [Object],
                 parent: [Object],
                 name: 'RouteNote',
                 className: 'Message',
                 children: [Array],
                 options: {},
                 syntax: 'proto3',
                 extensions: undefined,
                 clazz: [Object],
                 isGroup: false,
                 _fields: [Array],
                 _fieldsById: [Object],
                 _fieldsByName: [Object],
                 _oneofsByName: {} },
              responseType:
               T {
                 builder: [Object],
                 parent: [Object],
                 name: 'RouteNote',
                 className: 'Message',
                 children: [Array],
                 options: {},
                 syntax: 'proto3',
                 extensions: undefined,
                 clazz: [Object],
                 isGroup: false,
                 _fields: [Array],
                 _fieldsById: [Object],
                 _fieldsByName: [Object],
                 _oneofsByName: {} },
              requestSerialize: [Function: serialize],
              requestDeserialize: [Function: deserialize],
              responseSerialize: [Function: serialize],
              responseDeserialize: [Function: deserialize] } } } } }
```
