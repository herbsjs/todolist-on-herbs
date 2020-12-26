const usecases = require('../../domain/usecases/_uclist')
const repl = require('herbs2repl')

const main = async (injection) => {
    
    // list of all use cases, initialized
    const ucs = usecases(injection)

    // your user for the REPL session
    const user = {
        canCreateItem: true, canCreateList: true, canDeteleList: false,
        canGetLists: true, canUpdateItem: true, canUpdateList: true
    }

    repl(ucs, user, {groupBy: "group"})
}

main().then()