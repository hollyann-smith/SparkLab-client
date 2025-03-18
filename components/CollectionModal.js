/* eslint-disable jsx-a11y/control-has-associated-label */
import React,
{ useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Modal } from 'react-bootstrap';
import { addIdeaToCollection, getCollections } from '../utils/data/collectionData';
import { useAuth } from '../utils/context/authContext';
import CollectionIdeaCard from './CollectionIdeaCard';

function CollectionModal({ ideaId }) {
  const [show, setShow] = useState(false);
  const { user } = useAuth();
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [collections, setCollections] = useState([]);
  const [selectedCollection, setSelectedCollection] = useState(null);

  useEffect(() => {
    let isMounted = true;
    if (user?.id) {
      getCollections()
        .then((allCollections) => {
          if (isMounted) {
            const userCollections = allCollections.filter((collection) => collection.user.id === user.id);
            setCollections(userCollections);
          }
        })
        .catch((error) => {
          console.error('Error fetching collections:', error);
        });
    }

    return () => {
      isMounted = false;
    };
  }, [ideaId, user.id]);

  const handleCardClick = (collectionId) => {
    setSelectedCollection(collectionId);
  };

  const handleSave = () => {
    if (selectedCollection) {
      addIdeaToCollection(selectedCollection, ideaId);
      handleClose();
    }
  };

  return (
    <>
      <button type="button" className="buttn" onClick={handleShow}>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="icon" viewBox="0 0 16 16">
          <path fillRule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2" />
        </svg>
      </button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Select Collection</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div style={{ margin: '20px' }} className="d-flex flex-wrap">
            {collections.map((collection) => (
              <CollectionIdeaCard
                key={collection.id}
                obj={collection}
                onClick={() => handleCardClick(collection.id)}
                isSelected={collection.id === selectedCollection}
              />
            ))}
          </div>
          <Button variant="primary" onClick={handleSave}>
            Save changes
          </Button>
        </Modal.Body>
      </Modal>
    </>
  );
}

CollectionModal.propTypes = {
  ideaId: PropTypes.number.isRequired,
};

export default CollectionModal;
