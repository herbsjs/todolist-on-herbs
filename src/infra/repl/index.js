const repl = require('@herbsjs/herbs2repl')
const { herbarium } = require('../herbarium')
herbarium.requireAll()

const main = async (injection) => {

    // list of all use cases, initialized
    const usecases = Array.from(herbarium.usecases.all).map(([_, item]) =>
        ({ usecase: item.usecase(injection), id: item.id, tags: { group: item.group } }))
    const ucs = usecases(injection)

    // your user for the REPL session
    const user = {
        canCreateItem: true, canCreateList: true, canDeteleList: false,
        canGetLists: true, canUpdateItem: true, canUpdateList: true
    }

    repl(ucs, user, { groupBy: "group" })
}

main().then()
