var http = require('http');
var util = require('util');

/**
 * @param {Number}        status
 * @param {Object|String} [paramsOrMessage]
 */
function HttpError(status, paramsOrMessage) {
    Error.call(this);
    Error.captureStackTrace(this, this.constructor);

    if (typeof paramsOrMessage === 'string') {
        this.message = paramsOrMessage;
    } else {
        Object.assign(this, paramsOrMessage);
    }

    this.status  = status;
    this.message = this.message || http.STATUS_CODES[this.status];

    Object.defineProperty(this, 'name', {
        enumerable: false,
        writable:   true,
        value:      upperCamelCase(http.STATUS_CODES[this.status])
    });
}

util.inherits(HttpError, Error);

Object.keys(http.STATUS_CODES).forEach(function(status) {
    if (status >= 400) {
        var upperCamelCasedStatusMessage = upperCamelCase(http.STATUS_CODES[status]);

        HttpError[upperCamelCasedStatusMessage] = function(paramsOrMessage) {
            HttpError.call(this, status, paramsOrMessage);
        };

        util.inherits(HttpError[upperCamelCasedStatusMessage], HttpError);
    }
});

function upperCamelCase(string) {
    return string.split(' ')
                 .map(word => word[0].toUpperCase() + word.substr(1))
                 .join('')
                 .replace(/[^0-9a-z]/gi, '');
}

module.exports = HttpError;