'use strict';
var http = require('http');
var fakeToken = 1234567890;

describe('Main page', function () {
    it('http code should be success', function (done) {

        var options = {
            hostname: 'localhost',
            port: 3000,
            path: '/',
            agent: false,
            method: 'get'
        };

        var req = http.request(options, function (res) {
            res.statusCode.should.equal(200);
            req.end();
            done();
        });
        req.on('error', function (e) {
            done(e);
        });
        req.end();
    });
});

describe('Login page', function () {
    it('http code should be success', function (done) {

        var options = {
            hostname: 'localhost',
            port: 3000,
            path: '/login',
            agent: false,
            method: 'get'
        };

        var req = http.request(options, function (res) {
            res.statusCode.should.equal(200);
            req.end();
            done();
        });
        req.on('error', function (e) {
            done(e);
        });
        req.end();
    });
});

describe('Add page', function () {
    it('should redirect to /login with code 302', function (done) {

        var options = {
            hostname: 'localhost',
            port: 3000,
            path: '/add',
            agent: false,
            method: 'get'
        };

        var req = http.request(options, function (res) {
            res.statusCode.should.equal(302);
            req.end();
            done();
        });
        req.on('error', function (e) {
            done(e);
        });
        req.end();
    });
});

describe('Stats page', function () {
    it('should redirect to /login with code 302', function (done) {

        var options = {
            hostname: 'localhost',
            port: 3000,
            path: '/stats',
            agent: false,
            method: 'get'
        };

        var req = http.request(options, function (res) {
            res.statusCode.should.equal(302);
            req.end();
            done();
        });
        req.on('error', function (e) {
            done(e);
        });
        req.end();
    });
});

describe('Cloud page', function () {
    it('should redirect to /login with code 302', function (done) {

        var options = {
            hostname: 'localhost',
            port: 3000,
            path: '/cloud',
            agent: false,
            method: 'get'
        };

        var req = http.request(options, function (res) {
            res.statusCode.should.equal(302);
            req.end();
            done();
        });
        req.on('error', function (e) {
            done(e);
        });
        req.end();
    });
});

describe('Calendar page', function () {
    it('should redirect to /login with code 302', function (done) {

        var options = {
            hostname: 'localhost',
            port: 3000,
            path: '/calendar',
            agent: false,
            method: 'get'
        };

        var req = http.request(options, function (res) {
            res.statusCode.should.equal(302);
            req.end();
            done();
        });
        req.on('error', function (e) {
            done(e);
        });
        req.end();
    });
});
