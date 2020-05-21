const { entity } = require('../../../src/entity')
const { field } = require('../../../src/field')
const assert = require('assert')

describe('A field', () => {

    describe('with a boolean type', () => {

        const givenAnEntityWithABooleanField = () => {
            const AnEntity = entity('A entity', {
                field1: field(Boolean)
            })
            return new AnEntity()
        }

        it('should set a default value to a field', () => {
            //given
            const instance = givenAnEntityWithABooleanField()
            //then
            assert.strictEqual(instance['field1'], false)
        })

        it('should set a different default value to a field', () => {
            //given
            const AnEntity = entity('A entity', {
                field1: field(Boolean, { default: true }),
            })
            //when
            const instance = new AnEntity()
            //then
            assert.deepStrictEqual(instance['field1'], true)
        })

        it('should set a different default value (using function) to a field', () => {
            //given
            const AnEntity = entity('A entity', {
                field1: field(Boolean, { default: () => true }),
            })
            //when
            const instance = new AnEntity()
            //then
            assert.deepStrictEqual(instance['field1'], true)
        })

        it('should validate type and have valid value', () => {
            //given
            const instance = givenAnEntityWithABooleanField()
            instance.field1 = true
            //then
            assert.strictEqual(instance.isValid(), true)
            assert.deepStrictEqual(instance.errors, {})
        })

        it('should validate type and have invalid value', () => {
            //given
            const instance = givenAnEntityWithABooleanField()
            instance.field1 = 1
            //then
            assert.strictEqual(instance.isValid(), false)
            assert.deepStrictEqual(instance.errors, { field1: [{ wrongType: 'Boolean' }] })
        })

    })
})