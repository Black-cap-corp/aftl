import React, { useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import { ThreeDotsVertical } from "react-bootstrap-icons";
import ModalPopup from "../../shared/ModalPopup";
import CreateWorkorderForm from "./CreateWorkorderForm";
import { updateAsyncWorkorder } from "../../../redux/workorderSlice";
import { useDispatch } from "react-redux";
import ConfirmPopup from "../../shared/ConfirmPopup";
import { deleteAsyncWorkorder } from "../../../redux/workorderSlice";

const EditButtonRender = (props) => {
  const [show, setShow] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const handleClose = () => setShow(false);
  const editclickHandler = () => setShow(true);
  const dispatch = useDispatch();

  const deleteClickHandler = () => setShowConfirm(true);
  const handleCloseConfirm = () => setShowConfirm(false);

  const onEdit = (workorder) => {
    dispatch(updateAsyncWorkorder({ ...workorder, id: props.data.id }));
    setShow(false);
  };

  const handleSubmitForDelete = () => {
    dispatch(deleteAsyncWorkorder(props.data.id));
  };

  return (
    <div>
      <Dropdown>
        <Dropdown.Toggle
          id="dropdown-basic"
          as={CustomToggle}
        ></Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item onClick={editclickHandler}>Edit</Dropdown.Item>
          <Dropdown.Item onClick={deleteClickHandler}>Delete</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>

      <ModalPopup
        body={
          <CreateWorkorderForm
            onSubmit={onEdit}
            isEdit={true}
            formData={props.data}
          />
        }
        handleHide={handleClose}
        header="Edit Work order"
        show={show}
        size="lg"
      />

      <ConfirmPopup
        body="Are you sure , you want to delete the workorder, all the indents related to workorder will be deleted"
        handleHide={handleCloseConfirm}
        header="Delete Workorder"
        onConfirm={handleSubmitForDelete}
        show={showConfirm}
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
