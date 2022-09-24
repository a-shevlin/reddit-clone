import React, { useState, useContext, useCallback } from "react";
import { auth } from "../firebase";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, signOut } from "firebase/auth";
import { getAuth, setPersistence, signInWithEmailAndPassword, browserSessionPersistence } from "firebase/auth";
import Header from "./Header";


function Account() {
  const [signOutSuccess, setSignOutSuccess] = useState(null);


  const navigate =useNavigate();
  const toLogin = useCallback(() => navigate('/login', {replace:true}, [navigate]))
  const toSignUp = useCallback(() => navigate('/signup', {replace:true}, [navigate]))


  function doSignOut() {
    signOut(auth)
      .then(function() {
        setSignOutSuccess("You have successfully signed out!");
      }).catch(function(error) {
        setSignOutSuccess(`There was an error signing out: ${error.message}!`);
      });
  }

  return (
    <React.Fragment>
      <Header />
    {auth.currentUser ? (
      <div className="container">
        <h1 className="mb-3 mr-3">Sign Out</h1>
        {signOutSuccess}
        <br />
        <button className="mb-3 mr-3" onClick={doSignOut}>Sign out</button>
      </div>
    ) : (
      <div className="container">
        <h1>Do you have an account?</h1>
        <button className="mb-3 mr-3" onClick={toLogin}>Login</button>
        <button className="mb-3 mx-3" onClick={toSignUp}>Sign Up</button>
      </div>
    )}
    <div className="container">
      <Link to="/">
        <button className="controllerBtn">Back To Home</button>
      </Link>
    </div>
    </React.Fragment>
  );
};

export default Account;