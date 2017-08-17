const expectedDescriptor = {
  namespaces: {
    '': {
      name: '',
      messages: {
        HelloRequest: {
          name: 'HelloRequest',
          fields: [{
            name: 'name',
            type: 'string',
            id: 1,
            required: false,
            optional: true,
            repeated: false,
            map: false,
            long: false
          }]
        },
        HelloReply: {
          name: 'HelloReply',
          fields: [{
            name: 'message',
            type: 'string',
            id: 1,
            required: false,
            optional: true,
            repeated: false,
            map: false,
            long: false
          }]
        }
      },
      services: {
        Greeter: {
          name: 'Greeter',
          package: '',
          methods: [{
            requestStream: false,
            responseStream: false,
            name: 'SayHello',
            requestName: 'HelloRequest',
            responseName: 'HelloReply'
          }]
        }
      }
    }
  }
}

module.exports = {
  expectedDescriptor
}
