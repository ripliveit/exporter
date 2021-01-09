const axios = require('axios');

async function exporter(page = 1) {
  const url = `http://www.static.riplive.it/api/get_recent_posts/?page=${page}`;
  const { data } = await axios.get(url);  
  const { pages, posts } = data;
  const ids = posts.map((post) => post.id);
  
  console.log(`Fetched page ${page}. Exported posts with id: [${ids}]`);

  if (page === pages) {
    console.log('Last page reached', page);
    return;
  }

  return exporter(++page);
}

exporter()
  .then(() => {
    console.log('Export completed');
  })
  .catch((err) => {
    console.error(err);
  });