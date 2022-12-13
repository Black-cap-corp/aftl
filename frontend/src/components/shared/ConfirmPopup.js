import Button from "react-bootstrap/Button";
import React from "react";
import Modal from "react-bootstrap/Modal";

const ConfirmPopup = ({
  show,
  handleHide,
  header,
  body,
  onConfirm,
  primaryBtnText = "Delete",
  btnVariant = "primary",
}) => {
  return (
    <Modal
      show={show}
      onHide={handleHide}
      centered
      keyboard={false}
      backdrop="static"
    >
      <Modal.Header closeButton>
        <Modal.Title>{header}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{body}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleHide}>
          Close
        </Button>
        <Button variant={btnVariant} onClick={onConfirm}>
          {primaryBtnText}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ConfirmPopup;
