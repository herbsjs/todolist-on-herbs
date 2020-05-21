const { entity } = require('../../src/entity')
const { field } = require('../../src/field')
const assert = require('assert')

describe('A entity', () => {

    describe('with multiple fields', () => {

        const givenAnEntityWithMultipleFields = () => {
            const AnEntity = entity('A entity', {
                field1: field(Number),
                field2: field(String),
                field3: field(Date),
                field4: field(Boolean)
            })
            return new AnEntity()
        }

        it('should initiate', () => {
            //given
            const instance = givenAnEntityWithMultipleFields()
            //then
            assert.equal(instance.meta.name, 'A entity')
        })

        it('should set a value to multiple fields', () => {
            //given
            const instance = givenAnEntityWithMultipleFields()
            //when
            instance.field1 = 1
            instance.field2 = "1"
            instance.field3 = new Date('2019-09-30T23:45:34.324Z')
            instance.field4 = true
            //then
            assert.strictEqual(instance['field1'], 1)
            assert.strictEqual(instance['field2'], "1")
            assert.deepStrictEqual(instance['field3'], new Date('2019-09-30T23:45:34.324Z'))
            assert.strictEqual(instance['field4'], true)
        })

        it('should validate types and have valid value', () => {
            //given
            const instance = givenAnEntityWithMultipleFields()
            instance.field1 = 1
            instance.field2 = "1"
            instance.field3 = new Date('2019-09-30T23:45:34.324Z')
            instance.field4 = true
            //then
            assert.strictEqual(instance.isValid(), true)
            assert.deepStrictEqual(instance.errors, {})
        })

        it('should validate types and have invalid value', () => {
            //given
            const instance = givenAnEntityWithMultipleFields()
            instance.field1 = "1"
            instance.field2 = 1
            instance.field3 = Date('2019-09-30T23:45:34.324Z')
            instance.field4 = 1
            //then
            assert.strictEqual(instance.isValid(), false)
            assert.deepStrictEqual(instance.errors, {
                "field1": [{wrongType: 'Number'}],
                "field2": [{wrongType: 'String'}],
                "field3": [{wrongType: 'Date'}],
                "field4": [{wrongType: 'Boolean'}]
            })
        })

    })
})