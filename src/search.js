function searcher(query, value, page) {
  return this.request(`${this.apiURL}/?${query}=${value}&apikey=${this.apiKEY}`);
  //return this.request(`${this.apiURL}/&${query}=${value}${(page) ? '&page='+page : '' }`);
}

export default function search() {
  return {
    movies: searcher.bind(this, 's')
  };
}
