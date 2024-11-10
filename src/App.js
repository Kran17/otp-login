import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './loginPage';
import HomePage from './HomePage';
import Dashboard from './Dashboard';
import AccountManagement from './AccountManagement';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/account-management" element={<AccountManagement />} />
      </Routes>
    </Router>
  );
}

export default App;
