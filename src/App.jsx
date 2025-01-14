import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Firstpage from './pages/firstpage.jsx';
import Homepage from './pages/homepage.jsx';
import Login from './pages/login.jsx';
import Signup from './pages/signup.jsx';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Firstpage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        {/* Add your homepage route if needed */}
        <Route path="/homepage" element={<Homepage />} />
      </Routes>
    </Router>
  );
}
function WApp(){
  return(
    <div></div>
  )
}

export default App;
