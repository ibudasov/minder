'use strict';
var http = require('http');
var errs = require('./../errorHandler.js');

describe('API GET /statistic/top', function () {
    it('http code should be 401', function (done) {

        var options = {
            port: 3000,
            hostname: '127.0.0.1',
            path: '/statistic/top/',
            agent: false,
            method: 'get'
        };

        var req = http.request(options, function(res) {
            res.statusCode.should.equal(401);
            req.end();
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

describe('API GET /statistic/top/5', function () {
    it('http code should be 401', function (done) {

        var options = {
            hostname: '127.0.0.1',
            port: 3000,
            path: '/statistic/top/5',
            agent: false,
            method: 'get'
        };

        var req = http.request(options, function(res) {
            res.statusCode.should.equal(401);
            req.end();
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

