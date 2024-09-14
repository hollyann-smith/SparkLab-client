/* eslint-disable jsx-a11y/control-has-associated-label */
import { useState } from 'react';
import { Form, Modal } from 'react-bootstrap';
import { updateUser } from '../utils/data/userData';
import { useAuth } from '../utils/context/authContext';

export default function UsernameModal() {
  const [show, setShow] = useState(false);
  const { user } = useAuth();
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [formInput, setFormInput] = useState({ username: user?.username || '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    const payload = {
      ...formInput,
      user: user.id,
    };

    updateUser(user.id, payload).then(() => {
      handleClose();
      window.location.reload();
    }).catch((error) => {
      console.error('Error updating user:', error);
    });
  };

  return (
    <>
      <button type="button" className="btttnn" onClick={handleShow}>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="icon" viewBox="0 0 16 16">
          <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.5.5 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11z" />
        </svg>
      </button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Change Username</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Label className="form-label">Change Username?</Form.Label>
          <Form.Control
            name="username"
            required
            value={formInput.username}
            onChange={handleChange}
            className="form-input"
          />
          <button type="button" className="supply-button" onClick={handleSave}>
            Save changes
          </button>
        </Modal.Body>
      </Modal>
    </>
  );
}
