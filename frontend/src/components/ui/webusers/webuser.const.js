import EditButtonRender from "./EditButtonRender";

export const colDefs = [
  {
    field: "",
    headerName: "Actions",
    with: 100,
    maxWidth: 100,
    cellRenderer: EditButtonRender,
  },
  { field: "name", headerName: "User Name" },
  { field: "password", headerName: "Password" },
  { field: "type", headerName: "User Type" },
  { field: "entitlement", headerName: "User Entitlement" },
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
