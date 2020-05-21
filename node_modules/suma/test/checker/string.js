const assert = require('assert')
const checker = require('../../src/checker')

describe('string checker', () => {

    it('check for a string value', () => {
        const samples = [
            "", " ", "a", ``
        ]
        for (const value of samples) {
            const ret = checker.isString(value)
            assert.deepStrictEqual(ret, true)
        }
    })

    it('check for not a string value', () => {
        const samples = [
            null,
            undefined,
            1,
            [1],
            Date.now()
        ]
        for (const value of samples) {
            const ret = checker.isString(value)
            assert.deepStrictEqual(ret, false)
        }
    })
})
