const { entity } = require('../../../src/entity')
const { field } = require('../../../src/field')
const assert = require('assert')

describe('A field', () => {

    describe('with a number type', () => {

        const givenAnEntityWithANumberField = () => {
            const AnEntity = entity('A entity', {
                field1: field(Number)
            })
            return new AnEntity()
        }

        it('should set a default value to a field', () => {
            //given
            const instance = givenAnEntityWithANumberField()
            //then
            assert.strictEqual(instance['field1'], 0)
        })

        it('should set a different default value to a field', () => {
            //given
            const AnEntity = entity('A entity', {
                field1: field(Number, { default: 42 }),
            })
            //when
            const instance = new AnEntity()
            //then
            assert.deepStrictEqual(instance['field1'], 42)
        })

        it('should validate type and have valid value', () => {
            //given
            const instance = givenAnEntityWithANumberField()
            instance.field1 = 1
            //then
            assert.strictEqual(instance.isValid(), true)
            assert.deepStrictEqual(instance.errors, {})
        })

        it('should validate type and have invalid value', () => {
            //given
            const instance = givenAnEntityWithANumberField()
            instance.field1 = "1"
            //then
            assert.strictEqual(instance.isValid(), false)
            assert.deepStrictEqual(instance.errors, { field1: [{ wrongType: 'Number' }] })
        })

    })
})