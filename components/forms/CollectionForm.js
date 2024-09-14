import { useEffect, useState } from 'react';
import { Form, Modal } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { createColletcion, updateCollection } from '../../utils/data/collectionData';
import { getIdeas } from '../../utils/data/ideaData';
import MultiSelectIdea from '../IdeaInput';

const initialState = {
  name: '',
  cover: '',
  ideas: [],
};

const CollectionForm = ({ obj, user }) => {
  const router = useRouter();
  const [formInput, setFormInput] = useState(initialState);
  const [ideas, setIdeas] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    getIdeas().then(setIdeas);
    if (obj.id) {
      setFormInput({
        id: obj.id,
        name: obj.name,
        cover: obj.cover,
        ideas: obj.ideas || [],
        user: user.id,
      });
    }
  }, [obj, user.id]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleIdeasChange = (selectedIdeas) => {
    setFormInput((prevState) => ({
      ...prevState,
      ideas: selectedIdeas,
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (formInput.ideas.length === 0) {
      alert('Please select at least one idea');
      return;
    }
    setShowModal(true);
  };

  const handleFinalSubmit = () => {
    const payload = {
      ...formInput,
      user: user.id,
      ideas: formInput.ideas.map((idea) => idea.id),
    };

    if (obj.id) {
      updateCollection(formInput.id, payload).then(() => router.push('/collections'));
    } else {
      createColletcion(payload).then(() => router.push('/collections'));
    }
    setShowModal(false);
  };

  return (
    <div className="collectionForm">
      <Form onSubmit={handleSubmit} className="form-container-collection-idea">
        <Form.Group className="form-container-col">
          <h1 className="form-title" style={{ textAlign: 'center', marginBottom: '30px' }}>{obj.id ? 'Edit Collection' : 'Create a Collection'}</h1>
          {formInput.ideas.length > 0 && (
          <div className="col-header" style={{ maxWidth: '200px', margin: 'auto' }}>
            <button type="submit" className="form-button">
              Continue
            </button>
          </div>
          )}
          <div className="collection-container-bottom">
            <MultiSelectIdea
              ideas={ideas}
              selectedIdeas={formInput.ideas}
              onSelect={handleIdeasChange}
            />
          </div>
        </Form.Group>
      </Form>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Collection Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group>
            <Form.Label>Name</Form.Label>
            <Form.Control
              name="name"
              required
              value={formInput.name}
              onChange={handleChange}
              className="form-input"
            />
            <Form.Label>Cover Photo</Form.Label>
            <Form.Control
              name="cover"
              required
              value={formInput.cover}
              onChange={handleChange}
              className="form-input"
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <button type="submit" className="form-button" onClick={handleFinalSubmit}>
            Create Collection
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

CollectionForm.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.number,
    username: PropTypes.string,
  }).isRequired,
  obj: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    cover: PropTypes.string,
    ideas: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
      }),
    ),
  }),
};

CollectionForm.defaultProps = {
  obj: initialState,
};

export default CollectionForm;
