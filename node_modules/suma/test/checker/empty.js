const assert = require('assert')
const checker = require('../../src/checker')

describe('empty checker', () => {

    it('check for a empty value', () => {
        const samples = [
            '',
            ' ',
            [],
            {},
        ]
        for (const value of samples) {
            const ret = checker.isEmpty(value)
            assert.deepStrictEqual(ret, true)
        }
    })

    it('check for not a empty value', () => {
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
            const ret = checker.isEmpty(value)
            assert.deepStrictEqual(ret, false)
        }
    })
})
