import React, { useState } from 'react';
import Account from './Account';
//import { useState } from 'react';
import ForumControl from './ForumController';
import Header from "./Header";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { UserContext } from "./UserContext";
import "bootstrap/dist/js/bootstrap.min.js";

function App() {
  const [isLogged, setIsLogged] = useState(false);
  const [userName, setUserName] = useState(null);
  const [postId, setPostId] = useState(null);
  
  return (
    <Router>
      <UserContext.Provider value={{isLogged, setIsLogged, userName, setUserName, postId, setPostId}}>
        <Header />
        <Routes>
        
          <Route path="/account" element={<Account />} />
          <Route path="/" element={<ForumControl />} />
        </Routes>
      </UserContext.Provider>
    </Router>
  );
}

export default App;
