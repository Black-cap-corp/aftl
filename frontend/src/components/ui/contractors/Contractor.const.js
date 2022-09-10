import EditBtnRender from "./EditBtnRenderer";

export const colDefs = [
  {
    field: "",
    headerName: "Actions",
    with: 100,
    maxWidth: 100,
    cellRenderer: EditBtnRender,
  },
  { field: "firm", headerName: "Firm Name" },
  { field: "contractor", headerName: "Contractor Name" },
];
