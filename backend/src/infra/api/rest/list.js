const defaultController = require('./defaultController')

function listControllers(app) {

    app.get('/lists', async (req, res, next) => {
        const request = req.query
        const usecase = require('../../../domain/usecases/getLists').getLists()
        await defaultController(usecase, request, req.user, res, next)
    })

    app.post('/lists', async (req, res, next) => {
        const request = req.body
        const usecase = require('../../../domain/usecases/createList').createList()
        await defaultController(usecase, request, req.user, res, next)
    })

    app.put('/lists/:id', async (req, res, next) => {
        const request = Object.assign({}, req.params, req.body)
        const usecase = require('../../../domain/usecases/updateList').updateList()
        await defaultController(usecase, request, req.user, res, next)
    })

    app.delete('/lists/:id', async (req, res, next) => {
        const request = Object.assign({}, req.params, req.body)
        const usecase = require('../../../domain/usecases/deleteList').deleteList()
        await defaultController(usecase, request, req.user, res, next)
    })

}

module.exports = listControllers