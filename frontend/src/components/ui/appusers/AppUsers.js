import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAsyncAppusers, addAsyncAppuser } from "../../../redux/appUserSlice";
import AppuserForm from "./AppuserForm";
import { colDefs } from "./appuser.const";
import SharedHOCComponent from "../../shared/SharedHOCComponent/SharedHOCComponent";

const AppUsers = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAsyncAppusers());
  }, []);

  const handleSubmitForAdd = (values) => {
    dispatch(addAsyncAppuser(values));
    childRef.current.closeModal();
  };

  const appusers = useSelector((state) => state.appusers);

  useEffect(() => {
    setConfig((config) => {
      return { ...config, rowData: appusers };
    });
  }, [appusers]);

  const [config, setConfig] = useState(() => {
    return {
      rowData: appusers,
      colDefs: colDefs,
      name: "Web users",
      form: <AppuserForm handleSubmit={handleSubmitForAdd} />,
      filterName: "name",
    };
  });

  const childRef = useRef();
  return <SharedHOCComponent config={config} ref={childRef} />;
};

export default AppUsers;
