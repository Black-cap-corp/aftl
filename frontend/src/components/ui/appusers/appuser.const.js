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
  { field: "mobile", headerName: "Mobile" },
];
