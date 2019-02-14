global.fetch = require('node-fetch');

import omdbWrapper from '../src/index';

const omdb = new omdbWrapper({
  apiKEY: '19572e5c'
})

const movies = omdb.search.movies('harry potter');

movies.then(data => console.log(data));
//movies.then(data => data.albums.items.map(item => console.log(item.name)));
