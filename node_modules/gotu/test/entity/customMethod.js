const { entity } = require('../../src/entity')
const { field } = require('../../src/field')
const assert = require('assert')

describe('A entity', () => {

    describe('with custom method', () => {

        const givenAnEntityWithCustomMethod = () => {
            const AnEntity = entity('A entity', {
                field1: field(Number),
                method1: function () { return this.field1 + 1 },
                method2() { return this.field1 + 2 },
                async method3() { return await this.field1 + 3 }
            })
            return new AnEntity()
        }

        it('should initiate', () => {
            //given
            const instance = givenAnEntityWithCustomMethod()
            //then
            assert.equal(instance.meta.name, 'A entity')
        })

        it('should set a value to a field', () => {
            //given
            const instance = givenAnEntityWithCustomMethod()
            instance.field1 = 1
            //then
            assert.strictEqual(instance['field1'], 1)
        })

        it('should execute a method with a function definition', () => {
            //given
            const instance = givenAnEntityWithCustomMethod()
            instance.field1 = 2
            //when
            const ret = instance.method1()
            //then
            assert.strictEqual(ret, 3)
        })

        it('should execute a method defined on the object body', () => {
            //given
            const instance = givenAnEntityWithCustomMethod()
            instance.field1 = 3
            //when
            const ret = instance.method2()
            //then
            assert.strictEqual(ret, 5)
        })

        it('should execute a async method defined on the object body', async () => {
            //given
            const instance = givenAnEntityWithCustomMethod()
            instance.field1 = 4
            //when
            const ret = await instance.method3()
            //then
            assert.strictEqual(ret, 7)
        })
    })
})