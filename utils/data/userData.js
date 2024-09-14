import { clientCredentials } from '../client';

const endpoint = clientCredentials.databaseURL;

const createUser = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/users`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const getSingleUser = (uid) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/users/${uid}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const updateUser = (userId, user) => new Promise((resolve, reject) => {
  console.warn('ideaId', user);
  fetch(`${clientCredentials.databaseURL}/users/${userId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  })
    .then(resolve)
    .catch(reject);
});

export {
  createUser, getSingleUser, updateUser,
};
