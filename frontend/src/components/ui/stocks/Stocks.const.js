import EditButtonRender from "./EditButtonRender";

export const stockUnitOptions = [
  {
    value: "No's",
    display: "No's",
  },
  {
    value: "Set's",
    display: "Set's",
  },
  {
    value: "Mtr's",
    display: "Mtr's",
  },
  {
    value: "Bag's",
    display: "Bag's",
  },
  {
    value: "Kg's",
    display: "Kg's",
  },
  {
    value: "Kg/No's",
    display: "Kg/No's",
  },
];

export const colDefs = [
  {
    field: "",
    headerName: "Actions",
    cellRenderer: EditButtonRender,
    with: 100,
    maxWidth: 100,
  },
  { field: "name", headerName: "Stock Name" },
  { field: "code", headerName: "Material Code" },
  { field: "unit", headerName: "Unit" },
];
