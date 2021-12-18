module.exports = (id) => ({
    id,
    metadata(metadata) {
        Object.assign(this, metadata)
        return this
    }
})