import React, { useState } from "react";
import IssueStocksForm from "./IssueStocksForm";
import IssueSearch from "./IssueSearch";

const IssueEditForm = ({
  stocks,
  submitHandler,
  user,
  statusCode,
  editable,
}) => {
  const [filteredStocks, setFilteredStocks] = useState(stocks);
  const onSearch = (key) => {
    if (key === "") {
      setFilteredStocks(stocks);
    } else {
      const fil = stocks.filter((stock) =>
        stock.name.toLowerCase().includes(key.toLowerCase())
      );
      setFilteredStocks(fil);
    }
  };
  return (
    <div>
      <div>
        <IssueSearch onChange={onSearch} />
      </div>
      <div>
        <IssueStocksForm
          stocks={filteredStocks}
          onSubmitHandler={submitHandler}
          user={user}
          statusCode={statusCode}
          editable={editable}
        />
      </div>
    </div>
  );
};

export default IssueEditForm;
