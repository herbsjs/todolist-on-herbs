module.exports = function requireAll() {
    const path = require('path')
    const __dir = __dirname.split(path.sep).join(path.posix.sep)
    const reqall = require('require-all')
    const avoidTestFiles = (fileName) => fileName.includes('test.js') ? false : fileName
    reqall({ dirname: __dir + '/../../domain/entities', filter: avoidTestFiles })
    reqall({ dirname: __dir + '/../../domain/usecases', filter: avoidTestFiles })
    reqall({ dirname: __dir + '/../../infra/repositories', filter: avoidTestFiles })
}