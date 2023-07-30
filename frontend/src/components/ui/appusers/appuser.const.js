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
    filter: 'agTextColumnFilter'

   },
  { 
    field: "password", 
    headerName: "Password" ,
    filter: 'agTextColumnFilter'

  },
  { 
    field: "mobile", 
    headerName: "Mobile" ,
    filter: 'agTextColumnFilter'

  },
];
