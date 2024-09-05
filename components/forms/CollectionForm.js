import { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
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
  };

  return (
    <>

      <Form onSubmit={handleSubmit} className="form-container-idea">
        <Form.Group className="form-container-left">
          <h1 className="form-title">Create a Collection</h1>
          <Form.Label className="form-label">Name</Form.Label>
          <Form.Control
            name="name"
            required
            value={formInput.name}
            onChange={handleChange}
            className="form-input"
          />
          <Form.Label className="form-label">Cover Photo</Form.Label>
          <Form.Control
            name="cover"
            required
            value={formInput.cover}
            onChange={handleChange}
            className="form-input"
          />
          <br />
        </Form.Group>
        <div className="form-container-bottom">
          <h1 className="form-label">Add Ideas</h1>
          <MultiSelectIdea
            ideas={ideas}
            selectedIdeas={formInput.ideas}
            onSelect={handleIdeasChange}
          />
        </div>
      </Form>
    </>
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
