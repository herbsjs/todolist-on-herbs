const { generateRoutes } = require('@herbsjs/herbs2rest')
const Config = require('../../config/config')
const { herbarium } = require('@herbsjs/herbarium')

function findEntitiesAndGroups() {
    const items = Array.from(herbarium.usecases.all.values()).map(e => ({ id: e.entity, group: e.group }))
    const distinctItems = items.filter(({ entity, group }, index, self) =>
        self.findIndex(e => e.entity === entity && e.group === group) === index
    )
    return distinctItems
}

function findUsecases(entity) {
    const usecases = herbarium.usecases
    const getAll = usecases.findBy({ entity: entity, operation: herbarium.crud.read })[0].usecase  // herbarium.crud.readAll
    const getById = usecases.findBy({ entity: entity, operation: herbarium.crud.read })[0].usecase
    const post = usecases.findBy({ entity: entity, operation: herbarium.crud.create })[0].usecase
    const put = usecases.findBy({ entity: entity, operation: herbarium.crud.update })[0].usecase
    const del = usecases.findBy({ entity: entity, operation: herbarium.crud.delete })[0].usecase
    return { getAll, getById, post, put, del }
}

const entities = findEntitiesAndGroups()

const controllers = entities.map(entity => {
    const usecases = findUsecases(entity.id)
    const controllers = { name: entity.group, entity: entity.id }
    if (usecases.getAll) controllers.getAll = { usecase: usecases.getAll }
    if (usecases.getById) controllers.getById = { usecase: usecases.getById, id: 'ids' }
    if (usecases.post) controllers.post = { usecase: usecases.post }
    if (usecases.put) controllers.put = { usecase: usecases.put }
    if (usecases.del) controllers.delete = { usecase: usecases.del }

    return controllers
})


// add custon controllers
// controllers.push(...)

module.exports = (routes) => {
    const showEndpoints = Config.environment !== "production"
    generateRoutes(controllers, routes, showEndpoints)
}