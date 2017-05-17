const expectedDescriptor = {
  namespaces: {
    routeguide: {
      name: 'routeguide',
      messages: {
        Point: {
          name: 'Point',
          fields: [{
            name: 'latitude',
            type: 'int32',
            id: 1,
            required: false,
            repeated: false,
            map: false,
            defaultValue: 0
          },
            {
              name: 'longitude',
              type: 'int32',
              id: 2,
              required: false,
              repeated: false,
              map: false,
              defaultValue: 0
            }
          ]
        },
        Rectangle: {
          name: 'Rectangle',
          fields: [{
            name: 'lo',
            type: 'Point',
            id: 1,
            required: false,
            repeated: false,
            map: false
          },
            {
              name: 'hi',
              type: 'Point',
              id: 2,
              required: false,
              repeated: false,
              map: false
            }
          ]
        },
        Feature: {
          name: 'Feature',
          fields: [{
            name: 'name',
            type: 'string',
            id: 1,
            required: false,
            repeated: false,
            map: false,
            defaultValue: ''
          },
            {
              name: 'location',
              type: 'Point',
              id: 2,
              required: false,
              repeated: false,
              map: false
            }
          ]
        },
        RouteNote: {
          name: 'RouteNote',
          fields: [{
            name: 'location',
            type: 'Point',
            id: 1,
            required: false,
            repeated: false,
            map: false
          },
            {
              name: 'message',
              type: 'string',
              id: 2,
              required: false,
              repeated: false,
              map: false,
              defaultValue: ''
            }
          ]
        },
        RouteSummary: {
          name: 'RouteSummary',
          fields: [{
            name: 'point_count',
            type: 'int32',
            id: 1,
            required: false,
            repeated: false,
            map: false,
            defaultValue: 0
          },
            {
              name: 'feature_count',
              type: 'int32',
              id: 2,
              required: false,
              repeated: false,
              map: false,
              defaultValue: 0
            },
            {
              name: 'distance',
              type: 'int32',
              id: 3,
              required: false,
              repeated: false,
              map: false,
              defaultValue: 0
            },
            {
              name: 'elapsed_time',
              type: 'int32',
              id: 4,
              required: false,
              repeated: false,
              map: false,
              defaultValue: 0
            }
          ]
        }
      },
      services: {
        RouteGuide: {
          name: 'RouteGuide',
          methods: [{
            name: 'GetFeature',
            requestStream: false,
            responseStream: false,
            requestName: 'Point',
            responseName: 'Feature'
          },
            {
              name: 'ListFeatures',
              requestStream: false,
              responseStream: true,
              requestName: 'Rectangle',
              responseName: 'Feature'
            },
            {
              name: 'RecordRoute',
              requestStream: true,
              responseStream: false,
              requestName: 'Point',
              responseName: 'RouteSummary'
            },
            {
              name: 'RouteChat',
              requestStream: true,
              responseStream: true,
              requestName: 'RouteNote',
              responseName: 'RouteNote'
            }
          ]
        }
      }
    }
  },
  options: {
    java_multiple_files: true,
    java_package: 'io.grpc.examples.routeguide',
    java_outer_classname: 'RouteGuideProto',
    objc_class_prefix: 'RTG'
  }
}

const expectedMethods = [{
  name: 'GetFeature',
  requestStream: false,
  responseStream: false,
  requestName: 'Point',
  responseName: 'Feature'
},
  {
    name: 'ListFeatures',
    requestStream: false,
    responseStream: true,
    requestName: 'Rectangle',
    responseName: 'Feature'
  },
  {
    name: 'RecordRoute',
    requestStream: true,
    responseStream: false,
    requestName: 'Point',
    responseName: 'RouteSummary'
  },
  {
    name: 'RouteChat',
    requestStream: true,
    responseStream: true,
    requestName: 'RouteNote',
    responseName: 'RouteNote'
  }
]

exports.expectedDescriptor = expectedDescriptor
exports.expectedMethods = expectedMethods
