import React, { useRef, useState, useEffect } from "react";
import SharedHOCComponent from "../../shared/SharedHOCComponent/SharedHOCComponent";
import { useDispatch, useSelector } from "react-redux";
import { addAsyncUser, getAsyncUsers } from "../../../redux/webuserSlice";
import { colDefs } from "./webuser.const";
import WebuserForm from "./WebuserForm";

const WebUsers = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAsyncUsers());
  }, []);

  const handleSubmitForAdd = (values) => {
    dispatch(addAsyncUser(values));
    childRef.current.closeModal();
  };

  const webusers = useSelector((state) => state.webusers);

  useEffect(() => {
    setConfig((config) => {
      return { ...config, rowData: webusers };
    });
  }, [webusers]);

  const [config, setConfig] = useState(() => {
    return {
      rowData: webusers,
      colDefs: colDefs,
      name: "Web users",
      form: <WebuserForm handleSubmit={handleSubmitForAdd} />,
      filterName: "name",
    };
  });

  const childRef = useRef();
  return <SharedHOCComponent config={config} ref={childRef} />;
};

export default WebUsers;
