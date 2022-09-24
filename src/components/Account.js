import React, { useState, useContext } from "react";
import { auth } from "../firebase";
import { Link } from "react-router-dom";
import { createUserWithEmailAndPassword, signOut } from "firebase/auth";
import { getAuth, setPersistence, signInWithEmailAndPassword, browserSessionPersistence } from "firebase/auth";
import Header from "./Header";


function Account() {

  const [signUpSuccess, setSignUpSuccess] = useState(null);
  const [signInSuccess, setSignInSuccess] = useState(null);
  const [signOutSuccess, setSignOutSuccess] = useState(null);

  function doSignUp(event) {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setSignUpSuccess(`You've successfully signed up, ${userCredential.user.email}!`)
      })
      .catch((error) => {
        setSignUpSuccess(`There was an error signing up: ${error.message}!`)
      });
  }

  function doSignIn(event) {
    event.preventDefault();
    const email = event.target.signinEmail.value;
    const password = event.target.signinPassword.value;

    const auth = getAuth();
    setPersistence(auth, browserSessionPersistence)
      .then(() => {

    return signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      setSignInSuccess(`You've successfully signed in as ${userCredential.user.email}!`)

    })
    .catch((error) => {
      setSignInSuccess(`There was an error signing in: ${error.message}!`);
    });
  })
}

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
      <div>
        <h1>Sign Out</h1>
        {signOutSuccess}
        <br />
        <button onClick={doSignOut}>Sign out</button>
      </div>
    ) : (
      <div>
        <h1>Sign up</h1>
        {signUpSuccess}
        <form onSubmit={doSignUp}>
          <input
            type='text'
            name='email'
            placeholder='email' />
          <input
            type='password'
            name='password'
            placeholder='Password' />
          <button type='submit'>Sign up</button>
        </form>
        <h1>Sign In</h1>
        {signInSuccess}
        <form onSubmit={doSignIn}>
          <input
            type='text'
            name='signinEmail'
            placeholder='email' />
          <input
            type='password'
            name='signinPassword'
            placeholder='Password' />
          <button type='submit'>Sign in</button>
        </form>
      </div>
    )}
    <Link to="/">
      <button className="controllerBtn">Back To Home</button>
    </Link>
    </React.Fragment>
  );
};

export default Account;