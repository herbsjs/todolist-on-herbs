const { entity, field,id } = require('@herbsjs/herbs')

module.exports.Item = entity('Item', {
  id: id(Number),
  description: field(String, {
    validation: { presence: true, length: { minimum: 3 } }
  }),
  isDone: field(Boolean, {
    default: false
  }),
  position: field(Number, { presence: true })
})
