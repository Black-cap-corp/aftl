import React, { useState , useContext} from "react";
import Dropdown from "react-bootstrap/Dropdown";
import { ThreeDotsVertical } from "react-bootstrap-icons";
import ModalPopup from "../../shared/ModalPopup";
import CreateWorkorderForm from "./CreateWorkorderForm";
import { updateAsyncWorkorder } from "../../../redux/workorderSlice";
import { useDispatch } from "react-redux";
import ConfirmPopup from "../../shared/ConfirmPopup";
import { deleteAsyncWorkorder } from "../../../redux/workorderSlice";
import DowloadReportForm from "./DowloadReportForm";
import { UserContext } from "../../../App";


const EditButtonRender = (props) => {
  const [show, setShow] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [showReportCenter, setShowReportCenter] = useState(false);
  const handleClose = () => setShow(false);
  const editclickHandler = () => setShow(true);
  const dispatch = useDispatch();
  const user = useContext(UserContext);


  const deleteClickHandler = () => setShowConfirm(true);
  const handleCloseConfirm = () => setShowConfirm(false);
  const reportDownloadHandler = () => setShowReportCenter(true);
  const handleReportclose = () => setShowReportCenter(false);

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
          { user.entitlement.includes("webAdminRead") ||  <Dropdown.Item onClick={editclickHandler}>Edit</Dropdown.Item>}
          { user.entitlement.includes("webAdminRead") ||  <Dropdown.Item onClick={deleteClickHandler}>Delete</Dropdown.Item>}

          <Dropdown.Item onClick={reportDownloadHandler}>
            Download Report
          </Dropdown.Item>
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

      <ModalPopup
        body={
          <DowloadReportForm
            workorder={props.data}
            setClose={handleReportclose}
          />
        }
        handleHide={handleReportclose}
        header="Download Report"
        show={showReportCenter}
        size="md"
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
