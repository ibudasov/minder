'use strict';
var http = require('http');
var errs = require('./../errorHandler.js');


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
    it('http code should be 401', function (done) {

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

describe('API GET /statistic/top', function () {
    it('http code should be 401', function (done) {

        var options = {
            host: 'localhost',
            port: 3000,
            path: '/statistic/top/',
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

describe('API GET /statistic/top/5', function () {
    it('http code should be 401', function (done) {

        var options = {
            host: 'localhost',
            port: 3000,
            path: '/statistic/top/5',
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

