var request = require('supertest');
var express = require('express');
var expect = require('chai').expect;
var app = require('../../server.js');

//var db = require('../app/config');
//var User = require('../app/models/user');
//var Link = require('../app/models/link');

/////////////////////////////////////////////////////
// NOTE: these tests are designed for mongo!
/////////////////////////////////////////////////////

  describe('Routing', function() {

    // it('should work', function(done) {
    //   request(app)
    //     .get('/')
    //     .expect(200)
    //     .end(done);
    // });

  var $route;

  beforeEach(module('coindropApp'));
  beforeEach(inject(function($injector){
    $route = $injector.get('$route');
  }));

  it('Should have /initiate route, template, and controller', function () {
    expect($route.routes['/initiate']).to.be.ok();
    expect($route.routes['/initiate'].controller).to.be('initiateCtrl');
    expect($route.routes['/initiate'].templateUrl).to.be('scripts/states/initiate/initiate.html');
  });

});
