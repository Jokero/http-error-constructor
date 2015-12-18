# http-error-constructor

Constructors for HTTP errors

[![NPM version](https://img.shields.io/npm/v/http-error-constructor.svg)](https://npmjs.org/package/http-error-constructor)
[![Build status](https://img.shields.io/travis/Jokero/http-error-constructor.svg)](https://travis-ci.org/Jokero/http-error-constructor)

**Note:** This module will only work with Node.js >= 4.0.

## Installation

```sh
npm install http-error-constructor
```

## Usage

### new HttpError([statusCode=500], [messageOrProperties], [properties])
### new HttpError.\<StatusName\>([messageOrProperties], [properties])
`StatusName` is UpperCamelCased status name (description)
### new HttpError\[\<statusCode\>\]([messageOrProperties], [properties])

**Parameters**

* `[statusCode=500]` {Number} - Three-digit integer code. [Status Code Registry](http://www.iana.org/assignments/http-status-codes/http-status-codes.xhtml)
* `[messageOrProperties]` {String | Object} - String message or object with additional properties
* `[properties]` {Object} - Additional properties (used only if `messageOrProperties` is string)

### Examples

```js
var HttpError = require('http-error-constructor');

var err = new HttpError(400);

// err.name - 'BadRequest'
// err.statusCode - 400
// err.status - 400
// err.message - 'Bad Request'

// name, statusCode and status are non-enumerable and therefore ignored in JSON.stringify(err):
// '{"message": "Bad Request"}'
```

With custom message and additional properties:

```js
var err = new HttpError(400, 'Validation Failed', {
    fields: {
        phoneNumber: 'Invalid format'
    }
});

/* or you can include message in the properties object
var err = new HttpError(400, {
    message: 'Validation Failed',
    fields:  {
        phoneNumber: 'Invalid format'
    }
});
*/

// err.statusCode - 400
// err.status - 400
// err.message - 'Validation Failed'
// err.fields - { phoneNumber: 'Invalid format' }

// JSON.stringify(err) - '{"message": "Bad Request", "fields": { "phoneNumber": "Invalid format" } }'
```

Using specific error constructor:

```js
var properties = {
    message: 'Validation Failed',
    fields:  {
        phoneNumber: 'Invalid format'
    }
};

var err = new HttpError.BadRequest(properties); // or new HttpError[400](properties)

// err instanceof HttpError - true
// err instanceof HttpError.BadRequest - true
// err instanceof HttpError[400] - true
```

You can use [custom status codes](http://tools.ietf.org/html/rfc7231#section-6):

```js
var err = new HttpError(471, 'Custom Error');

// err.name - '471 Error'
// err.statusCode - 471
// err.status - 471
// err.message - 'Custom Error'
```

## Tests

```sh
npm install
npm test
```

## License

[MIT](LICENSE)
