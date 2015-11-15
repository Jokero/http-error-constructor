var httpStatusCodes = require('http').STATUS_CODES;
var util            = require('util');
var camelCase       = require('lodash.camelcase');
var capitalize      = require('lodash.capitalize');

/**
 * @param {Number}        [statusCode=500]
 * @param {Object|String} [propertiesOrMessage]
 * @param {Object}        [properties]
 */
function HttpError(statusCode, propertiesOrMessage, properties) {
    Error.call(this);
    Error.captureStackTrace(this, this.constructor);

    statusCode = statusCode || 500;
    properties = properties || {};

    if (typeof propertiesOrMessage === 'string') {
        propertiesOrMessage = { message: propertiesOrMessage };
    }

    Object.assign(this, propertiesOrMessage, properties);

    this.name       = upperCamelCase(httpStatusCodes[statusCode]);
    this.statusCode = statusCode;
    this.status     = statusCode;
    this.message    = this.message || httpStatusCodes[statusCode];

    Object.defineProperties(this, {
        statusCode: { enumerable: false },
        status:     { enumerable: false },
        name:       { enumerable: false }
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