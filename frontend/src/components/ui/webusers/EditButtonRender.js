import React, { useState } from "react";
import ModalPopup from "../../shared/ModalPopup";
import { useDispatch } from "react-redux";
import Dropdown from "react-bootstrap/Dropdown";
import { ThreeDotsVertical } from "react-bootstrap-icons";
import ConfirmPopup from "../../shared/ConfirmPopup";
import { deleteAsyncUser, updateAsyncUser } from "../../../redux/webuserSlice";
import WebuserForm from "./WebuserForm";

const EditButtonRender = (props) => {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const clickHandler = () => setShow(true);
  const deleteClickHandler = () => setShowConfirm(true);
  const handleCloseConfirm = () => setShowConfirm(false);

  const handleClose = () => setShow(false);
  const handleSubmitForEdit = (values) => {
    dispatch(updateAsyncUser(values));
  };
  const handleSubmitForDelete = () => {
    dispatch(deleteAsyncUser(props.data.id));
  };
  return (
    <div>
      <Dropdown>
        <Dropdown.Toggle
          id="dropdown-basic"
          as={CustomToggle}
        ></Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item onClick={clickHandler}>Edit</Dropdown.Item>
          <Dropdown.Item onClick={deleteClickHandler}>Delete</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>

      <ConfirmPopup
        body="Are you sure , you want to delete"
        handleHide={handleCloseConfirm}
        header="Delete"
        onConfirm={handleSubmitForDelete}
        show={showConfirm}
      />

      <ModalPopup
        body={
          <WebuserForm
            handleSubmit={handleSubmitForEdit}
            formData={props.data}
            isEdit={true}
          />
        }
        handleHide={handleClose}
        header="Edit User"
        show={show}
      />
    </div>
  );
};

const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
  <a
    href=""
    ref={ref}
    onClick={(e) => {
      e.preventDefault();
      onClick(e);
    }}
    style={{
      color: "#000",
    }}
  >
    <ThreeDotsVertical />
  </a>
));

export default EditButtonRender;
