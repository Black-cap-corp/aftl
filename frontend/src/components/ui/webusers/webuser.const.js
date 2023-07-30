import EditButtonRender from "./EditButtonRender";

export const colDefs = [
  {
    field: "",
    headerName: "Actions",
    with: 100,
    maxWidth: 100,
    cellRenderer: EditButtonRender,
  },
  {
    field: "name",
    headerName: "User Name",
    filter: "agTextColumnFilter",
  },
  {
    field: "password",
    headerName: "Password",
    filter: "agTextColumnFilter",
  },
  {
    field: "type",
    headerName: "User Type",
    filter: "agTextColumnFilter",
  },
  {
    field: "entitlement",
    headerName: "User Entitlement",
    filter: "agTextColumnFilter",
  },
];

export const webuserTypeOptions = [
  {
    value: "operator",
    display: "Operator",
  },
  {
    value: "admin",
    display: "Admin",
  },
  {
    value: "approver",
    display: "Indent Approver",
  },
];

export const webuserEntitlementOptions = [
  {
    value: "read",
    display: "Read",
  },
  {
    value: "write",
    display: "Write",
  },
];
