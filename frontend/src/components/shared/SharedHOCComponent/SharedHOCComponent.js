import React, { useEffect, useImperativeHandle, useState } from "react";
import Grid from "./Grid";
import Search from "./Search";
import ModalPopup from "../ModalPopup";

const SharedHOCComponent = React.forwardRef(({ config }, ref) => {
  const [filtereddata, setFiltereddata] = useState(config.rowData);
  useEffect(() => {
    setFiltereddata(config.rowData || []);
  }, [config.rowData]);

  const filterData = (values) => {
    if (config.rowData) {
      setFiltereddata((state) => {
        return config.rowData?.filter((data) =>
          data[config.filterName].includes(values.search)
        );
      });
    }
  };
  useImperativeHandle(ref, () => {
    return {
      closeModal: () => {
        handleClose();
      },
    };
  });

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const showModel = () => setShow(true);

  return (
    <div style={{ textAlign: "center", minWidth: "100%" }}>
      <h3>{config.name}</h3>
      <Search setShow={showModel} searchFn={filterData} />
      <Grid columnDefs={config.colDefs} rowData={filtereddata} />

      <ModalPopup
        body={config.form}
        handleHide={handleClose}
        header="Add"
        show={show}
      />
    </div>
  );
});

export default SharedHOCComponent;
