const assert = require('assert')
const { validate, errorCodes } = require('../../src/suma')
const err = errorCodes

describe('datetime validation', () => {

    it('does allows valid datetime values', () => {
        const samples = [
            [new Date('2001-01-01'), { before: new Date('2001-01-02') }],
            [null, { before: new Date('2001-01-01') }],
            [new Date('2001-01-02'), { after: new Date('2001-01-01') }],
            [null, { after: new Date('2001-01-01') }],
            [new Date('2001-01-01'), { isAt: new Date('2001-01-01') }],
            [null, { isAt: new Date('2001-01-01') }],
        ]
        for (const value of samples) {
            // given
            const validations = { datetime: value[1] }
            // when
            const ret = validate(value[0], validations)
            // then
            assert.deepStrictEqual(ret, { value: value[0], errors: [] })
        }
    })

    it('does allows valid datetime values with multiple params', () => {
        // given
        const value = new Date('2001-01-02') 
        const datetime = {
            before: new Date('2001-01-03'),
            after: new Date('2001-01-01'),
            isAt: new Date('2001-01-02')
        }
        const validations = { datetime }
        // when
        const ret = validate(value, validations)
        // then
        assert.deepStrictEqual(ret, { value: value, errors: [] })
    })

    it('does not allows invalid datetime values', () => {
        const samples = [
            [new Date('2001-01-02'), { before: new Date('2001-01-01') }, err.tooLate],
            ['2001-01-01', { before: new Date('2001-01-02') }, err.notADate],
            [1000, { before: new Date('2001-01-02') }, err.notADate],
            [new Date('2001-01-01'), { after: new Date('2001-01-02') }, err.tooEarly],
            ['2001-01-02', { after: new Date('2001-01-01') }, err.notADate],
            [2000, { after: new Date('2001-01-01') }, err.notADate],
            [new Date('2001-01-01'), { isAt: new Date('2001-01-02') }, err.notAt],
            ['2001-01-01', { isAt: new Date('2001-01-01') }, err.notADate],
            [3000, { isAt: new Date('2001-01-01') }, err.notADate],
        ]
        for (const value of samples) {
            // given
            const validations = { datetime: value[1] }
            // when
            const ret = validate(value[0], validations)
            // then
            assert.deepStrictEqual(ret, {
                value: value[0],
                errors: [{ [value[2]]: value[1][Object.keys(value[1])[0]] }]
            })
        }
    })

    it('does not allows invalid datetime values with multiple params', () => {
        // given
        const value = new Date('2001-01-02') 
        const datetime = {
            before: new Date('2001-01-01'),
            after: new Date('2001-01-03'),
            isAt: new Date('2001-02-02')
        }
        const validations = { datetime }
        // when
        const ret = validate(value, validations)
        // then
        assert.deepStrictEqual(ret, {
            value: value,
            errors: [
                { tooLate: new Date('2001-01-01') },
                { tooEarly: new Date('2001-01-03') },
                { notAt: new Date('2001-02-02') }
            ]
        })

    })
})