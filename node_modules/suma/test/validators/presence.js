const assert = require('assert')
const { validate, errorCodes } = require('../../src/suma')
const err = errorCodes

describe('presence validation', () => {

    it('does allows non empty values', () => {
        const samples = [
            'text',
            0,
            1,
            false,
            true,
            [null],
            [undefined],
            [1],
            { obj: null },
            () => { }
        ]
        for (const value of samples) {
            // given
            const validations = { presence: true }
            // when
            const ret = validate(value, validations)
            // then
            assert.deepStrictEqual(ret, { value: value, errors: [] })
        }
    })

    it('does not allow empty values', () => {
        const samples = [
            {},
            [],
            '',
            ' ',
            null,
            undefined
        ]
        for (const value of samples) {
            // given
            const validations = { presence: true }
            // when
            const ret = validate(value, validations)
            // then
            assert.deepStrictEqual(ret, { value: value, errors: [{ [err.cantBeEmpty]: true }] })
        }
    })

    it('does allow empty values', () => {
        const samples = [
            {},
            [],
            '',
            ' ',
            null,
            undefined
        ]
        for (const value of samples) {
            // given
            const validations = { presence: false }
            // when
            const ret = validate(value, validations)
            // then
            assert.deepStrictEqual(ret, { value: value, errors: [] })
        }
    })
})