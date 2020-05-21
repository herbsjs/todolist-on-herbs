const { entity } = require('../../../src/entity')
const { field } = require('../../../src/field')
const assert = require('assert')

describe('A field', () => {

    describe('with a date type', () => {

        const givenAnEntityWithADateField = () => {
            const AnEntity = entity('A entity', {
                field1: field(Date)
            })
            return new AnEntity()
        }

        it('should set a default value to a field', () => {
            //given
            const instance = givenAnEntityWithADateField()
            //then
            assert.strictEqual(instance['field1'], null)
        })

        it('should set a different default value to a field', () => {
            //given
            const AnEntity = entity('A entity', {
                field1: field(Date, { default: new Date('2000-01-01') }),
            })
            //when
            const instance = new AnEntity()
            //then
            assert.deepStrictEqual(instance['field1'], new Date('2000-01-01'))
        })

        it('should validate type and have valid value', () => {
            //given
            const instance = givenAnEntityWithADateField()
            instance.field1 = new Date('2019-09-30T23:45:34.324Z')
            //then
            assert.strictEqual(instance.isValid(), true)
            assert.deepStrictEqual(instance.errors, {})
        })

        it('should validate type and have invalid value', () => {
            //given
            const instance = givenAnEntityWithADateField()
            instance.field1 = Date('2019-09-30T23:45:34.324Z')
            //then
            assert.strictEqual(instance.isValid(), false)
            assert.deepStrictEqual(instance.errors, { field1: [{ wrongType: 'Date' }] })
        })

    })
})