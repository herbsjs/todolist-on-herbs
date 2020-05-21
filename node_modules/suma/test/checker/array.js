const assert = require('assert')
const checker = require('../../src/checker')

describe('array checker', () => {

    it('check for a array value', () => {
        const samples = [
            [],
            [null],
            [undefined],
            [1]
        ]
        for (const value of samples) {
            const ret = checker.isArray(value)
            assert.deepStrictEqual(ret, true)
        }
    })

    it('check for not a array value', () => {
        const samples = [
            null,
            undefined,
            1,
            "Array"
        ]
        for (const value of samples) {
            const ret = checker.isArray(value)
            assert.deepStrictEqual(ret, false)
        }
    })
})
