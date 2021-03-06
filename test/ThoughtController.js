'use strict';
var http = require('http');
var querystring = require('querystring');
var fakeToken = 1234567890;

describe('API POST /thought', function () {
    it('ANON: 401 Unauthorized', function (done) {

        var options = {
            hostname: '127.0.0.1',
            port: 3000,
            path: '/thought',
            agent: false,
            method: 'post'
        };

        var req = http.request(options, function (res) {
            res.statusCode.should.equal(401);
            done();

        });
        req.on('error', function () {
            done(e);
        });
        req.end();

    });

    it('AUTH: 200 OK: {"added":"photo"}', function (done) {

        var postData = querystring.stringify({
            'thought' : 'mocha'
        });
        var options = {
            hostname: '127.0.0.1',
            port: 3000,
            agent: false,
            path: '/thought?accessToken=' + fakeToken,
            method: 'post',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Content-Length': postData.length
            }
        };

        var req = http.request(options, function (res) {
            res.setEncoding('utf8');
            res.on('data', function (chunk) {

            });
            res.statusCode.should.equal(200);
            done();
        });
        req.on('error', function (e) {
            done(e);
        });
        req.write(postData);
        req.end();
    });
});

describe('API GET /thought', function () {
    it('ANON: 401 Unauthorized', function (done) {

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
        req.end();
    });

    it('AUTH: 200 OK', function (done) {

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
        req.end();
    });

    it('AUTH: 200 OK: {"list":["photo","mocha","photo"]}', function (done) {

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
        req.end();
    });
});

describe('API GET /thought/distinct', function () {
    it('ANON: 401 Unauthorized', function (done) {

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
        req.end();
    });

    it('AUTH: 200 OK: {"list":["photo","mocha"]}', function (done) {

        var options = {
            hostname: '127.0.0.1',
            port: 3000,
            path: '/thought/distinct?accessToken=' + fakeToken,
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
        req.end();
    });

});
