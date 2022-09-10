import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { colDefs } from "./Stocks.const";
import { getAsyncStocks, addAsyncStock } from "../../../redux/stockSlice";
import { useDispatch } from "react-redux";
import SharedHOCComponent from "../../shared/SharedHOCComponent/SharedHOCComponent";
import StocksForm from "./StocksForm";

const Stocks = () => {
  const dispatch = useDispatch();

  const childRef = useRef();
  useEffect(() => {
    dispatch(getAsyncStocks());
  }, []);

  const handleSubmitForAdd = (values) => {
    dispatch(addAsyncStock(values));
    childRef.current.closeModal();
  };

  const stocks = useSelector((state) => state.stocks);

  useEffect(() => {
    setConfig((config) => {
      return { ...config, rowData: stocks };
    });
  }, [stocks]);

  const [config, setConfig] = useState(() => {
    return {
      rowData: stocks,
      colDefs: colDefs,
      name: "Stocks",
      form: <StocksForm handleSubmit={handleSubmitForAdd} />,
      filterName: "name",
    };
  });

  return <SharedHOCComponent config={config} ref={childRef} />;
};

export default Stocks;
