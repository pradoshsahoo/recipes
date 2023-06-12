import React from "react";
import "./Navbar.css";
import { useContext } from "react";
import SearchContext from "../store/searchContext";
function Navbar() {
  const { str, setStr } = useContext(SearchContext);
  const handleForm = () => {
    const input = (document.getElementById("input").style.display = "block");
  };
  return (
    <div class="nav">
      <a href="index.html">
        <div className="nav_ele">HOME</div>
      </a>
      <a href="index.html">
        <div className="nav_ele">FOOD</div>
      </a>
      <div className="nav_ele" onClick={handleForm}>
        ADD
      </div>

      <a href="login.html">
        <div className="nav_ele" id="login"></div>
      </a>
      <input
        type="text"
        placeholder="Search your favourite recipes"
        value={str}
        id="searchField"
        onChange={(e) => setStr(e.target.value)}
      />
    </div>
  );
}
export default Navbar;
