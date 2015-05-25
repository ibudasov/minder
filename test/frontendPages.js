'use strict';
var http = require('http');
var errs = require('./../errorHandler.js');


describe('Main page', function () {
    it('http code should be success', function (done) {

        var options = {
            host: 'localhost',
            port: 3000,
            path: '/',
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

describe('Login page', function () {
    it('http code should be success', function (done) {

        var options = {
            host: 'localhost',
            port: 3000,
            path: '/login',
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

describe('Add page', function () {
    it('should redirect to /login with code 302', function (done) {

        var options = {
            host: 'localhost',
            port: 3000,
            path: '/add',
            method: 'get'
        };

        http.get(options, function (res) {
            res.statusCode.should.equal(302);
        }).on('error', function (e) {
            errs.handle(e);
        });
        done();
    });
});

describe('Stats page', function () {
    it('should redirect to /login with code 302', function (done) {

        var options = {
            host: 'localhost',
            port: 3000,
            path: '/stats',
            method: 'get'
        };

        http.get(options, function (res) {
            res.statusCode.should.equal(302);
        }).on('error', function (e) {
            errs.handle(e);
        });
        done();
    });
});

describe('Cloud page', function () {
    it('should redirect to /login with code 302', function (done) {

        var options = {
            host: 'localhost',
            port: 3000,
            path: '/cloud',
            method: 'get'
        };

        http.get(options, function (res) {
            res.statusCode.should.equal(302);
        }).on('error', function (e) {
            errs.handle(e);
        });
        done();
    });
});

describe('Calendar page', function () {
    it('should redirect to /login with code 302', function (done) {

        var options = {
            host: 'localhost',
            port: 3000,
            path: '/calendar',
            method: 'get'
        };

        http.get(options, function (res) {
            res.statusCode.should.equal(302);
        }).on('error', function (e) {
            errs.handle(e);
        });
        done();
    });
});



