
import search from './search';
import movie from './movie';
import { API_URL } from './config';
import { toJSON } from './utils';

global.fetch = require('node-fetch');

export default class OmdbWrapper {
  constructor(options) {
    this.apiURL = options.apiURL || API_URL;
    this.apiKEY = options.apiKEY;
    this.movie = movie.bind(this)();
    this.search = search.bind(this)();
  }

  request(url) {
    // ${this.token}`
    return fetch(url).then(toJSON);
  }
}
