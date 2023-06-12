import React from "react";
import { useState, createContext } from "react";
const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
  const [str, setStr] = useState("");
  const updateSearch = (value) => {
    setStr(value);
  };
  return (
    <SearchContext.Provider value={{ str, setStr }}>
      {children}
    </SearchContext.Provider>
  );
};

export default SearchContext;
