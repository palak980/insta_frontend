import React from 'react';
import SignUp from './signup';
import './App.css'; // Import CSS file for styling
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './login';
import PersonalSpace from './PersonalSpace';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignUp />} /> {/* Specify the SignUp component for the root route */}
        <Route path="/login" element={<Login />} />
        <Route path="/PersonalSpace" element={<PersonalSpace />} />

      </Routes>
    </Router>
  );
}

export default App;
