import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "./UserContext.js";

function Header(){

  const {isLogged, setIsLogged, userName, setUserName} = useContext(UserContext);

  if (isLogged === false) {
    return (
      <React.Fragment>
      <nav className="navbar bg-dark">
        <div className="container-fluid">
          <span className="navbar-brand mb-0 h1"><Link to="/">Reddit Clone</Link></span>
          <div>
            <span className=""><Link to="/account"><button className="btn btn-outline-primary">Login</button></Link></span>
            <span className="mx-3"><Link to="/account"><button className="btn btn-outline-primary">Register</button></Link></span>
          </div>
        </div>
      </nav>
    </React.Fragment>
    )
  } else if (isLogged === true) {
    return (
      <React.Fragment>
        <nav className="navbar navbar-expand-lg bg-dark">
          <div className="container-fluid">
          <span className="navbar-brand mb-0 h1"><Link to="/">Reddit Clone</Link></span>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            </div>
            <div className="collapse navbar-collapse" id="navbarNavDropdown">
              <ul className="navbar-nav">
                <li className="nav-item dropdown">
                  <a className="nav-link dropdown-toggle mx-3" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    {userName}
                  </a>
                  <ul className="dropdown-menu">
                    <li className="dropdown-item"><Link to="/">Profile</Link></li>
                    <li className="dropdown-item"><Link to="/login">Login</Link></li>
                    <li><a className="dropdown-item" href="">Log-out</a></li>
                  </ul>
                </li>
              </ul>
            </div>
        </nav>
    </React.Fragment>
    )
  }
}

export default Header;