import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SearchForm from "./SearchForm";
import { getAsyncProject } from "../../../redux/projectSlice";
import ModalPopup from "../../shared/ModalPopup";
import CreateWorkorderForm from "./CreateWorkorderForm";
import { addAsyncWorkorder } from "../../../redux/workorderSlice";
import { colDefs } from "./workorder.const";
import Grid from "../../shared/SharedHOCComponent/Grid";

const WorkOrder = () => {
  const [show, setShow] = useState(false);

  const showModel = () => setShow(true);
  const hideModel = () => setShow(false);

  const dispatch = useDispatch();
  const workorders = useSelector((state) => state.workorders);
  console.log(workorders);
  const projects = useSelector((state) => state.projects.allProjects);
  const onWorkorderCreation = (workorder) => {
    dispatch(addAsyncWorkorder(workorder));
    setShow(false);
  };

  useEffect(() => {
    if (projects.length < 1) {
      dispatch(getAsyncProject());
    }
  }, []);

  return (
    <div style={{ width: "100%", textAlign: "center" }}>
      <h2>Work orders</h2>
      <SearchForm data={projects} showModel={showModel} />

      <Grid columnDefs={colDefs} rowData={workorders} />

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
