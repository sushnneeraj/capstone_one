import React, { createContext, useContext, useState } from 'react';

// Create context
const FormContext = createContext();

// Create a custom hook to access the context
export const useFormContext = () => {
  return useContext(FormContext);
};

// FormContext Provider
export const FormProvider = ({ children }) => {
  const [searchResults, setSearchResults] = useState([]);
  const [transactionData, setTransactionData] = useState([]);

  // Function to add search results to context
  const addSearchResult = (data) => {
    setSearchResults((prevResults) => [...prevResults, data]);
  };

  // Function to add transaction data (including quantity, purchasePrice, and currentPrice)
  const addTransactionData = (data) => {
    setTransactionData((prevTransactions) => [...prevTransactions, data]);
  };

  return (
    <FormContext.Provider value={{ searchResults, transactionData, addSearchResult, addTransactionData }}>
      {children}
    </FormContext.Provider>
  );
};
