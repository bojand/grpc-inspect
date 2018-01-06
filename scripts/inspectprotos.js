// node 8.9

const util = require('util')
const fs = require('fs')
const path = require('path')
const _ = require('lodash')
const grpc = require('grpc')

const readdir = util.promisify(fs.readdir)
const PROTOS_DIR = path.resolve(__dirname, '../test/protos')
const LOADED_DIR = path.resolve(__dirname, '../grpc-loaded')

function getGRPCVersion () {
  const pkgPath = path.resolve(__dirname, '../package.json')
  const pkgStr = fs.readFileSync(pkgPath, { encoding: 'utf8' })
  const pkg = JSON.parse(pkgStr)
  const semver = pkg.devDependencies.grpc
  return semver
    .replace('^', '')
    .replace('~', '')
}

async function main () {
  const files = await readdir(PROTOS_DIR)
  const protos = _.filter(files, f => f.indexOf('.proto') > 0)
  const grpcVersion = getGRPCVersion()

  protos.forEach(p => {
    const loaded = grpc.load(path.join(PROTOS_DIR, p))
    const filename = p.replace('.proto', '').concat('.grpc-', grpcVersion, '.txt')
    const filepath = path.join(LOADED_DIR, filename)
    const data = util.inspect(loaded, { depth: 10 })
    fs.writeFileSync(filepath, data, 'utf8')
  })
}

main()
