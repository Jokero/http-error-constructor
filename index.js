var httpStatusCodes = require('http').STATUS_CODES;
var util            = require('util');
var camelCase       = require('lodash.camelcase');
var capitalize      = require('lodash.capitalize');

/**
 * @param {Number}        statusCode
 * @param {Object|String} [propertiesOrMessage]
 * @param {Object}        [properties]
 */
function HttpError(statusCode, propertiesOrMessage, properties) {
    Error.call(this);
    Error.captureStackTrace(this, this.constructor);

    properties = properties || {};

    if (typeof propertiesOrMessage === 'string') {
        propertiesOrMessage = { message: propertiesOrMessage };
    }

    Object.assign(this, propertiesOrMessage, properties);

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

        HttpError[upperCamelCasedStatusMessage] = function(propertiesOrMessage, properties) {
            HttpError.call(this, statusCode, propertiesOrMessage, properties);
        };

        util.inherits(HttpError[upperCamelCasedStatusMessage], HttpError);
    }
});

function upperCamelCase(string) {
    return capitalize(camelCase(string));
}

module.exports = HttpError;