import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import Feedback from 'react-bootstrap/esm/Feedback';
import axios from 'axios';

import routes from '../routes.js';
import useChannels from '../hooks/useChannels.js';

const RemoveModal = (props) => {
  const { show, onClose, removeId } = props;
  const [{ currentChannelId, defaultChannelId }, { setCurrentChannelId }] = useChannels();
  const [removeSubmitting, setRemoveSubmitting] = useState(false);
  const [removeError, setRemoveError] = useState('');

  const handleClose = () => {
    setRemoveError('');
    onClose();
  };

  const handleRemove = async () => {
    const params = {
      id: removeId,
    };
    setRemoveSubmitting(true);
    try {
      await axios.delete(routes.channelPath(removeId), { params });
      handleClose();
      if (removeId === currentChannelId) {
        setCurrentChannelId(defaultChannelId);
      }
    } catch (e) {
      setRemoveError(e.message);
    }
    setRemoveSubmitting(false);
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Remove channel</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Are you sure?
        <div className="d-flex justify-content-between">
          <Button className="mr-2" variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleRemove} disabled={removeSubmitting}>
            Confirm
          </Button>
        </div>
        <Feedback className="d-block mb-2" type="invalid">{removeError}</Feedback>
      </Modal.Body>
    </Modal>
  );
};

export default RemoveModal;
