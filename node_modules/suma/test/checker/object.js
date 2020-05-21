const assert = require('assert')
const checker = require('../../src/checker')

describe('object checker', () => {

    it('check for a object value', () => {
        class SampleClass {}
        const samples = [
            {},
            new Object(),
            new SampleClass(),
            []
        ]
        for (const value of samples) {
            const ret = checker.isObject(value)
            assert.deepStrictEqual(ret, true)
        }
    })

    it('check for not a object value', () => {
        const samples = [
            null,
            undefined,
            1,
            "Object"
        ]
        for (const value of samples) {
            const ret = checker.isObject(value)
            assert.deepStrictEqual(ret, false)
        }
    })
})
