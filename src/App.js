import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SearchPage from './components/SearchPage';
import EditImagePage from './components/EditImagePage';
import './App.css';

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<SearchPage />} />
      <Route path="/edit" element={<EditImagePage />} />
    </Routes>
  </Router>
);

export default App;