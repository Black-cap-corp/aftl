import React, { useState } from "react";
import styles from "./Project.module.css";
import Card from "./Card";
import { useDispatch, useSelector } from "react-redux";
import {
  setSelectionAsyncProject,
  addandUpdateAsync,
  updateAsyncProject,
  deleteAsyncProject,
} from "../../../redux/projectSlice";
import { PlusCircle } from "react-bootstrap-icons";
import ModalPopup from "../../shared/ModalPopup";
import ProjectForm from "./ProjectForm";
import ConfirmPopup from "../../shared/ConfirmPopup";

const Project = ({ data, type }) => {
  const [show, setShow] = useState(false); //show popup for new item
  const [isEdit, setIsedit] = useState(false);
  const [formdata, setFormdata] = useState({});
  const [showDelModel, setShowDelModel] = useState(false);
  const [delItem, setDelItem] = useState(null);

  const dispatch = useDispatch();
  const selectFn = (state) => state.projects.selected;
  const selected = useSelector(selectFn);
  const selectedId = selected[selectedID[type]];

  const showModel = () => {
    setShow(true);
    setIsedit(false);
    setFormdata({});
  };
  const handleClose = () => {
    setShow(false);
    setShowDelModel(false);
  };

  const onSubmithandler = (values) => {
    if (isEdit) {
      dispatch(
        updateAsyncProject({
          operationType: type,
          operationEl: { ...values, id: formdata.id },
          selected: selected,
        })
      );
    } else {
      dispatch(
        addandUpdateAsync({
          operationType: type,
          operationEl: values,
          selected: selected,
        })
      );
    }

    setShow(false);
  };

  const onDeleteHandler = (currentEl) => {
    setDelItem(currentEl);
    setShowDelModel(true);
  };

  const onConfirmDeletHandler = () => {
    if (delItem) {
      dispatch(
        deleteAsyncProject({
          operationType: type,
          operationEl: delItem,
          selected: selected,
        })
      );
    }

    setShowDelModel(false);
    setDelItem(null);
  };

  const onSelected = (currentEl) => {
    if (type === "divisions" || type === "projects") {
      dispatch(
        setSelectionAsyncProject({
          operationType: type,
          operationEl: currentEl,
        })
      );
    }
  };

  const onEdithandler = (currentEl) => {
    setFormdata(currentEl);
    setIsedit(true);
    setShow(true);
  };
  return (
    <div className={styles["project-cont"]}>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-end",
          paddingBottom: "24px",
          gap: 10,
        }}
      >
        <h6 style={{ marginBottom: 0 }}>{type}</h6>

        <PlusCircle onClick={showModel} style={{ cursor: "pointer" }} />
      </div>
      <div>
        {data &&
          data?.map((ele) => (
            <Card
              key={ele.id}
              content={ele}
              child={childTypes[type]}
              isSingleChild={data?.length < 2}
              selectedId={selectedId}
              onSelected={() => onSelected(ele)}
              colorClass={colorType[type]}
              onEdit={(e) => onEdithandler(ele)}
              onDelete={(e) => onDeleteHandler(ele)}
            />
          ))}
      </div>
      <ModalPopup
        body={
          <ProjectForm
            isEdit={isEdit}
            formdata={formdata}
            handleSubmit={onSubmithandler}
          />
        }
        handleHide={handleClose}
        header="Test Header"
        show={show}
        size="md"
      />
      <ConfirmPopup
        body="Are you sure , you want to delete"
        handleHide={handleClose}
        header="Delete"
        onConfirm={onConfirmDeletHandler}
        show={showDelModel}
      />
    </div>
  );
};

export default Project;

export const childTypes = {
  projects: "divisions",
  divisions: "subdivisions",
};

export const selectedID = {
  projects: "projectId",
  divisions: "divisionId",
};

const colorType = {
  projects: "color-green",
  divisions: "color-red",
  subdivisions: "color-teel",
};
