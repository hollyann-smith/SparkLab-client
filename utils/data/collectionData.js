import { clientCredentials } from '../client';

const getCollections = () => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/collections`)
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

const getSingleCollection = (id) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/collections/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
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

const updateCollection = (collectionId, collection) => new Promise((resolve, reject) => {
  console.warn('UPDATEcollection', collection);
  fetch(`${clientCredentials.databaseURL}/collections/${collectionId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(collection),
  })
    .then(resolve)
    .catch(reject);
});

const addIdeaToCollection = (collectionId, ideaId) => {
  // First, fetch the collection details
  fetch(`${clientCredentials.databaseURL}/collections/${collectionId}`)
    .then((response) => response.json())
    .then((collection) => {
      const { user } = collection;
      // Check if the collection already contains the idea
      if (!collection.ideas.some((idea) => idea.id === ideaId)) { // Use .some for comparing object properties
        // Add the idea to the collection
        collection.ideas.push({ id: ideaId }); // Push the idea as an object

        // Update reqObj with the new ideas list
        const reqObj = {
          user: user?.id,
          id: collection.id,
          name: collection.name,
          cover: collection.cover,
          ideas: collection.ideas.map((idea) => idea.id), // Updated list of idea IDs
        };

        // Use updateCollection to update the collection with the new idea
        updateCollection(collectionId, reqObj)
          .then(() => {
            console.warn('PROMISEcollectionId', collectionId);
            console.warn('ideaId', ideaId);
            console.warn('collection', collection);
            console.warn('Idea added to collection successfully');
          })
          .catch((error) => {
            console.error('Error updating collection:', error);
          });
      } else {
        console.warn('Idea is already in the collection');
      }
    })
    .catch((error) => {
      console.error('Error fetching collection:', error);
    });
};

// const addIdeaToCollection = (collectionId, ideaId) => {
//   // First, fetch the collection details
//   fetch(`${clientCredentials.databaseURL}/collections/${collectionId}`)
//     .then((response) => response.json())
//     .then((collection) => {
//       const { user } = collection;
//       const reqObj = {
//         user: user?.id, id: collection.id, name: collection.name, cover: collection.cover, ideas: collection.ideas.map((idea) => idea.id),
//       };
//       console.warn('SDFGSDFGSDFGDFSGSDFG', reqObj);
//       // Check if the collection already contains the idea
//       if (!collection.ideas.includes(ideaId)) {
//         // Add the idea to the collection
//         collection.ideas.push(ideaId);

//         // Use updateCollection to update the collection with the new idea
//         updateCollection(collectionId, reqObj)
//           .then(() => {
//             console.warn('PROMISEcollectionId', collectionId);
//             console.warn('ideaId', ideaId);
//             console.warn('collection', collection);
//             console.warn('Idea added to collection successfully');
//           })
//           .catch((error) => {
//             console.error('Error updating collection:', error);
//           });
//       } else {
//         console.warn('Idea is already in the collection');
//       }
//     })
//     .catch((error) => {
//       console.error('Error fetching collection:', error);
//     });
// };

export {
  getCollections,
  createColletcion,
  deleteSingleCollection,
  updateCollection,
  getSingleCollection,
  addIdeaToCollection,
};
