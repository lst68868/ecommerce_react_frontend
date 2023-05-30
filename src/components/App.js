import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './Nav/NavBar';
import Home from './Screens/Home';
// import Products from './Products';
// import Users from './Users';
// import Login from './Login';

function App() {
  return (
    <Router>
      <div>
        <div id="NavBar">
          <NavBar />
        </div>
        <div id="home"> 
          <Routes>
            <Route path="/" element={<Home />} />

            <Route path="/login" 
            
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
