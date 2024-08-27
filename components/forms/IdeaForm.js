import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { createIdea, getSupplies, updateIdea } from '../../utils/data/ideaData';
import MultiSelectDropdown from '../SupplyInput';

const initialState = {
  title: '',
  img: '',
  description: '',
  supplies: [],
  saved: false,
};

const IdeaForm = ({ obj, user }) => {
  const router = useRouter();
  const [formInput, setFormInput] = useState(initialState);
  const [supplies, setSupplies] = useState([]);

  useEffect(() => {
    getSupplies().then(setSupplies);

    if (obj.id) {
      setFormInput({
        id: obj.id,
        title: obj.title,
        img: obj.img,
        description: obj.description,
        supplies: obj.supplies || [],
        user: user.id,
        saved: obj.saved,
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

  const handleSuppliesChange = (selectedSupplies) => {
    setFormInput((prevState) => ({
      ...prevState,
      supplies: selectedSupplies,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      ...formInput,
      user: user.id,
      supplies: formInput.supplies.map((supply) => supply.id),
    };

    if (obj.id) {
      updateIdea(formInput.id, payload).then(() => router.push('/ideas'));
    } else {
      createIdea(payload).then(() => router.push('/ideas'));
    }
  };

  return (
    <>

      <Form onSubmit={handleSubmit} className="form-container">
        <Form.Group className="form-container-left">
          <h1 className="form-title">IDEA FORM</h1>
          <Form.Label className="form-label">Title</Form.Label>
          <Form.Control
            name="title"
            required
            value={formInput.title}
            onChange={handleChange}
            className="form-input"
          />
          <Form.Label className="form-label">Image</Form.Label>
          <Form.Control
            name="img"
            required
            value={formInput.img}
            onChange={handleChange}
            className="form-input"
          />
          <Form.Label className="form-label">Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={10}
            name="description"
            required
            value={formInput.description}
            onChange={handleChange}
            className="form-control form-control-content"
          />
          <br />
          <Form.Label className="form-label">Saved?</Form.Label>
          <Form.Check
            className="text-white mb-3"
            type="switch"
            id="saved"
            name="saved"
            label="Save?"
            checked={formInput.saved}
            onChange={(e) => {
              setFormInput((prevState) => ({
                ...prevState,
                saved: e.target.checked,
              }));
            }}
          />
        </Form.Group>
        <div className="form-container-right">
          <Form.Label className="form-label">Supplies</Form.Label>
          <MultiSelectDropdown
            supplies={supplies}
            selectedSupplies={formInput.supplies}
            onSelect={handleSuppliesChange}
          />
          <Button variant="primary" type="submit" className="form-submit-button">
            Submit
          </Button>
        </div>
      </Form>
    </>
  );
};

IdeaForm.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.number,
  }).isRequired,
  obj: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    img: PropTypes.string,
    description: PropTypes.string,
    saved: PropTypes.bool,
    supplies: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
      }),
    ),
  }),
};

IdeaForm.defaultProps = {
  obj: initialState,
};

export default IdeaForm;
