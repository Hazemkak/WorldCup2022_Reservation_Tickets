import React from "react";
import "./styles/Loader.css";
function Loader() {
  return (
    <div className="loader_container">
      <img className="loader_spin" src="worldlogo.png" alt="loader_logo" />
      <img className="loader_title" src="worldwords.png" alt="loader_logo" />
    </div>
  );
}

export default Loader;
