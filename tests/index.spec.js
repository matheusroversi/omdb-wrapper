import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
chai.use(sinonChai)

global.fetch = require('node-fetch');


import OmdbWrapper from '../src/index';

describe('OmdbWrapper library', function() {

    it('shoud create an instance of OmdbWrapper', () => {
      let omdb = new OmdbWrapper({});
      expect(omdb).to.be.an.instanceof(OmdbWrapper);
    });


    it('shoud receve apiURL as a option', () => {
      let omdb = new OmdbWrapper({
        apiURL: 'asdf'
      });
      expect(omdb.apiURL).to.be.equal('asdf');
    });

    it('shoud use default apiURL if not provided', () => {
      let omdb = new OmdbWrapper({});
      expect(omdb.apiURL).to.be.equal('https://www.omdbapi.com');
    });


    it('shoud receve apiURL as a option', () => {
      let omdb = new OmdbWrapper({
        apiKEY: 'foo'
      });
      expect(omdb.apiKEY).to.be.equal('foo');
    });


  describe('request method', () => {
    let stubedFetch;
    let promise;

    beforeEach( () => {
      stubedFetch = sinon.stub(global, 'fetch');
      promise = stubedFetch.resolves({ json: () => ({ album: 'name' }) });
    });

    afterEach( () => {
      stubedFetch.restore();
    });

    it('should have request method', () => {
      let omdb = new OmdbWrapper({});
      expect(omdb.request).to.exist;
    });

    it('should call fetch when request', () => {
      let omdb = new OmdbWrapper({
        apiKEY: 'foo'
      });
      omdb.request('url');
      expect(stubedFetch).to.have.been.calledOnce;
    });

    it('should call fetch when right url passed', () => {
      let omdb = new OmdbWrapper({
        apiKEY: 'foo'
      });
      omdb.request('url');
      expect(stubedFetch).to.have.been.calledWith('url');
    });


  });


});


