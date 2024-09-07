import React,
{ useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Modal } from 'react-bootstrap';
// import PropTypes from 'prop-types';
import { addIdeaToCollection, getCollections } from '../utils/data/collectionData';
// import { useAuth } from '../utils/context/authContext';
// import CollectionCard from './CollectionCard';
import CollectionIdeaCard from './CollectionIdeaCard';

function CollectionModal({ ideaId }) {
  const [show, setShow] = useState(false);
  // const { user } = useAuth();
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [collections, setCollections] = useState([]);
  const [selectedCollection, setSelectedCollection] = useState(null);

  useEffect(() => {
    getCollections().then(setCollections);
  }, []);

  const handleCardClick = (collectionId) => {
    setSelectedCollection(collectionId);
    console.warn('collectionId', collectionId);
  };

  const handleSave = () => {
    if (selectedCollection) {
      addIdeaToCollection(selectedCollection, ideaId);
      handleClose();
      console.warn('selectedCollection', selectedCollection);
    }
  };

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Open Modal
      </Button>

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
  ideaId: PropTypes.string.isRequired,
};

export default CollectionModal;
