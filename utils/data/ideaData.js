import { clientCredentials } from '../client';

const getIdeas = () => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/ideas`)
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

const getSupplies = () => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/supplies`)
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

const getSingleIdea = (id) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/ideas/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const createIdea = (idea) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/ideas`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(idea),
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const createSupply = (supply) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/supplies`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(supply),
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const deleteSingleIdea = (idea) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/ideas/${idea}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((data) => resolve(data))
    .catch(reject);
});

const deleteSingleSupply = (supply) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/supplies/${supply}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((data) => resolve(data))
    .catch(reject);
});

const updateIdea = (ideaId, idea) => new Promise((resolve, reject) => {
  console.warn('ideaId', idea);
  fetch(`${clientCredentials.databaseURL}/ideas/${ideaId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(idea),
  })
    .then(resolve)
    .catch(reject);
});

export {
  getIdeas, getSingleIdea, createIdea, deleteSingleIdea, updateIdea, getSupplies, createSupply, deleteSingleSupply,
};
