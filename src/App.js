import Navbar from "./components/Navbar.jsx";
import Card from "./components/card.jsx";
import "./components/App.css";
import { useState, useEffect, useContext } from "react";
import SearchContext from "./store/searchContext.js";
import { SearchProvider } from "./store/searchContext.js";
import App1 from "./App1.jsx";
function App() {
  return (
    <SearchProvider>
      <App1 />
    </SearchProvider>
  );
}

export default App;
