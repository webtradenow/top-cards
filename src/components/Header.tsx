import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import PasswordPrompt from './PasswordPrompt';

function Header() {
  const [showPasswordPrompt, setShowPasswordPrompt] = useState(false);
  const { isAuthenticated, login, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogin = () => {
    setShowPasswordPrompt(true);
  };

  const handlePasswordSubmit = (password: string) => {
    if (password === '5656life!') {
      login();
      setShowPasswordPrompt(false);
      navigate('/back-office');
    } else {
      alert('Incorrect password. Access denied.');
    }
  };

  return (
    <header className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-blue-600">
          Top Apps by Wizseller.com
        </Link>
        <nav>
          <ul className="flex space-x-4">
            <li>
              <Link to="/" className="text-gray-600 hover:text-gray-900">
                Home
              </Link>
            </li>
            {isAuthenticated && (
              <li>
                <Link to="/back-office" className="text-gray-600 hover:text-gray-900">
                  Back Office
                </Link>
              </li>
            )}
            <li>
              {isAuthenticated ? (
                <button
                  onClick={logout}
                  className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
                >
                  Logout
                </button>
              ) : (
                <button
                  onClick={handleLogin}
                  className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                >
                  Login
                </button>
              )}
            </li>
          </ul>
        </nav>
      </div>
      {showPasswordPrompt && (
        <PasswordPrompt
          onSubmit={handlePasswordSubmit}
          onCancel={() => setShowPasswordPrompt(false)}
        />
      )}
    </header>
  );
}

export default Header;