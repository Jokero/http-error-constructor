# http-error-constructor

Constructors for HTTP errors

[![NPM version](https://img.shields.io/npm/v/http-error-constructor.svg)](https://npmjs.org/package/http-error-constructor)
[![Build status](https://img.shields.io/travis/Jokero/http-error-constructor.svg)](https://travis-ci.org/Jokero/http-error-constructor)

**Note:** This plugin will only work with Node.js >= 4.0.

## Installation

```sh
npm install http-error-constructor
```

## Usage

### new HttpError([statusCode=500], [messageOrProperties], [properties])
### new HttpError.<StatusName>([messageOrProperties], [properties])
### new HttpError[<statusCode>]([messageOrProperties], [properties])

**Parameters**

* `[statusCode=500]` {Number} - Three-digit integer code. [Status Code Registry](http://www.iana.org/assignments/http-status-codes/http-status-codes.xhtml)
* `[messageOrProperties]` {String | Object} - String message or object with additional properties. Default message from `http.STATUS_CODES[<statusCode>]` ([documentation](https://nodejs.org/api/http.html#http_http_status_codes)
* `[properties]` {Object} - Additional properties (used only if `messageOrProperties` is string)

### Examples

```js
var HttpError = require('http-error-constructor');

var err = new HttpError(400);

// err.statusCode - 400
// err.status - 400
// err.message - 'Bad Request' (default message)
```

With custom message and additional properties:

```js
var err = new HttpError(400, 'Validation Failed', {
    fields: {
        phoneNumber: 'Invalid format'
    }
});

/* or
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
```

Using specific error constructor:

```js
var properties = {
    message: 'Validation Failed',
    fields: {
        phoneNumber: 'Invalid format'
    }
};

var err = new HttpError.BadRequest(properties); // new HttpError[400](properties)

// err instanceof HttpError - true
// err instanceof HttpError.BadRequest - true
// err instanceof HttpError[400] - true
```

## Tests

```sh
npm install
npm test
```

## License

[MIT](LICENSE)
