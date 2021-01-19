const assert = require('assert')
const { Ok, Err } = require('buchu')
const defaultController = require('./defaultController')

describe('REST - Default Controller', () => {

    it('should resolve and run a use case', async () => {
        // Given
        const AUseCase = {
            requestSchema: { id: Number },
            responseSchema: Number,
            authorize() { return true },
            async run() { return Ok("result") }
        }
        let ret, status
        const req = {}
        const user = {}
        const res = { status: (s) => { status = s; return { json: (x) => { ret = x } } }, end: () => { } }
        const next = () => { }

        // When
        await defaultController(AUseCase, req, user, res, next)

        // Then
        assert.deepStrictEqual(status, 200)
        assert.deepStrictEqual(ret, 'result')
    })

    it('should resolve and not run a use case if has error', async () => {
        // Given
        const AUseCase = {
            requestSchema: { id: Number },
            responseSchema: Number,
            authorize() { return true },
            async run() { return Err("error") }
        }

        let ret, status
        const req = {}
        const user = {}
        const res = { status: (s) => { status = s; return { json: (x) => { ret = x } } }, end: () => { } }
        const next = () => { }

        // When
        await defaultController(AUseCase, req, user, res, next)

        // Then
        assert.deepStrictEqual(status, 400)
        assert.deepStrictEqual(ret, { error: 'error' })

    })

    it('should resolve and not run a use case if not autorized', async () => {
        // Given
        const AUseCase = {
            requestSchema: { id: Number },
            responseSchema: Number,
            authorize() { return false }
        }

        let ret, status
        const req = {}
        const user = {}
        const res = { status: (s) => { status = s; return { json: (x) => { ret = x } } }, end: () => { } }
        const next = () => { }

        // When
        await defaultController(AUseCase, req, user, res, next)

        // Then
        assert.deepStrictEqual(status, 403)
        assert.deepStrictEqual(ret, { message: 'User is not authorized' })

    })
})


