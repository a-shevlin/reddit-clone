import React, { useState, useContext, useCallback } from "react";
import { auth } from "../firebase";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, signOut } from "firebase/auth";
import { getAuth, setPersistence, signInWithEmailAndPassword, browserSessionPersistence } from "firebase/auth";
import { HeaderState } from "./UserContext";
import Header from "./Header";

function Login() {
  const [signInSuccess, setSignInSuccess] = useState(null);
  const { formVisibleOnPage, setFormVisibleOnPage, selectedPost, setSelectedPost, editing, setEditing, commentFormVisible, setCommentFormVisible } = useContext(HeaderState);

  const navigate =useNavigate();
  const toLogin = useCallback(() => navigate('/', {replace:true}, [navigate]))

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
      {toLogin()}

    })
    .catch((error) => {
      setSignInSuccess(`There was an error signing in: ${error.message}!`);
    });
  })
}
  return (
      <React.Fragment>
        <Header />
        <div>
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
      </React.Fragment>
  )
}

export default Login