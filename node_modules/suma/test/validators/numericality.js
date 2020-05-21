const assert = require('assert')
const { validate, errorCodes } = require('../../src/suma')
const err = errorCodes

describe('numericality validation', () => {

    it('does allows valid numeric values', () => {
        const samples = [
            [1, { equalTo: 1 }],
            [null, { equalTo: 1 }],
            [1, { greaterThan: 0 }],
            [null, { greaterThan: 0 }],
            [1, { greaterThanOrEqualTo: 1 }],
            [2, { greaterThanOrEqualTo: 1 }],
            [null, { greaterThanOrEqualTo: 1 }],
            [0, { lessThan: 1 }],
            [null, { lessThan: 1 }],
            [1, { lessThanOrEqualTo: 1 }],
            [0, { lessThanOrEqualTo: 1 }],
            [null, { lessThanOrEqualTo: 1 }],
            [10, { onlyInteger: true }],
            [1.1, { onlyInteger: false }],
            [null, { onlyInteger: false }],
        ]
        for (const value of samples) {
            // given
            const validations = { numericality: value[1] }
            // when
            const ret = validate(value[0], validations)
            // then
            assert.deepStrictEqual(ret, { value: value[0], errors: [] })
        }
    })

    it('does allows valid numeric values with multiple params', () => {
        // given
        const value = 123
        const numericality = {
            equalTo: 123,
            greaterThan: 0,
            greaterThanOrEqualTo: 123,
            lessThan: 200,
            lessThanOrEqualTo: 123,
            onlyInteger: true
        }
        const validations = { numericality }
        // when
        const ret = validate(value, validations)
        // then
        assert.deepStrictEqual(ret, { value: value, errors: [] })
    })

    it('does not allows invalid numeric values', () => {
        const samples = [
            [0, { equalTo: 1 }, err.notEqualTo],
            ['0', { equalTo: 1 }, err.notANumber],
            [0, { greaterThan: 1 }, err.notGreaterThan],
            ['0', { greaterThan: 1 }, err.notANumber],
            [0, { greaterThanOrEqualTo: 1 }, err.notGreaterThanOrEqualTo],
            ['0', { greaterThanOrEqualTo: 1 }, err.notANumber],
            [1, { lessThan: 0 }, err.notLessThan],
            ['1', { lessThan: 0 }, err.notANumber],
            [1, { lessThanOrEqualTo: 0 }, err.notLessThanOrEqualTo],
            ['1', { lessThanOrEqualTo: 0 }, err.notANumber],
            [1.1, { onlyInteger: true }, err.notAnInteger],
            ['1.1', { onlyInteger: true }, err.notANumber],
            ['a', { onlyInteger: true }, err.notANumber],
        ]
        for (const value of samples) {
            // given
            const validations = { numericality: value[1] }
            // when
            const ret = validate(value[0], validations)
            // then
            assert.deepStrictEqual(ret, {
                value: value[0],
                errors: [{ [value[2]]: value[1][Object.keys(value[1])[0]] }]
            })
        }
    })

    it('does not allows invalid numeric values with multiple params', () => {
        // given
        const value = 123.4
        const numericality = {
            equalTo: 123,
            greaterThan: 200,
            greaterThanOrEqualTo: 123,
            lessThan: 0,
            lessThanOrEqualTo: 123,
            onlyInteger: true
        }
        const validations = { numericality }
        // when
        const ret = validate(value, validations)
        // then
        assert.deepStrictEqual(ret, {
            value: value,
            errors: [
                { notEqualTo: 123 },
                { notGreaterThan: 200 },
                { notLessThan: 0 },
                { notLessThanOrEqualTo: 123 },
                { notAnInteger: true }
            ]
        })

    })
})