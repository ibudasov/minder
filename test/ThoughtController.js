'use strict';
var http = require('http');
var errs = require('./../errorHandler.js');
var fakeToken = 1234567890;


describe('API POST /thought', function () {
    it('http code should be 401', function (done) {

        var options = {
            host: 'localhost',
            port: 3000,
            path: '/thought',
            method: 'post'
        };

        http.get(options, function (res) {
            res.statusCode.should.equal(401);
        }).on('error', function (e) {
            errs.handle(e);
        });
        done();
    });
});

describe('API GET /thought', function () {
    it('un-authentificated http code should be 401', function (done) {

        var options = {
            host: 'localhost',
            port: 3000,
            path: '/thought',
            method: 'get'
        };

        http.get(options, function (res) {
            res.statusCode.should.equal(401);
        }).on('error', function (e) {
            errs.handle(e);
        });
        done();
    });
    it('authentificated http code should be 200', function (done) {

        var options = {
            host: 'localhost',
            port: 3000,
            path: '/thought?accessToken=' + fakeToken,
            method: 'get'
        };

        http.get(options, function (res) {
            res.statusCode.should.equal(200);
        }).on('error', function (e) {
            errs.handle(e);
        });
        done();
    });
});

describe('API GET /thought/distinct', function () {
    it('http code should be 401', function (done) {

        var options = {
            host: 'localhost',
            port: 3000,
            path: '/thought/distinct',
            method: 'get'
        };

        http.get(options, function (res) {
            res.statusCode.should.equal(401);
        }).on('error', function (e) {
            errs.handle(e);
        });
        done();
    });
});

