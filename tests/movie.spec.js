import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
chai.use(sinonChai);

global.fetch = require('node-fetch');

import OmdbWrapper from '../src/index';

describe('Movie',  () => {
  let stubedFetch;
  let promise;
  let omdb;

  beforeEach( () => {
    omdb = new OmdbWrapper({
      apiKEY: 'foo'
    });

    stubedFetch = sinon.stub(global, 'fetch');
    promise = stubedFetch.resolves({ json: () => ({ album: 'name' }) });
  });

  afterEach( () => {
    stubedFetch.restore();
  });


  describe('smoke tests Movie', () => {

    it('shoud have getMovie method', () => {
      expect(omdb.movie.getMovie).to.exist;
    });

  });


  describe('getMovie', () => {
    // verifica se o fetch ocorre
    it('Should call fetch method', () => {
      const movie = omdb.movie.getMovie();
      expect(stubedFetch).to.have.been.calledOnce;
    });

    // veririca se o fetch ocorre com a url desejada
    it('Should call fetch witch correct  URL', () => {
      const movie = omdb.movie.getMovie('0001');
      expect(stubedFetch).to.have.been.calledWith('https://www.omdbapi.com/?i=0001&apikey=foo');
    });


    // verifica se o dado é recebido pela Promise
    it('should return the correct data from Promise', () => {
      const movie = omdb.movie.getMovie('0001');
      movie.then((data) => {expect(data).to.be.eql({ album: 'name'});
      })
    });


  });


});
