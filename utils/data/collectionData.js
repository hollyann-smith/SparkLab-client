import { clientCredentials } from '../client';

const getCollections = () => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/collections`)
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

const createColletcion = (collection) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/collections`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(collection),
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const deleteSingleCollection = (collection) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/collections/${collection}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((data) => resolve(data))
    .catch(reject);
});

const updateCollection = (id, collection) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/collections/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(collection),
  })
    .then(resolve)
    .catch(reject);
});

export {
  getCollections,
  createColletcion,
  deleteSingleCollection,
  updateCollection,
};
