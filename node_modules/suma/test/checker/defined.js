const assert = require('assert')
const checker = require('../../src/checker')

describe('defined checker', () => {

    it('check for a defined value', () => {
        const samples = [
            '',
            ' ',
            'text',
            0,
            1,
            false,
            true,
            [],
            [null],
            [undefined],
            [1],
            {},
            { obj: null },
            () => { }
        ]
        for (const value of samples) {
            const ret = checker.isDefined(value)
            assert.deepStrictEqual(ret, true)
        }
    })

    it('check for not a defined value', () => {
        const samples = [
            null,
            undefined
        ]
        for (const value of samples) {
            const ret = checker.isDefined(value)
            assert.deepStrictEqual(ret, false)
        }
    })
})
