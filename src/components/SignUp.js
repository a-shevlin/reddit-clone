import React, { useState, useContext } from "react";
import { auth } from "../firebase";
import { Link } from "react-router-dom";
import { createUserWithEmailAndPassword, signOut } from "firebase/auth";
import { getAuth, setPersistence, signInWithEmailAndPassword, browserSessionPersistence } from "firebase/auth";
import Header from "./Header";


function SignUp() {
  const [signUpSuccess, setSignUpSuccess] = useState(null);

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

  return(
    <React.Fragment>
        <Header />
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
        </div>
    </React.Fragment>
  )
}

export default SignUp