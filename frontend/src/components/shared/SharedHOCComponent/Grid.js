import React from "react";
import { AgGridReact } from "ag-grid-react";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

const Grid = ({ rowData, columnDefs }) => {
  return (
    <div className="ag-theme-alpine" style={{ height: 400, width: "100%" }}>
      <AgGridReact
        rowData={rowData}
        columnDefs={columnDefs}
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
