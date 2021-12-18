module.exports = (items, builder) => ({
    add(obj, id) {
        const item = builder(obj, id)
        items.set(id, item)
        return item
    },
    get all() {
        return items
    },
    get(id) {
        return items.get(id)
    },
    findBy(where) {

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

        return findByMatchingProperties(Array.from(items.values()), where)
    }
})
