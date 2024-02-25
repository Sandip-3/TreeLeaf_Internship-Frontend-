import React, { createContext, useContext, useState } from "react";

const RecordsContext = createContext();

export const useRecordsContext = () => {
  return useContext(RecordsContext);
};

export const RecordsProvider = ({ children }) => {
  const [records, setRecords] = useState([]);

  const addRecord = (record) => {
    setRecords([...records, record]);
  };

  const deleteRecord = (index) => {
    const updatedRecords = [...records];
    updatedRecords.splice(index, 1);
    setRecords(updatedRecords);
  };

  const editRecord = (index, updatedRecord) => {
    const updatedRecords = [...records];
    updatedRecords[index] = updatedRecord;
    setRecords(updatedRecords);
  };

  return (
    <RecordsContext.Provider
      value={{ records, addRecord, deleteRecord, editRecord }}
    >
      {children}
    </RecordsContext.Provider>
  );
};
