 <p align="center"><img src="https://raw.githubusercontent.com/herbsjs/suma/master/docs/logo.png" height="220"></p> 

# Suma

Suma helps with single value validations.

Extensible, test covered and errors code only!

Suma does not validate schema or objects, just single values. For schema validation take a look at [`herbjs/gotu`](https://github.com/herbsjs/gotu).

### Installing
    $ npm install suma

### Using

```javascript
const { validate } = require('suma')

const value = null
const validations = { presence: true }
const result = validate(value, validations) 
/* {
    value: null,
    errors: [{ cantBeEmpty: true }]
} */
```

### Validators

#### Presence

`presence` (boolean) - Validates that the specified value is not empty.

```javascript
const value = ''
const validations = { presence: true }
const result = validate(value, validations) 
/* {
    value: '',
    errors: [{ cantBeEmpty: true }]
} */
```

#### Allow Null

`allowNull` (boolean) - Validates that the specified value is not `null` or `undefined`.

```javascript
const value = null
const validations = { allowNull: false }
const result = validate(value, validations) 
/* {
    value: null,
    errors: [{ cantBeNull: true }]
} */
```

#### Presence vs allowNull

|               | presence: true    | allowNull: false  | 
| ------------- | ------------------| ----------------  |
| 'Text'        |       Valid       |       Valid       | 
| 123           |       Valid       |       Valid       |
| 0             |       Valid       |       Valid       |
| ' '           |                   |       Valid       |
| ''            |                   |       Valid       |
| []            |                   |       Valid       |
| {}            |                   |       Valid       |
| null          |                   |                   |  
| undefined     |                   |                   |  

#### Length

Validates the length of the value. 

It is possible to specify length constraints in different ways:

`minimum` (number) - The value cannot have less than the specified length

`maximum` (number) - The value cannot have more than the specified length

`is` (number) - The value length must be equal to the given length

```javascript
const value = 'john'
const validations = { length: { minimum: 5, maximum: 3, is: 1 } }
const result = validate(value, validations) 
/* {
    value: 'john',
    errors: [
        { isTooShort: 5 },
        { isTooLong: 3 },
        { wrongLength: 1 }
    ]
} */
```

#### Numericality

Validates constraints to acceptable numeric values.

It must be a valid `Number` JS object. Use `{ type: Number }` to validate if the value is a valid JS `Number` object.

`equalTo` (number) - Specifies the value must be equal to the supplied value. 

`greaterThan` (number) - Specifies the value must be greater than the supplied value. 

`greaterThanOrEqualTo` (number) - Specifies the value must be greater than or equal to the supplied value.

`lessThan` (number) - Specifies the value must be less than the supplied value.

`lessThanOrEqualTo` (number) - Specifies the value must be less than or equal to the supplied value. 

`onlyInteger` (boolean) - To specify that only integral numbers are allowed.

```javascript
const value = 123.4
const validations = {
    numericality: {
        equalTo: 123,
        greaterThan: 200,
        greaterThanOrEqualTo: 123,
        lessThan: 0,
        lessThanOrEqualTo: 123,
        onlyInteger: true
    }
}
const result = validate(value, validations) 
/* {
    value: 123.4,
    errors: [
        { notEqualTo: 123 },
        { notGreaterThan: 200 },
        { notLessThan: 0 },
        { notLessThanOrEqualTo: 123 },
        { notAnInteger: true }
    ]
} */
```

#### Datetime

Validates constraints to acceptable date and time values.

It must be a valid `Date` time JS object. Use `{ type: Date }` to validate if the value is a valid JS `Date` object.

`before` (date) - A date must be before this value to be valid 

`after` (date) - A date must be after this value to be valid 

`isAt` (date) - A date must be equal to value to be valid 

```javascript
const value = new Date('2001-01-02')
const validations = {
    datetime : {
            before: new Date('2001-01-01'),
            after: new Date('2001-01-03'),
            isAt: new Date('2001-02-02')
        }
}
const result = validate(value, validations) 
/* {
    value: '2001-01-02T00:00:00.000Z',
    errors: [
        { tooLate: '2001-01-01T00:00:00.000Z' },
        { tooEarly: '2001-01-03T00:00:00.000Z') },
        { notAt: '2001-02-02T00:00:00.000Z') }
    ]
} */
```

#### Format

`format` (regex) -The format validator will validate a value against a regular expression of your chosing.

```javascript
const pattern = /^[0-9]{8}$/ // or you can use new RegExp('^[0-9]{8}$')
const value = '05547-022'
const validations = { format: pattern }
const result = validate(value, validations) 
/* {
    value: '05547-022',
    errors: [{ invalidFormat: true }]
} */
```

#### Type

Type validator ensures a value is of the correct JavaScript type or a custom type.

`type` - A valid native JavaScript type, a custom type or a array with type

Native JavaScript types:

`Number` - double-precision 64-bit binary format IEEE 754 value

`String` - a UTF‐16 character sequence

`Boolean` - true or false

`Date` - represents a single moment in time in a platform-independent format. 

`Object` - the Object class represents one of JavaScript's data types.

`Array` - the Array class is a object that is used in the construction of arrays. 

```javascript
const value = '2001'
const validations = { type: Date }
const result = validate(value, validations)
/* {
    value: '2001',
    errors:[{ wrongType: 'Date' }]
} */

```

Custom types:

```javascript

class User { ... }

const value = 'Admin'
const validations = { type: User }
const result = validate(value, validations)
/* {
    value: 'Admin',
    errors:[{ wrongType: 'User' }]
} */

```

Lists - Array with types:

It is possible to validate the type of elements of an array. Just use `[type]`.

```javascript
const value = ['2']
const validations = { type: [Number] }
const result = validate(value, validations)
/* {
    value: ['2'],
    errors:[{ wrongType: ['Number'] }]
} */
```

### Null Values

The `type`, `length`, `numericality`, `format` and `datetime` validators won't validate a value if it's `null` or `undefined`.

To ensure your your value is not null, use `allowNull: false` or `presence: true`.

## TODO

Validators:
- [X] presence / null
- [X] length 
- [X] type 
- [X] numericality (greater than, equal to, is integer, etc)
- [X] format - regex
- [X] date - earliest, latest
- [ ] common formats - url, email, etc
- [ ] enums/lists - validate if value exists in the given list
- [ ] reject list - validate if value does not exists in the given list 

Features:
- [X] Error message only
- [X] No dependency 
- [X] Doc every validators property
- [ ] Allow a custom functions for validaton
- [ ] Allow a conditional `if` functions for validaton
- [ ] Be able to inject a diferent `checker`
- [ ] Better checks on validator's `params`


### Contribute
Come with us to make an awesome *Suma*.

Now, if you do not have technical knowledge and also have intend to help us, do not feel shy, [click here](https://github.com/herbsjs/suma/issues) to open an issue and collaborate their ideas, the contribution may be a criticism or a compliment (why not?)

We have some conventions to contribute to the *Suma* project, see more information in our [CONTRIBUTING.md](CONTRIBUTING.md). So please, read this before send to us a [pull requests](https://github.com/herbsjs/suma/pulls).

### The Herb

Suma is often called Brazilian ginseng due to it’s ability to increase strength and stamina. Like all adaptogens, suma is good for reducing the ill effects of stress.

https://www.herbslist.net/

https://en.wikipedia.org/wiki/Centella_asiatica

### License

**Suma** is released under the
[MIT license](https://github.com/herbsjs/suma/blob/development/LICENSE.md).