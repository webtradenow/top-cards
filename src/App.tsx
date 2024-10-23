import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import FrontPage from './pages/FrontPage';
import BackOffice from './pages/BackOffice';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Header />
        <div className="p-4">
          <Routes>
            <Route path="/" element={<FrontPage />} />
            <Route path="/back-office" element={<BackOffice />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;