const assert = require('assert')
const { validate, errorCodes } = require('../../src/suma')
const err = errorCodes

describe('length validation', () => {

    it('does allows values with the right length', () => {
        const samples = [
            ['text', { minimum: 0 }],
            [null, { minimum: 0 }],
            ['text', { maximum: 100 }],
            [null, { maximum: 100 }],
            ['text', { is: 4 }],
            [null, { is: 4 }]
        ]
        for (const value of samples) {
            // given
            const validations = { length: value[1] }
            // when
            const ret = validate(value[0], validations)
            // then
            assert.deepStrictEqual(ret, { value: value[0], errors: [] })
        }
    })

    it('does allows values with the right length with multiple params', () => {
        // given
        const value = 'text'
        const length = {
            minimum: 0,
            maximum: 100,
            is: 4
        }
        const validations = { length: length }
        // when
        const ret = validate(value, validations)
        // then
        assert.deepStrictEqual(ret, { value: value, errors: [] })
    })

    it('does not allows values with the wrong length', () => {
        const samples = [
            ['text', { minimum: 5 }, err.isTooShort],
            ['text', { maximum: 3 }, err.isTooLong],
            ['text', { is: 3 }, err.wrongLength],
        ]
        for (const value of samples) {
            // given
            const validations = { length: value[1] }
            // when
            const ret = validate(value[0], validations)
            // then
            assert.deepStrictEqual(ret, {
                value: value[0],
                errors: [{ [value[2]]: value[1][Object.keys(value[1])[0]] }]
            })
        }
    })

    it('does not allows values with the wrong length with multiple params', () => {
        // given
        const value = 'text'
        const length = { minimum: 5, maximum: 3, is: 3 }
        const validations = { length: length }
        // when
        const ret = validate(value, validations)
        // then
        assert.deepStrictEqual(ret, {
            value: value,
            errors: [
                { isTooShort: 5 },
                { isTooLong: 3 },
                { wrongLength: 3 }
            ]
        })

    })
})