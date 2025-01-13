import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (!user) return null;

  return (
    <nav className="bg-green-600 text-white shadow-lg">
      <div className="container mx-auto px-6 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <Link to="/" className="text-xl font-bold">
              AgriSmart
            </Link>
            <Link to="/fields" className="hover:text-green-200">
              Fields
            </Link>
            <Link to="/subscription" className="hover:text-green-200">
              Subscription
            </Link>
            <Link to="/payments" className="hover:text-green-200">
              Payments
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <span>{user.name}</span>
            <button
              onClick={handleLogout}
              className="bg-green-700 px-4 py-2 rounded hover:bg-green-800"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;