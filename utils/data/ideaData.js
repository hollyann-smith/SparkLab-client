import { clientCredentials } from '../client';

const getIdeas = () => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/ideas`)
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

export default getIdeas;
