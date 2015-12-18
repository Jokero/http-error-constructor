var HttpError = require('../index');
var expect    = require('chai').expect;

describe('http-error-constructor', function() {

    describe('new HttpError([statusCode=500], [messageOrProperties], [properties])', function() {

        it('creates 500 error by default', function() {
            var err = new HttpError();

            expect(err).to.be.an.instanceOf(HttpError);
            expect(err).to.be.an.instanceOf(Error);

            expect(err.name).to.equal('InternalServerError');
            expect(err.statusCode).to.equal(500);
            expect(err.status).to.equal(500);
            expect(err.message).to.equal('Internal Server Error');
        });

        it('creates error with existent code', function() {
            var err = new HttpError(400);

            expect(err).to.be.an.instanceOf(HttpError);
            expect(err).to.be.an.instanceOf(Error);

            expect(err.name).to.equal('BadRequest');
            expect(err.statusCode).to.equal(400);
            expect(err.status).to.equal(400);
            expect(err.message).to.equal('Bad Request');
        });

        // http://tools.ietf.org/html/rfc7231#section-6
        it('creates error with custom code', function() {
            var err = new HttpError(471);

            expect(err).to.be.an.instanceOf(HttpError);
            expect(err).to.be.an.instanceOf(Error);

            expect(err.name).to.equal('471 Error');
            expect(err.statusCode).to.equal(471);
            expect(err.status).to.equal(471);
            expect(err.message).to.be.undefined;
        });

        it('creates error with message and properties', function() {
            var message    = 'Validation failed';
            var properties = {
                fields: {
                    phoneNumber: 'Invalid format'
                }
            };

            var err = new HttpError(400, message, properties);

            expect(err).to.be.an.instanceOf(HttpError);
            expect(err).to.be.an.instanceOf(Error);

            expect(err.name).to.equal('BadRequest');
            expect(err.statusCode).to.equal(400);
            expect(err.status).to.equal(400);
            expect(err.message).to.equal(message);
            expect(err.fields).to.equal(properties.fields);
        });

        it('creates error only with properties', function() {
            var properties = {
                message: 'Validation failed',
                fields:  {
                    phoneNumber: 'Invalid format'
                }
            };

            var err = new HttpError(400, properties);

            expect(err).to.be.an.instanceOf(HttpError);
            expect(err).to.be.an.instanceOf(Error);

            expect(err.name).to.equal('BadRequest');
            expect(err.statusCode).to.equal(400);
            expect(err.status).to.equal(400);
            expect(err.message).to.equal(properties.message);
            expect(err.fields).to.equal(properties.fields);
        });

    });

    describe('new HttpError[<StatusName|StatusCode>]([messageOrProperties], [properties])', function() {
        it('creates error by status name', function() {
            var err = new HttpError.BadRequest();

            expect(err).to.be.an.instanceOf(HttpError.BadRequest);
            expect(err).to.be.an.instanceOf(HttpError[400]);
            expect(err).to.be.an.instanceOf(HttpError);
            expect(err).to.be.an.instanceOf(Error);

            expect(err.name).to.equal('BadRequest');
            expect(err.statusCode).to.equal(400);
            expect(err.status).to.equal(400);
            expect(err.message).to.equal('Bad Request');
        });

        it('creates error by status code', function() {
            var err = new HttpError[400];

            expect(err).to.be.an.instanceOf(HttpError[400]);
            expect(err).to.be.an.instanceOf(HttpError.BadRequest);
            expect(err).to.be.an.instanceOf(HttpError);
            expect(err).to.be.an.instanceOf(Error);

            expect(err.name).to.equal('BadRequest');
            expect(err.statusCode).to.equal(400);
            expect(err.status).to.equal(400);
            expect(err.message).to.equal('Bad Request');
        });

        it('creates error with message and properties', function() {
            var message    = 'Validation failed';
            var properties = {
                fields: {
                    phoneNumber: 'Invalid format'
                }
            };

            var err = new HttpError.BadRequest(message, properties);

            expect(err.name).to.equal('BadRequest');
            expect(err.statusCode).to.equal(400);
            expect(err.status).to.equal(400);
            expect(err.message).to.equal(message);
            expect(err.fields).to.equal(properties.fields);
        });

        it('creates error only with properties', function() {
            var properties = {
                message: 'Validation failed',
                fields:  {
                    phoneNumber: 'Invalid format'
                }
            };

            var err = new HttpError.BadRequest(properties);

            expect(err.name).to.equal('BadRequest');
            expect(err.statusCode).to.equal(400);
            expect(err.status).to.equal(400);
            expect(err.message).to.equal(properties.message);
            expect(err.fields).to.equal(properties.fields);
        });
    });

});