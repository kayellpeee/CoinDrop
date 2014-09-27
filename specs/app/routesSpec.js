/*jshint expr:true */
// 'use strict';
var request = require('supertest');
var express = require('express');
var expect = require('chai').expect;
var app = require('../../server.js');
var db = require('../../app/config/db.js');

var User = require('../../app/config/models/user.js');
//var Link = require('../app/models/link');

/////////////////////////////////////////////////////
// NOTE: these tests are designed for mongo!
/////////////////////////////////////////////////////
describe('', function() {
      User.remove({username : 'Svnh'}).exec();
      User.remove({password : 'Svnh'}).exec();
      User.remove({username : 'Brandon'}).exec();

  describe('Routing', function() {
    it('should work', function(done) {
      request(app)
        .get('/')
        .expect(200)
        .end(done);
    });

  });

});


//TESTING FOR THE DATABASE

  describe('Database', function() {

    it('should be able to sign up a User', function(done) {
      request(app)
        .post('/signup')
        .expect(200)
        .send({
          'username': 'Svnh',
          'password': 'Svnh' })
        .expect(302)
        .expect(function() {
         
          User.find({'username': 'Svnh'},function (err, users) {
            if (err) return console.error(err);
            expect(users[0].password).to.equal('Svnh');
          });

        })
        .end(done);
    });

    it('should be able to authenticate and sign in a User', function(done) {
      request(app)
        .post('/login')
        .expect(200)
        .send({
          'username': 'Svnh',
          'password': 'Svnh' })
        .expect(302)
        .expect(function() {
         
        User.find({'username': 'Svnh'},function (err, users) {
            if (err) return console.error(err);
            expect(users[0].password).to.equal('Svnh');
          });

        })
        .end(done);
    });


 it('should be able to create another User', function(done) {
      
           //CREATES A USER NAMED BRANDON
          request(app)
        .post('/signup')
        .send({
          'username': 'Brandon',
          'password': 'yelpsucks' })
        .expect(function() {
          User.find({'username': 'Brandon'},function (err, users) {
            if (err) return console.error(err);
            expect(users[0].password).to.equal('yelpsucks');
         
          });

        }).end(done);    
    });


    it('should create a bitcoin wallet and store the address', function(done) {
      

          request(app).post('/create')
        .expect(302)
        .send({
          'username': 'Svnh',
          'otherUser': 'Brandon'})
        .expect(function() {
          User.find(function (err, users) {
            if (err) return console.error(err);
            
            expect(users[0].transactions[0]['address']).to.equal("1234");
            expect(users[0].transactions[0]['key1']).to.equal("key");
            expect(users[0].transactions[0]['key2']).to.equal('');
            expect(users[0].transactions[0]['otherUser']).to.equal("Brandon");

            expect(users[1].transactions[0]['address']).to.equal("5678");
            expect(users[1].transactions[0]['key1']).to.equal("rkey");
            expect(users[1].transactions[0]['key2']).to.equal('');
            expect(users[1].transactions[0]['otherUser']).to.equal("Svnh");
          });
        }).end(done);


//CREATES A TRANSACTION WITH BRANDON AS THE OTHER USER

        
    });

 it('should be able to retrieve a list of updating transactions', function(done) {
      request(app)
        .post('/transactions')
        .expect(200)
        .send({
          'username': 'Svnh'})
        .expect(function(res) {
            expect(res.body.transactions[0]).to.be.ok;
          }
        )
        .end(done);
    });

        it('should be able to release the key to the other user', function(done) {
     
        request(app)
        .post('/release')
        .expect(302)
        .send({
          'username': 'Svnh',
          'otherUser': 'Brandon' })
        .expect(function() {
          User.find({'username': 'Brandon'},function (err, users) {
            if (err) return console.error(err);

            expect(users[0].transactions[0]['address']).to.equal("5678");
            expect(users[0].transactions[0]['key1']).to.equal("rkey");
            expect(users[0].transactions[0]['key2']).to.equal('key');
            expect(users[0].transactions[0]['otherUser']).to.equal("Svnh");

          });
        }).end(done);

        }); 

    });