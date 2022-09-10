import React from "react";
import Modal from "react-bootstrap/Modal";

const ModalPopup = ({ show, handleHide, header, body, size = "lg" }) => {
  return (
    <Modal
      show={show}
      onHide={handleHide}
      size={size}
      centered
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>{header}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{body}</Modal.Body>
    </Modal>
  );
};

export default ModalPopup;
