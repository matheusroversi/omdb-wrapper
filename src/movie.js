
export default function movie() {
  return {
    getMovie: id => this.request(`${this.apiURL}/?i=${id}&apikey=${this.apiKEY}`)
  };
}
