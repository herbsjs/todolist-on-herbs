const defaultController = require('./defaultController')

function itemControllers(app) {

    // app.get('/items', async (req, res, next) => {
    //     const request = req.query
    //     const usecase = require('../../../domain/usecases/getItems').getItems()
    //     await defaultController(usecase, request, req.user, res, next)
    // })

    app.post('/items', async (req, res, next) => {
        const request = req.body
        const usecase = require('../../../domain/usecases/createItem').createItem()
        await defaultController(usecase, request, req.user, res, next)
    })

    app.put('/items/:id', async (req, res, next) => {
        const request = Object.assign({}, req.params, req.body)
        const usecase = require('../../../domain/usecases/updateItem').updateItem()
        await defaultController(usecase, request, req.user, res, next)
    })

    // app.delete('/items/:id', async (req, res, next) => {
    //     const request = Object.assign({}, req.params, req.body)
    //     const usecase = require('../../../domain/usecases/deleteItem').deleteItem()
    //     await defaultController(usecase, request, req.user, res, next)
    // })

}

module.exports = itemControllers