import React from "react";
import { Link } from "react-router-dom";

function Page404() {
  return (
    <div className="not_found_container">
      <h1 className="not_found_container_header">404 not found page</h1>
      <img
        className="not_found_container_photo"
        src="/world_cup.svg"
        alt="world_cup_photo"
      />
      <Link className="not_found_container_anchor" to="/">
        Go to home page
      </Link>
    </div>
  );
}

export default Page404;
