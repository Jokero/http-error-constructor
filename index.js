var httpStatusCodes = require('http').STATUS_CODES;
var util            = require('util');
var camelCase       = require('lodash.camelcase');
var capitalize      = require('lodash.capitalize');

/**
 * @param {Number}        statusCode
 * @param {Object|String} [paramsOrMessage]
 */
function HttpError(statusCode, paramsOrMessage) {
    Error.call(this);
    Error.captureStackTrace(this, this.constructor);

    if (typeof paramsOrMessage === 'string') {
        this.message = paramsOrMessage;
    } else {
        Object.assign(this, paramsOrMessage);
    }

    this.message = this.message || httpStatusCodes[statusCode];

    Object.defineProperty(this, 'name', {
        enumerable: false,
        writable:   true,
        value:      upperCamelCase(httpStatusCodes[statusCode])
    });
}

util.inherits(HttpError, Error);

Object.keys(httpStatusCodes).forEach(function(statusCode) {
    if (statusCode >= 400) {
        var upperCamelCasedStatusMessage = upperCamelCase(httpStatusCodes[statusCode]);

        HttpError[upperCamelCasedStatusMessage] = function(paramsOrMessage) {
            HttpError.call(this, statusCode, paramsOrMessage);
        };

        util.inherits(HttpError[upperCamelCasedStatusMessage], HttpError);
    }
});

function upperCamelCase(string) {
    return capitalize(camelCase(string));
}

module.exports = HttpError;