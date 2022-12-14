import { Link } from "react-router-dom";
export const colDefs = [
  {
    field: "indentNo",
    headerName: "Indent Name",
    cellStyle: (params) => {
      const data = params.data;
      const css = {
        borderLeftWidth: 3,
      };
      if (data.approved) {
        return { ...css, borderLeftColor: "green" };
      } else {
        return { ...css, borderLeftColor: "red" };
      }
    },

    cellRenderer: function (params) {
      const link = `/home/issue-details/${params.data._id}`;
      return (
        <Link style={{ color: "#000" }} to={link}>
          {params.value}
        </Link>
      );
    },
  },
  { field: "location", headerName: "Location" },
  { field: "vehicle", headerName: "Vehicle" },
  { field: "status", headerName: "Status" },
  { field: "approved", headerName: "Approved" },
];
export const OPERATOR_ENUM = {
  APPROVE: "APPROVE",
  REJECT: "REJECT",
};

export const INDENT_ENUM = {
  ISSUE: "ISSUE",
  RETURN: "RETURN",
};
