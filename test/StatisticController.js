'use strict';
var http = require('http');
var fakeToken = 1234567890;

describe('API GET /statistic/top', function () {
    it('anonymous http code should be 401', function (done) {

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
        req.end();
    });

    it('authentificated http response should have .topThoughts array', function (done) {

        var options = {
            hostname: '127.0.0.1',
            port: 3000,
            path: '/statistic/top?accessToken=' + fakeToken,
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
                bodyObject.should.have.property('topThoughts');
                done();
            });
        });
        req.on('error', function (e) {
            done(e);
        });
        req.end();
    });
});

describe('API GET /statistic/top/5', function () {
    it('anonymous http code should be 401', function (done) {

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
        req.end();
    });

    it('authentificated http response should have .topThoughts array', function (done) {

        var options = {
            hostname: '127.0.0.1',
            port: 3000,
            path: '/statistic/top/5?accessToken=' + fakeToken,
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
                bodyObject.should.have.property('topThoughts');
                done();
            });
        });
        req.on('error', function (e) {
            done(e);
        });
        req.end();
    });

    it('authentificated http response should have 5 elements in .topThoughts array', function (done) {

        var options = {
            hostname: '127.0.0.1',
            port: 3000,
            path: '/statistic/top/5?accessToken=' + fakeToken,
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
                bodyObject.should.have.property('topThoughts');
                // @see: https://github.com/tj/should.js/
                bodyObject.topThoughts.length.should.not.be.above(5);
                done();
            });
        });
        req.on('error', function (e) {
            done(e);
        });
        req.end();
    });
});

