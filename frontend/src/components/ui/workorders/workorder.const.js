import EditButtonRender from "./EditButtonRender";

export const statusOptions = [
  {
    value: "closed",
    display: "Closed",
  },
  {
    value: "open",
    display: "Open",
  },
];

const getName = (params) => {
  return params?.value?.name;
};

const getContractors = (params) => {
  const contractors = params?.value?.reduce((agg, current) => {
    agg = agg + current.contractor + " , ";
    return agg;
  }, "");
  return contractors;
};

const StatusRender = (props) => {
  if (props?.value?.toLowerCase() === "open") {
    return (
      <>
        <span
          style={{
            width: 8,
            height: 8,
            borderRadius: "50%",
            backgroundColor: "green",
            marginRight: 10,
          }}
        ></span>
        <span>{props.value}</span>
      </>
    );
  } else
    return (
      <>
        <span
          style={{
            width: 8,
            height: 8,
            borderRadius: "50%",
            backgroundColor: "red",
            marginRight: 10,
          }}
        ></span>
        <span>{props.value}</span>
      </>
    );
};

export const colDefs = [
  {
    field: "",
    headerName: "Actions",
    cellRenderer: EditButtonRender,
    with: 100,
    maxWidth: 100,
    cellStyle: (params) => {
      if (params?.data?.status?.toLowerCase() === "open") {
        return { borderLeft: "3px solid green" };
      } else {
        return { borderLeft: "3px solid red" };
      }
    },
  },
  { field: "workorder", 
  headerName: "Workorder" , 
  filter: 'agTextColumnFilter'
},
  { 
    field: "displayName", 
    headerName: "Display Name" ,
    filter: 'agTextColumnFilter'
  },
  {
    field: "status",
    headerName: "Status",
    cellRenderer: StatusRender,
    filter: 'agTextColumnFilter'

  },
  {
    field: "project",
    headerName: "Project",
    cellRenderer: getName,
    filter: 'agTextColumnFilter'

  },
  { 
    field: "division",
     headerName: "Division", 
     cellRenderer: getName ,
     filter: 'agTextColumnFilter'

    },
  { 
    field: "subdivision", 
    headerName: "Subdivision", 
    cellRenderer: getName ,
    filter: 'agTextColumnFilter'

  },
  {
    field: "contractors",
    headerName: "Contractors",
    cellRenderer: getContractors,
    filter: 'agTextColumnFilter'

  },
];
