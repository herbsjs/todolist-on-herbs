const { entity, field } = require('gotu')

module.exports.ItemList = entity('Item List', {
  description: field(String, {
    validation: { presence: true, length: { minimum: 3 } }
  }),
  isDone: field(Boolean, {
    default: false
  }),
  position: field(Number)
})
