const assert = require("assert")
const { validate, errorCodes } = require("../../src/suma")
const err = errorCodes

describe("format validation", () => {
    it('does allow empty values', () => {

        //zipcode regex
        var pattern = /^[0-9]{8}$/
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
            const validations = { format: pattern }
            // when
            const ret = validate(value, validations)
            // then
            assert.deepStrictEqual(ret, { value: value, errors: [] })
        }
    })

    it("allows values that matches the pattern", function () {

        const samples = [
            [new RegExp('^[0-9]{8}$'), '05541030'],
            [/^[0-9]{8}$/, 26130014],
            [/^[0-9]{8}$/, ['37130000']],
            [/\S+@\S+\.\S+/i, 'sample@email.com'],
            [/^\(?[\d]{3}\)?[\s-]?[\d]{3}[\s-]?[\d]{4}$/, '573-884-1234'],
        ]

        for (const value of samples) {
            // given
            const validations = { format: value[0] }
            // when
            const ret = validate(value[1], validations)
            // then
            assert.deepStrictEqual(ret, { value: value[1], errors: [] })
        }

    })

    it('does not allow values that not matches the pattern', () => {
       
        const samples = [
            [new RegExp('^[0-9]{8}$'), 'f05541030'],
            [/^[0-9]{8}$/, true],
            [/^[0-9]{8}$/, new Date()],
            [/\S+@\S+\.\S+/i, 'sampleemail.com'],
            [/^\(?[\d]{3}\)?[\s-]?[\d]{3}[\s-]?[\d]{4}$/, '73-884-1234'],
        ]

        for (const value of samples) {
            // given
            const validations = { format: value[0] }
            // when
            const ret = validate(value[1], validations)
            // then
            assert.deepStrictEqual(ret, { value: value[1], errors: [{ [err.invalidFormat]: true }] })
        }

    })

    it("allows expressions that uses flags pattern", function () {

        //zipcode regex
        var pattern = new RegExp('^[0-9]{8}$', 'i')

        const value = "05541030"
        // given
        const validations = { format: pattern }
        // when
        const ret = validate(value, validations)
        // then
        assert.deepStrictEqual(ret, { value: value, errors: [] })

    })

    it("doesn't allow partial matches", function () {

        //zipcode regex
        var pattern = new RegExp('\\.png$', 'g')

        const value = "foo.png"
        // given
        const validations = { format: pattern }
        // when
        const ret = validate(value, validations)
        // then
        assert.deepStrictEqual(ret, { value: value, errors: [] })

    })



    it("allows work with multiple validations", function () {

        //zipcode regex
        var pattern = /^[0-9]{8}$/

        const value = "05541030"
        // given
        const validations = { format: pattern, presence: true }
        // when
        const ret = validate(value, validations)
        // then
        assert.deepStrictEqual(ret, { value: value, errors: [] })

    })


})
