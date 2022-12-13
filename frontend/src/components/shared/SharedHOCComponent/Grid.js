import React, { useRef, useCallback, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import CustomButton from "../CustomButton";

const Grid = ({ rowData, columnDefs, showDownload = false }) => {
  const gridRef = useRef();

  useEffect(() => {
    if (gridRef) {
      gridRef?.current?.api?.sizeColumnsToFit({
        defaultMinWidth: 100,
      });
    }
  }, [rowData]);

  const onBtnExport = useCallback(() => {
    gridRef.current.api.exportDataAsCsv({
      processCellCallback: (params) => {
        const { value, column } = params;

        if (typeof value == "object") {
          return value?.name;
        }
        return value;
      },
    });
  }, []);

  return (
    <div
      className="ag-theme-alpine"
      style={{
        display: "flex",
        height: 450,
        width: "100%",
        flexDirection: "column",
        gap: 12,
      }}
    >
      {showDownload && (
        <CustomButton
          style={{ alignSelf: "flex-end" }}
          label="Download"
          customClass="primary"
          onClick={(e) => {
            e.preventDefault();
            onBtnExport();
          }}
        />
      )}
      <AgGridReact
        ref={gridRef}
        rowData={rowData}
        columnDefs={columnDefs}
        pagination={true}
        paginationPageSize={10}
        suppressPaginationPanel={false}
        suppressColumnVirtualisation={true}
        defaultColDef={{
          cellStyle: () => ({
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
          }),
        }}
      ></AgGridReact>
    </div>
  );
};

export default Grid;
