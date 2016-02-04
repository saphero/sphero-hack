'use strict';

const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const expect = chai.expect;
const createAppServer = require(__dirname + '/../server');

describe('UNIT: test the router endpoints', () => {
  before(() => this.server = createAppServer(4000));
  it('should make a GET request at / (landing page)', (done) => {
    chai.request('localhost:3000')
      .get('/')
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(res).to.have.status(200);
        done();
      });
  });
  it('should make a GET request at /about', (done) => {
    chai.request('localhost:3000')
      .get('/about')
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(res).to.have.status(200);
        done();
      });
  });
  it('should make a GET request at /color', (done) => {
    chai.request('localhost:3000')
      .get('/color')
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(res).to.have.status(200);
        done();
      });
  });
  it('should make a GET request at /move', (done) => {
    chai.request('localhost:3000')
      .get('/move')
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(res).to.have.status(200);
        done();
      });
  });
  after((done) => {
    this.server.close(done);
  });
});
