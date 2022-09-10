import React, { useEffect, useRef, useState } from "react";
import SharedHOCComponent from "../../shared/SharedHOCComponent/SharedHOCComponent";
import { useDispatch, useSelector } from "react-redux";
import { getAsyncFirms, addAsyncFirm } from "../../../redux/firmSlice";
import { colDefs } from "./Contractor.const";
import ContractorForm from "./ContractorForm";

const Contractor = () => {
  const dispatch = useDispatch();

  const childRef = useRef();
  useEffect(() => {
    dispatch(getAsyncFirms());
  }, []);

  const handleSubmitForAdd = (values) => {
    dispatch(addAsyncFirm(values));
    childRef.current.closeModal();
  };

  const firms = useSelector((state) => state.firms);

  useEffect(() => {
    setConfig((config) => {
      return { ...config, rowData: firms };
    });
  }, [firms]);

  const [config, setConfig] = useState(() => {
    return {
      rowData: firms || [],
      colDefs: colDefs,
      name: "Firms",
      form: <ContractorForm handleSubmit={handleSubmitForAdd} />,
      filterName: "firm",
    };
  });
  return <SharedHOCComponent config={config} ref={childRef} />;
};

export default Contractor;
