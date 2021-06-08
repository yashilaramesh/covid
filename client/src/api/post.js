let body = {};
const defaultOptions = {
  method: 'POST',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
}

function filtersToBody(filters) {
  const { dates, topic, accounts, platforms, page, sortBy } = filters;
  const { curatedOnly, categories, institutions, location } = accounts;
  const body = { platforms, page, sortBy };

  const { from:fromString, to:toString } = dates;

  const from = new Date(fromString);
  from.setMinutes(from.getMinutes() + from.getTimezoneOffset());

  const to = new Date(toString);
  to.setMinutes(to.getMinutes() + to.getTimezoneOffset());
  to.setDate(to.getDate() + 1);

  body.dates = { from, to };

  if (topic !== 'all') {
    body.topic = topic;
  }
  if (curatedOnly) {
    if (categories !== 'all') {
      body.category = categories;
    }
    if (institutions !== 'all') {
      body.institutions = (institutions === 'institutional');
    }
    if (location !== 'all') {
      body.georgia = (location === 'georgia');
    }
  }
  return body;
}

export let page = 0;
export let lastPage = true;

async function fetchPosts() {
  const options = {
    ...defaultOptions,
    body: JSON.stringify(body)
  }
  const res = await fetch(`/api/post/${page}`, options);
  const { posts, lastPage: isLastPage } = await res.json();
  lastPage = isLastPage;
  return posts;
}

export async function getPosts(filters) {
  page = 0;
  body = filtersToBody(filters);
  return await fetchPosts();
}

export async function getNextPage() {
  page += 1;
  return await fetchPosts();
}

export async function getPrevPage() {
  if (page > 0) page -= 1;
  return await fetchPosts();
}