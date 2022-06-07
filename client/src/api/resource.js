// Functions for the /api/resource API endpoints

import { authFetch } from '../util/auth';

let body = {};
const defaultOptions = {
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
}

export let page = 0;
export let lastPage = true;

/**
 * Fetches resources using the GET /api/resource API endpoint.
 */
async function fetchResources() {
  const options = {
    ...defaultOptions,
    method: 'GET',
    body: JSON.stringify(body),
  }
  const res = await authFetch(`/api/resource/${page}`, options);

  const { resources, lastPage: isLastPage } = await res.json();
  lastPage = isLastPage;
  return resources;
}

/**
 * Fetches resources using the given set of filters.
 */
async function getResources(filters) {
  page = 0;
  //body = filtersToBody(filters);
  return await fetchResources();
}
/**
 * Fetches the next page of resources.
 */
async function getNextPage() {
  page += 1;
  return await fetchResources();
}

/**
 * Fetches the previous page of resources.
 */
async function getPrevPage() {
  if (page > 0) page -= 1;
  return await fetchResources();
}

async function createResource(resource) {
  const options = {
    ...defaultOptions,
    method: 'POST',
    body: JSON.stringify(resource)
  }
  const res = await authFetch(`/api/resource`, options);
  const body = await res.json();
  return body;
}

async function deleteResource(resource) {
  const options = {
    ...defaultOptions,
    method: 'DELETE',
    body: JSON.stringify(resource)
  }
  console.log(body);
  const res = await authFetch(`/api/resource`, options);
  console.log(res);
  return res.status === 200;
}

export {
  getResources,
  getNextPage,
  getPrevPage,
  createResource,
  fetchResources,
  deleteResource,
};
