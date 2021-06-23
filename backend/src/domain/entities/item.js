const { entity, field } = require('@herbsjs/gotu')

module.exports.Item = entity('Item', {
  id: field(Number),
  description: field(String, {
    validation: { presence: true, length: { minimum: 3 } }
  }),
  isDone: field(Boolean, {
    default: false
  }),
  position: field(Number, { presence: true })
})
