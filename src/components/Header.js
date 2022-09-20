import React from "react";
import { Link } from "react-router-dom";

function Header(){
  return (
    <React.Fragment>
      <h1>Reddit Clone</h1>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/account">Account</Link>
        </li>
      </ul>
    </React.Fragment>
  );
}

export default Header;