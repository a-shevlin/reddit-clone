import React, { useState, useEffect} from 'react';
import { auth } from "./../firebase.js";
import Account from './Account';
import Login from './Login';
import SignUp from './SignUp';
import ForumControl from './ForumController';
import PrivateRoute from './PrivateRoute.js';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { UserContext, HeaderState } from "./UserContext";
import "bootstrap/dist/js/bootstrap.min.js";

function App() {
  const [userName, setUserName] = useState(null);
  const [postId, setPostId] = useState(null);
  const [formVisibleOnPage, setFormVisibleOnPage] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [editing, setEditing] = useState(false);
  const [commentFormVisible, setCommentFormVisible] = useState(false);
  
  const grabObject = window.sessionStorage.getItem(sessionStorage.key(auth.currentUser));
  const parseObject = JSON.parse(grabObject);

  useEffect(() => {
    if (grabObject !== null) {
      setUserName(parseObject.email);
    } else {
      setUserName('Hello!');
    }
  },[window.sessionStorage])

  return (
    <Router>
      <HeaderState.Provider value={{formVisibleOnPage, setFormVisibleOnPage, selectedPost, setSelectedPost, editing, setEditing, commentFormVisible, setCommentFormVisible }}>
      <UserContext.Provider value={{ userName, setUserName, postId, setPostId}}>
        <Routes>
          <Route exact path="/" element={<PrivateRoute />} >
            <Route exact path="/" element={<ForumControl/>} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/account" element={<Account/>}/>
          <Route path="/signup" element={<SignUp/>}/>
        </Routes>
      </UserContext.Provider>
      </HeaderState.Provider>
    </Router>
  );
}

export default App;
