import React, { useState } from 'react';
import Account from './Account';
//import { useState } from 'react';
import ForumControl from './ForumController';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { UserContext, HeaderState } from "./UserContext";
import "bootstrap/dist/js/bootstrap.min.js";
import { Navigate } from 'react-router-dom';
// import { AuthProvider } from "./Auth";
// import PrivateRoute from "./PrivateRoute";


function App() {
  const [isLogged, setIsLogged] = useState(false);
  const [userName, setUserName] = useState(null);
  const [postId, setPostId] = useState(null);
  const [formVisibleOnPage, setFormVisibleOnPage] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [editing, setEditing] = useState(false);
  const [commentFormVisible, setCommentFormVisible] = useState(false);
  const loggedIn = window.localStorage.getItem("isLoggedIn");
  

  const token = localStorage.getItem('token');

  return (
    <Router>
      <HeaderState.Provider value={{formVisibleOnPage, setFormVisibleOnPage, selectedPost, setSelectedPost, editing, setEditing, commentFormVisible, setCommentFormVisible }}>
      <UserContext.Provider value={{isLogged, setIsLogged, userName, setUserName, postId, setPostId}}>
        <Routes>
          <Route path="/account" element={<Account />} />
          <Route exact path="/" element={<ForumControl/>} />
        </Routes>
      </UserContext.Provider>
      </HeaderState.Provider>
    </Router>
  );
}

export default App;
