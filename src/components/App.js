import React, { useState } from 'react';
import Account from './Account';
//import { useState } from 'react';
import ForumControl from './ForumController';
import Header from "./Header"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { UserContext } from "./UserContext";

function App() {
  const [isLogged, setIsLogged] = useState(false);
  const [userName, setUserName] = useState(null);
  
  return (
    <div className="Controller">
      <Router>
        <UserContext.Provider value={{isLogged, setIsLogged, userName, setUserName}}>
          <Header />
          <Routes>
            <Route path="/account" element={<Account />} />
            <Route path="/" element={<ForumControl />} />
          </Routes>
        </UserContext.Provider>
      </Router>
    </div>
  );
}

export default App;
