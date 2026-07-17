// src/App.jsx
import React from 'react';
import RagDashboard from './AI'; 
import { Routes, Route } from 'react-router-dom'; 
import Home from './Home';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/ai" element={<RagDashboard />} />
    </Routes>
  );
}

export default App;