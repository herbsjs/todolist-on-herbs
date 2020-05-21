const assert = require('assert')
const checker = require('../../src/checker')

describe('date checker', () => {

    it('check for a date value', () => {
        const samples = [
            new Date()
        ]
        for (const value of samples) {
            const ret = checker.isDate(value)
            assert.deepStrictEqual(ret, true)
        }
    })

    it('check for not a date value', () => {
        const samples = [
            null,
            undefined,
            1,
            [1],
            "Date"
        ]
        for (const value of samples) {
            const ret = checker.isDate(value)
            assert.deepStrictEqual(ret, false)
        }
    })
})
