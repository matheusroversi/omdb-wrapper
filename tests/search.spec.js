import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
chai.use(sinonChai);

global.fetch = require('node-fetch');

import OmdbWrapper from '../src/index';

describe('Search', () => {
    let omdb;
    let fetchedStub;
    let promise;

    beforeEach( () => {
      omdb = new OmdbWrapper({
        apiKEY: 'foo'
      });

      fetchedStub = sinon.stub(global,'fetch');
      fetchedStub.resolves({ json: () => ({ album: 'name' }) });
    });

    afterEach( () => {
      fetchedStub.restore();
    });


  describe('smoke tests search', () =>{


    it('Shoud exist the omdb.search.albums method', () => {
      expect(omdb.search.movies).to.exist;
    });

  });


  describe('omdb.search.movies', () => {

    it('Should call fetch function', () => {
      const search = omdb.search.movies('harry+potter');
      expect(fetchedStub).to.have.been.calledOnce;
    });

    it('Should receibe the correct url to fetch', () => {
        const search = omdb.search.movies('harry+potter');
        expect(fetchedStub).to.have.been.calledWith('https://www.omdbapi.com/?s=harry+potter&apikey=foo');
    });

    it('should return the correct data from Promise', () => {
      const search = omdb.search.movies('harry+potter');
      search.then((data) => {expect(data).to.be.eql({ album: 'name'});
      })
    });
  });


});
