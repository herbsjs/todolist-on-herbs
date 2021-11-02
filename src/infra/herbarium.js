const herbsObjects = {
    entities: new Map(),
    usecases: new Map(),
    repositories: new Map()
}

function findByMatchingProperties(set, properties) {
    return set.filter((entry) =>
        Object.keys(properties)
            .every((key) =>
                // === where using { x:1 }
                entry[key] === properties[key]
                || (
                    // "in" where using { x: [1,2] }
                    Array.isArray(properties[key]) && properties[key].includes(entry[key])
                )
            )
    )
}

module.exports = {
    herbarium: {
        requireAll() {
            const path = require('path')
            const __dir = __dirname.split(path.sep).join(path.posix.sep)
            const reqall = require('require-all')
            const avoidTestFiles = (fileName) => fileName.includes('test.js') ? false : fileName
            reqall({ dirname: __dir + '/../domain/entities', filter: avoidTestFiles })
            reqall({ dirname: __dir + '/../domain/usecases', filter: avoidTestFiles })
            reqall({ dirname: __dir + '/../infra/repositories', filter: avoidTestFiles })
        },
        entities: {
            add(entity, id) {
                const ent = {
                    entity,
                    id,
                    metadata(metadata) {
                        Object.assign(this, metadata)
                    }
                }

                herbsObjects.entities.set(id, ent)
                return ent
            },
            get all() {
                return herbsObjects.entities
            }
        },
        usecases: {
            add(usecase, id) {
                // const uc = new UseCaseItem(usecase, id)
                const uc = {
                    usecase,
                    id,
                    operation: undefined,
                    entity: undefined,
                    group: undefined,

                    metadata(metadata) {
                        Object.assign(this, metadata)
                    }
                }

                herbsObjects.usecases.set(id, uc)
                return uc
            },
            get all() {
                return herbsObjects.usecases
            },
            findBy(where) {
                return findByMatchingProperties(Array.from(herbsObjects.usecases.values()), where)
            }
        },
        repositories: {
            add(repository, id) {
                const repo = {
                    repository,
                    id,
                    metadata(metadata) {
                        Object.assign(this, metadata)
                    }
                }

                herbsObjects.repositories.set(id, repo)
                return repo
            },
            get all() {
                return herbsObjects.repositories
            }
        },

        crud: {
            create: 'Create',
            read: 'Read',
            readAll: 'ReadAll',
            update: 'Update',
            delete: 'Delete',
            other: 'Other'
        }
    },
    herbsObjects
}