const assert = require('assert')
const checker = require('../../src/checker')

describe('function checker', () => {

    it('check for a function value', () => {
        function sampleFunc () {}
        const samples = [
            function () {},
            () => {},
            sampleFunc
        ]
        for (const value of samples) {
            const ret = checker.isFunction(value)
            assert.deepStrictEqual(ret, true)
        }
    })

    it('check for not a function value', () => {
        const samples = [
            null,
            undefined,
            1,
            "function",
            {}
        ]
        for (const value of samples) {
            const ret = checker.isFunction(value)
            assert.deepStrictEqual(ret, false)
        }
    })
})
