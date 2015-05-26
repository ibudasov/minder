'use strict';
var http = require('http');
var errs = require('./../errorHandler.js');
var fakeToken = 1234567890;

describe('API POST /thought', function () {
    it('http code should be 401', function (done) {

        var options = {
            hostname: '127.0.0.1',
            port: 3000,
            path: '/thought',
            agent: false,
            method: 'POST'
        };

        var req = http.request(options, function (res) {
            res.statusCode.should.equal(401);
            done();

        });
        req.on('error', function () {
            done(e);
        });
        req.on('end', function () {
            done();
        });
        req.end();

    });
});

describe('API GET /thought', function () {
    it('un-authentificated http code should be 401', function (done) {

        var options = {
            hostname: '127.0.0.1',
            port: 3000,
            path: '/thought',
            agent: false,
            method: 'get'
        };

        var req = http.request(options, function (res) {
            res.statusCode.should.equal(401);
            done();
        });
        req.on('error', function (e) {
            done(e);
        });
        req.on('end', function (e) {
            done();
        });
        req.end();

    });
    it('authentificated http response should have .list array', function (done) {

        var options = {
            hostname: '127.0.0.1',
            port: 3000,
            path: '/thought?accessToken=' + fakeToken,
            agent: false,
            method: 'get'
        };
        var req = http.request(options, function (res) {
            var body = '';
            res.on('data', function (chunk) {
                body += chunk;
            });
            res.on('end', function () {
                var bodyObject = JSON.parse(body);
                bodyObject.should.have.property('list');
                done();
            });
        });
        req.on('error', function (e) {
            done(e);
        });
        req.on('end', function (e) {
            done();
        });
        req.end();

    });

    it('authentificated http code should be 200', function (done) {

        var options = {
            hostname: '127.0.0.1',
            port: 3000,
            agent: false,
            path: '/thought?accessToken=' + fakeToken,
            method: 'get'
        };

        var req = http.request(options, function (res) {
            res.statusCode.should.equal(200);
            done();
        });
        req.on('error', function (e) {
            done(e);
        });
        req.on('end', function (e) {
            done();
        });
        req.end();

    });

});

describe('API GET /thought/distinct', function () {
    it('http code should be 401', function (done) {

        var options = {
            hostname: '127.0.0.1',
            port: 3000,
            agent: false,
            path: '/thought/distinct',
            method: 'get'
        };

        var req = http.request(options, function (res) {
            res.statusCode.should.equal(401);
            done();
        });
        req.on('error', function (e) {
            done(e);
        });
        req.on('end', function (e) {
            done();
        });
        req.end();
    });
});
