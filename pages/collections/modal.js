import React,
{ useEffect, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { getCollections, updateCollection } from '../../utils/data/collectionData';
import { useAuth } from '../../utils/context/authContext';
import CollectionCard from '../../components/CollectionCard';

function CollectionModal() {
  const [show, setShow] = useState(false);
  const { user } = useAuth();
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [collections, setCollections] = useState([]);
  const [selectedCollection, setSelectedCollection] = useState('');

  useEffect(() => {
    getCollections().then(setCollections);
  }, []);

  const handleChange = (e) => {
    const selectedCollectionId = e.target.value;
    setSelectedCollection(selectedCollectionId);
  };

  const handleSave = () => {
    if (selectedCollection) {
      const payload = {
        collectionId: selectedCollection,
        userId: user.id,
      };
      updateCollection(payload)
        .then(() => {
          console.warn(`Idea added to collection ${selectedCollection}`);
        })
        .catch((error) => {
          console.error('Error adding idea to collection:', error);
        });
    } else {
      console.warn('No collection selected');
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
              <CollectionCard key={collection.id} obj={collection} onClick={handleChange} />
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

export default CollectionModal;
