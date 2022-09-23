import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { auth } from "./../firebase";
import { UserContext, HeaderState } from "./UserContext.js";



function Header(){

  const {userName, setUserName} = useContext(UserContext);
  const { setFormVisibleOnPage, setSelectedPost, setEditing, setCommentFormVisible } = useContext(HeaderState)
 
  const grabObject = window.sessionStorage.getItem(sessionStorage.key(auth.currentUser));
  const parseObject = JSON.parse(grabObject);
  setUserName(parseObject.email);

  function logoClick() {
      setFormVisibleOnPage(false);
      setSelectedPost(null);
      setEditing(false);
      setCommentFormVisible(false);
    }
  
  if (auth.currentUser === null) {
    return (
      <React.Fragment>
      <nav className="navbar navbar-background bg-dark">
        <div className="container-fluid">
          <span onClick={() => logoClick()} className="navbar-brand mb-0 h1 navHeader"><Link to="/">reddit clone</Link></span>
          <div>
            <span className=""><Link to="/account"><button className="btn logBtn">Log In</button></Link></span>
            <span className="mx-3"><Link to="/account"><button className="btn regBtn">Register</button></Link></span>
          </div>
        </div>
      </nav>
    </React.Fragment>
    )
  } else if (auth.currentUser != null) {
    return (
      <React.Fragment>
        <nav className="navbar navbar-expand-lg bg-dark">
          <div className="container-fluid">
          <span onClick={() => logoClick()} className="navbar-brand mb-0 h1 navHeader"><Link to="/">reddit clone</Link></span>
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
                    <li className="dropdown-item"><Link to="/login">Log In</Link></li>
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