import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import { createIdea, getSupplies, updateIdea } from '../../utils/data/ideaData';
import SupplyInput from '../SupplyInput';

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
      console.warn('updatepayload', payload);
    } else {
      createIdea(payload).then(() => router.push('/ideas'));
    }
  };

  return (
    <>

      <Form onSubmit={handleSubmit} className="form-container">
        <Form.Group className="form-container-left">
          <h1 className="form-title">{obj.id ? 'Update Idea' : 'Create Idea'}</h1>
          <br />
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
          <div className="con-like">
            <input
              className="like"
              type="checkbox"
              title="like"
              id="saved"
              checked={formInput.saved}
              onChange={(e) => {
                setFormInput((prevState) => ({
                  ...prevState,
                  saved: e.target.checked,
                }));
              }}
            />
            <div className="checkmark">
              <svg xmlns="http://www.w3.org/2000/svg" className="outline" viewBox="0 0 24 24">
                <path d="M17.5,1.917a6.4,6.4,0,0,0-5.5,3.3,6.4,6.4,0,0,0-5.5-3.3A6.8,6.8,0,0,0,0,8.967c0,4.547,4.786,9.513,8.8,12.88a4.974,4.974,0,0,0,6.4,0C19.214,18.48,24,13.514,24,8.967A6.8,6.8,0,0,0,17.5,1.917Zm-3.585,18.4a2.973,2.973,0,0,1-3.83,0C4.947,16.006,2,11.87,2,8.967a4.8,4.8,0,0,1,4.5-5.05A4.8,4.8,0,0,1,11,8.967a1,1,0,0,0,2,0,4.8,4.8,0,0,1,4.5-5.05A4.8,4.8,0,0,1,22,8.967C22,11.87,19.053,16.006,13.915,20.313Z" />
              </svg>
              <svg xmlns="http://www.w3.org/2000/svg" className="filled" viewBox="0 0 24 24">
                <path d="M17.5,1.917a6.4,6.4,0,0,0-5.5,3.3,6.4,6.4,0,0,0-5.5-3.3A6.8,6.8,0,0,0,0,8.967c0,4.547,4.786,9.513,8.8,12.88a4.974,4.974,0,0,0,6.4,0C19.214,18.48,24,13.514,24,8.967A6.8,6.8,0,0,0,17.5,1.917Z" />
              </svg>
              <svg xmlns="http://www.w3.org/2000/svg" height="100" width="100" className="celebrate">
                <polygon className="poly" points="10,10 20,20" />
                <polygon className="poly" points="10,50 20,50" />
                <polygon className="poly" points="20,80 30,70" />
                <polygon className="poly" points="90,10 80,20" />
                <polygon className="poly" points="90,50 80,50" />
                <polygon className="poly" points="80,80 70,70" />
              </svg>
            </div>
          </div>
        </Form.Group>
        <div className="form-container-right">
          <Form.Label className="form-label">Supplies</Form.Label>
          <SupplyInput
            supplies={supplies}
            selectedSupplies={formInput.supplies}
            onSelect={handleSuppliesChange}
          />
          <button type="submit" className="form-button">
            Submit
          </button>
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
