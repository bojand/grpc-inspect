exports.humanExpected = {
  namespaces: {
    common: {
      name: 'common',
      messages: { Animal: { name: 'Animal' } },
      services: {}
    },
    human: {
      name: 'human',
      messages: {
        Person: {
          name: 'Person',
          fields: [{
            name: 'last_name',
            type: 'string',
            id: 1,
            required: false,
            repeated: false,
            map: false,
            defaultValue: ''
          }]
        },
        MakeHumanRes: {
          name: 'MakeHumanRes',
          fields: [{
            name: 'last_name',
            type: 'string',
            id: 1,
            required: false,
            repeated: false,
            map: false,
            defaultValue: ''
          }]
        },
        Animal: {
          name: 'Animal',
          fields: [{
            name: 'name',
            type: 'string',
            id: 1,
            required: false,
            repeated: false,
            map: false,
            defaultValue: ''
          }]
        }
      },
      services: {
        HumanService: {
          name: 'HumanService',
          package: 'human',
          methods: [{
            requestStream: false,
            responseStream: false,
            name: 'MakeHuman',
            requestName: 'Person',
            responseName: 'MakeHumanRes'
          },
          {
            requestStream: false,
            responseStream: false,
            name: 'AddAnimal',
            requestName: 'Animal',
            responseName: 'Animal'
          }
          ]
        }
      }
    }
  }
}
