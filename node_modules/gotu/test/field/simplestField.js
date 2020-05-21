const { field } = require('../../src/field')

const assert = require('assert')

describe('A field', () => {

    describe('the simplest field', () => {

        const givenTheSimplestField = () => {
            const field_ = field(Number)
            return field_
        }

        it('should initiate', () => {
            //given
            const field_ = givenTheSimplestField()
            //then
            assert.deepStrictEqual(field_.type, Number)
        })

    })
})