import React from "react";
import { Link } from "react-router-dom";

function Header(){
  return (
    <React.Fragment>
      <Link to="/account">
        <button className="controllerBtn">Account</button>
      </Link>
    </React.Fragment>
  );
}

export default Header;