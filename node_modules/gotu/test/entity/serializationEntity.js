const { entity } = require('../../src/entity')
const { field } = require('../../src/field')
const assert = require('assert')
const { BaseEntity } = require('../../src/baseEntity')

describe('A entity', () => {

    const givenAnEntityToBeUsedAsType = () => {

        const EntityType = entity('A entity type', {
            f1: field(Boolean),
            f2: field(String)
        })

        return EntityType
    }

    describe('should deserialize', () => {

        const givenAnEntityToReceiveObject = () => {

            const EntityType = givenAnEntityToBeUsedAsType()

            const AnEntity = entity('A entity', {
                field1: field(Number),
                field2: field(String),
                field3: field(Date),
                field4: field(Boolean),
                field5: field(EntityType),
                method1() { return 10 }
            })
            return AnEntity
        }

        it('valid data from a object', () => {
            //given
            const AnEntity = givenAnEntityToReceiveObject()
            //when
            const instance = AnEntity.fromJSON({
                field1: 1,
                field2: "1",
                field3: new Date('2019-09-30T23:45:34.324Z'),
                field4: true,
                field5: { f1: true, f2: "2" },
                field6: "Nothing",
                method1() { return "Nada" },
                method2() { return "Niente" }
            })
            //then
            assert.strictEqual(instance['field1'], 1)
            assert.strictEqual(instance['field2'], "1")
            assert.deepStrictEqual(instance['field3'], new Date('2019-09-30T23:45:34.324Z'))
            assert.strictEqual(instance['field4'], true)
            assert(instance['field5'] instanceof BaseEntity)
            assert.strictEqual(instance['field5']['f1'], true)
            assert.strictEqual(instance['field5']['f2'], "2")
            assert.strictEqual(instance['field6'], undefined)
            assert(instance['method1'] instanceof Function)
            assert.strictEqual(instance.method1(), 10)
            assert.strictEqual(instance['method2'], undefined)
            assert.strictEqual(instance.isValid(), true)
            assert.deepStrictEqual(instance.errors, {})
        })

        it('valid data from a JSON string', () => {
            //given
            const AnEntity = givenAnEntityToReceiveObject()
            //when
            const instance = AnEntity.fromJSON(`{
                    "field1": 1,
                    "field2": "1",
                    "field3": "${new Date('2019-09-30T23:45:00.000Z')}",
                    "field4": true,
                    "field5": {"f1": true, "f2": "2"},
                    "field6": "Nothing"
                }`)
            //then
            assert.strictEqual(instance['field1'], 1)
            assert.strictEqual(instance['field2'], "1")
            assert.deepStrictEqual(instance['field3'], new Date('2019-09-30T23:45:00.000Z'))
            assert.strictEqual(instance['field4'], true)
            assert(instance['field5'] instanceof BaseEntity)
            assert.strictEqual(instance['field5']['f1'], true)
            assert.strictEqual(instance['field5']['f2'], "2")
            assert.strictEqual(instance['field6'], undefined)
            assert(instance['method1'] instanceof Function)
            assert.strictEqual(instance['method2'], undefined)
            assert.strictEqual(instance.isValid(), true)
            assert.deepStrictEqual(instance.errors, {})
        })

        it('invalid data from a object', () => {
            //given
            const AnEntity = givenAnEntityToReceiveObject()
            //when
            const instance = AnEntity.fromJSON({
                field1: "1",
                field2: 1,
                field3: true,
                field4: new Date('2019-09-30T23:45:34.324Z'),
                field5: { f1: 2, f2: false },
                field6: null,
                method2() { return "Nada" }
            })
            //then
            assert.strictEqual(instance['field1'], "1")
            assert.strictEqual(instance['field2'], 1)
            assert.deepStrictEqual(instance['field3'], new Date('1970-01-01T00:00:00.001Z')) // true parsed as Date
            assert.deepStrictEqual(instance['field4'], new Date('2019-09-30T23:45:34.324Z'))
            assert(instance['field5'] instanceof BaseEntity)
            assert.strictEqual(instance['field5']['f1'], 2)
            assert.strictEqual(instance['field5']['f2'], false)
            assert.strictEqual(instance['field6'], undefined)
            assert(instance['method1'] instanceof Function)
            assert.strictEqual(instance['method2'], undefined)
            assert.strictEqual(instance.isValid(), false)
            assert.strictEqual(Object.keys(instance.errors).length, 4)
        })

        it('valid data from empty JSON string', () => {
            //given
            const AnEntity = givenAnEntityToReceiveObject()
            //when
            const instance = AnEntity.fromJSON(`{}`)
            //then
            assert.strictEqual(instance['field1'], undefined)
            assert.strictEqual(instance['field2'], undefined)
            assert.deepStrictEqual(instance['field3'], undefined)
            assert.strictEqual(instance['field4'], undefined)
            assert.strictEqual(instance['field5'], undefined)            
            assert(instance['method1'] instanceof Function)
            assert.strictEqual(instance.isValid(), true)
            assert.deepStrictEqual(instance.errors, {})
        })


    })

    describe('should serialize', () => {

        const givenAnEntityToBuildAJSON = () => {
            const EntityType = givenAnEntityToBeUsedAsType()

            const AnEntity = entity('A entity', {
                field1: field(Number),
                field2: field(String),
                field3: field(Date),
                field4: field(Boolean),
                field5: field(EntityType),
                method1() { return 10 }
            })
            return AnEntity
        }

        it('valid data to JSON', () => {
            //given
            const AnEntity = givenAnEntityToBuildAJSON()
            const instance = new AnEntity()
            instance.field1 = 1
            instance.field2 = "1"
            instance.field3 = new Date('2019-09-30T23:45:34.324Z')
            instance.field4 = true
            instance.field5.f1 = true
            instance.field5.f2 = "2"

            //when
            instance.validate()
            const json = JSON.stringify(instance)
            //then
            assert.deepStrictEqual(json, '{"field1":1,"field2":"1","field3":"2019-09-30T23:45:34.324Z","field4":true,"field5":{"f1":true,"f2":"2"}}')
        })

        it('invalid data to JSON', () => {
            //given
            const AnEntity = givenAnEntityToBuildAJSON()
            const instance = new AnEntity()
            instance.field1 = "1"
            instance.field2 = 1
            instance.field3 = 1
            instance.field4 = 1
            instance.field5.f1 = 2
            instance.field5.f2 = true
            //when
            instance.validate()
            const json = JSON.stringify(instance)
            //then
            assert.deepStrictEqual(json, '{"field1":"1","field2":1,"field3":1,"field4":1,"field5":{"f1":2,"f2":true}}')
        })
    })
})