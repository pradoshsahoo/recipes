import React from "react";
import "./Navbar.css";
function Navbar() {
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
    </div>
  );
}
export default Navbar;
