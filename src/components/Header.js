import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { auth } from "./../firebase";
import { UserContext, HeaderState } from "./UserContext.js";
import { signOut } from "firebase/auth";


function Header(){

  const {userName, setUserName} = useContext(UserContext);
  const { setFormVisibleOnPage, setSelectedPost, setEditing, setCommentFormVisible } = useContext(HeaderState)

  function logoClick() {
      setFormVisibleOnPage(false);
      setSelectedPost(null);
      setEditing(false);
      setCommentFormVisible(false);
    }

    function doSignOut() {
      signOut(auth)
        .then(function() {
         
        }).catch(function(error) {
         console.log(error);
        });
    }
  
  if (auth.currentUser === null) {
    return (
      <React.Fragment>
      <nav className="navbar navbar-background bg-dark">
        <div className="container-fluid">
          <span onClick={() => logoClick()} className="navbar-brand mb-0 h1 navHeader"><Link to="/">reddit clone</Link></span>
          <div>
            <span className=""><Link to="/login"><button className="btn logBtn">Log In</button></Link></span>
            <span className="mx-3"><Link to="/signup"><button className="btn regBtn">Register</button></Link></span>
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
                    <li onClick={doSignOut} className="dropdown-item"><Link to='/'>Log-out</Link></li>
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