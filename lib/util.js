const _ = require('lodash')
const traverse = require('traverse')

function getMessages (proto) {
  const messages = []
  traverse(proto).forEach(function (v) {
    if (v && typeof v === 'function' && v.encode && typeof v.encode === 'function') {
      let namespace = ''
      if (this.path && this.path.length > 1) {
        const nsPath = _.clone(this.path)
        nsPath.pop()
        namespace = nsPath.join('.')
      }
      messages.push({
        name: this.key,
        path: this.path,
        namespace
      })
    }
  })

  return messages
}

function getServices (proto) {
  const services = []
  traverse(proto).forEach(function (v) {
    if (v && typeof v === 'function' && v.service) {
      let namespace = ''
      if (this.path && this.path.length > 1) {
        const nsPath = _.clone(this.path)
        nsPath.pop()
        namespace = nsPath.join('.')
      }
      services.push({
        name: this.key,
        path: this.path,
        namespace,
        client: v,
        service: v.service
      })
    }
  })

  return services
}

function getMessageDescriptors (proto) {
  const res = {}
  
  traverse(proto).forEach(function (v) {
    if (v && v.className) {
      services.push({
        name: this.key,
        path: this.path,
        client: v,
        service: v.service
      })
    }
  })

  return res
}

exports.getMessages = getMessages
exports.getServices = getServices
exports.getgetMessageDescriptors = getMessageDescriptors
