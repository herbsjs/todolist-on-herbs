const assert = require('assert')
const { Ok, Err } = require('buchu')
const { UserInputError } = require('apollo-server-express')
const defaultResolver = require('./defaultResolver')

describe('GraphQL - Default Resolver', () => {

    it('should resolve and run a use case', async () => {
        // Given
        const AUseCase = (injection) => {
            return {
                requestSchema: { id: Number },
                responseSchema: Number,
                authorize() { return true },
                async run() { return Ok("result") }
            }
        }
        const resolver = defaultResolver({ usecase: AUseCase })

        // When
        const ret = await resolver(null, {}, { user: {} })

        // Then
        assert.deepStrictEqual(ret, 'result')

    })

    it('should resolve and not run a use case', async () => {
        // Given
        const AUseCase = (injection) => {
            return {
                requestSchema: { id: Number },
                responseSchema: Number,
                authorize() { return true },
                async run() { return Err("error") }
            }
        }
        const resolver = defaultResolver({ usecase: AUseCase })

        await assert.rejects(
            // When
            async () => {
                await resolver(null, {}, { user: {} })
            },
            // Then
            (err) => {
                assert.strictEqual(err.name, 'UserInputError')
                assert.strictEqual(err.invalidArgs, 'error')
                return true
            }
        )
    })
})


