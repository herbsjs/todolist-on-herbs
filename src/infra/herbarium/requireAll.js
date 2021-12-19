const path = require('path')
const reqall = require('require-all')

module.exports = function requireAll(options = {}) {
    const initialPath = options.initialPath || process.cwd()
    const __dir = initialPath.split(path.sep).join(path.posix.sep)
    const avoidFiles = options.avoidFiles || ((fileName) => fileName.includes('test.js') ? false : fileName)
    reqall({ dirname: __dir + (options.entitiesPath || '/src/domain/entities'), filter: avoidFiles })
    reqall({ dirname: __dir + (options.usecasesPath || '/src/domain/usecases'), filter: avoidFiles })
    reqall({ dirname: __dir + (options.repositoriesPath || '/src/infra/repositories'), filter: avoidFiles })
}