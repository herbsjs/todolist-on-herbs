const { entity } = require('../../src/entity')
const { field } = require('../../src/field')
const assert = require('assert')

describe('A entity', () => {

    describe('with validation', () => {

        const givenAnEntityWithValidation = (type, validation) => {
            const AnEntity = entity('A entity', {
                field1: field(type, { validation }),
                field2: field(String, { default: "value2" })
            })
            return new AnEntity()
        }

        const examples =
            [
                { type: Number, value: 1, validation: { numericality: { greaterThan: 10 } }, errors: { field1: [{ notGreaterThan: 10 }] } },
                { type: String, value: "1", validation: { length: { minimum: 10 } }, errors: { field1: [{ isTooShort: 10 }] } },
                { type: Boolean, value: null, validation: { presence: true }, errors: { field1: [{ cantBeEmpty: true }] } },
                { type: Date, value: new Date('2040-01-01'), validation: { datetime: { before: new Date('2020-01-01') } }, errors: { field1: [{ tooLate: new Date('2020-01-01') }] } },
                { type: Date, value: new Date('2020-01-01'), validation: { datetime: { after: new Date('2040-01-01') } }, errors: { field1: [{tooEarly: new Date('2040-01-01')}] } },
            ]

        examples.forEach(example => {
            it(`should validate a ${example.type.name} type field`, () => {
                //given
                const instance = givenAnEntityWithValidation(example.type, example.validation)
                //when
                instance.field1 = example.value
                //then
                assert.strictEqual(instance.isValid(), false)
                assert.deepStrictEqual(instance.errors, example.errors)
            })
        })

    })
})