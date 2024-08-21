import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { createIdea, getSupplies, updateIdea } from '../../utils/data/ideaData';

const initialState = {
  title: '',
  img: '',
  description: '',
  supplies: '',
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
        supplies: obj.supplies.id,
        user: user.id,
        saved: obj.saved,
      });
    }
    console.warn('user.id', user.id);
  }, [obj, user.id]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (obj.id) {
      const payload = {
        id: formInput.id,
        title: formInput.title,
        img: formInput.img,
        description: formInput.description,
        supplies: formInput.supplies.id,
        user: user.id,
        saved: formInput.saved,
      };
      console.warn({ payload });
      updateIdea(formInput.id, payload)
        .then(() => router.push('/ideas'));
    } else {
      const payload = { ...formInput, user: user.id };
      console.warn('Payload:', payload);
      createIdea(payload)
        .then(() => router.push('/ideas'));
    }
  };
  return (
    <>
      <h1 className="form-title">IDEA FORM</h1>
      <Form onSubmit={handleSubmit} className="post-form">
        <Form.Group className="form-group">
          <Form.Label className="form-label">Title</Form.Label>
          <Form.Control
            name="title"
            required
            value={formInput.title}
            onChange={handleChange}
            className="form-control"
          />
          <Form.Label className="form-label">Image</Form.Label>
          <Form.Control
            name="img"
            required
            value={formInput.img}
            onChange={handleChange}
            className="form-control"
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
        </Form.Group>
        <Form.Label className="form-label">Supplies</Form.Label>
        <Form.Select
          aria-label="supplies"
          name="supplies"
          onChange={handleChange}
          className="form-select"
          value={formInput.supplies}
          required
        >
          <option value="">Select Supplies</option>
          {supplies.map((supply) => (
            <option key={supply.id} value={supply.id}>
              {supply.name}
            </option>
          ))}
        </Form.Select>
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
              sale: e.target.checked,
            }));
          }}
        />
        <Button variant="primary" type="submit" className="form-submit-button">
          Submit
        </Button>
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
    supplies: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
    })),
  }),
};

IdeaForm.defaultProps = {
  obj: initialState,
};

export default IdeaForm;
