const { entity } = require('../../../src/entity')
const { field } = require('../../../src/field')
const assert = require('assert')

describe('A field', () => {

    describe('with a string type', () => {

        const givenAnEntityWithAStringField = () => {
            const AnEntity = entity('A entity', {
                field1: field(String)
            })
            return new AnEntity()
        }

        it('should set a default value to a field', () => {
            //given
            const instance = givenAnEntityWithAStringField()
            //then
            assert.strictEqual(instance['field1'], "")
        })

        it('should set a different default value to a field', () => {
            //given
            const AnEntity = entity('A entity', {
                field1: field(String, { default: "Of Life" }),
            })
            //when
            const instance = new AnEntity()
            //then
            assert.deepStrictEqual(instance['field1'], "Of Life")
        })

        it('should set a different default (using function) value to a field', () => {
            //given
            const AnEntity = entity('A entity', {
                field1: field(String, { default: () => "Of Life" }),
            })
            //when
            const instance = new AnEntity()
            //then
            assert.deepStrictEqual(instance['field1'], "Of Life")
        })

        it('should validate type and have valid value', () => {
            //given
            const instance = givenAnEntityWithAStringField()
            instance.field1 = "1"
            //then
            assert.strictEqual(instance.isValid(), true)
            assert.deepStrictEqual(instance.errors, {})
        })

        it('should validate type and have invalid value', () => {
            //given
            const instance = givenAnEntityWithAStringField()
            instance.field1 = 1
            //then
            assert.strictEqual(instance.isValid(), false)
            assert.deepStrictEqual(instance.errors, { field1: [{ wrongType: 'String' }] })
        })

    })
})