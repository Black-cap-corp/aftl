import React, { useEffect, useState, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import SearchForm from "./SearchForm";
import { getAsyncProject } from "../../../redux/projectSlice";
import ModalPopup from "../../shared/ModalPopup";
import CreateWorkorderForm from "./CreateWorkorderForm";
import { addAsyncWorkorder } from "../../../redux/workorderSlice";
import { colDefs } from "./workorder.const";
import Grid from "../../shared/SharedHOCComponent/Grid";
import { UserContext } from "../../../App";


const WorkOrder = () => {
  const [show, setShow] = useState(false);
  let workorderColdefs = [];


  const showModel = () => setShow(true);
  const hideModel = () => setShow(false);

  const dispatch = useDispatch();
  const workorders = useSelector((state) => state.workorders);
  const user = useContext(UserContext);
  const projects = useSelector((state) => state.projects.allProjects);
  const onWorkorderCreation = (workorder) => {
    dispatch(addAsyncWorkorder(workorder));
    setShow(false);
  };

  if(user.entitlement.includes('webAdminRead')){
    workorderColdefs = colDefs.filter((col) => col.field !== 'workorder');
  } else {
    workorderColdefs = colDefs;
  }

  

  useEffect(() => {
    if (projects.length < 1) {
      dispatch(getAsyncProject());
    }
  }, []);

  return (
    <div style={{ width: "100%", textAlign: "center" }}>
      <h2>Work orders</h2>
      <SearchForm data={projects} showModel={showModel} />

      <Grid columnDefs={workorderColdefs} rowData={workorders} showDownload={user.entitlement.includes("webAdminRead")?false: true} />

      <ModalPopup
        body={<CreateWorkorderForm onSubmit={onWorkorderCreation} />}
        handleHide={hideModel}
        header="Add Work order"
        show={show}
      />
    </div>
  );
};

export default WorkOrder;
