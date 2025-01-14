import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (!user) return null;

  return (
    <nav className="bg-green-600 text-white shadow-lg">
      <div className="container mx-auto px-6 py-3 flex items-center justify-between">
        <Link to="/" className="text-xl font-bold">
          AgriSmart
        </Link>

        <div className="lg:hidden">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="focus:outline-none transform transition-transform duration-300 hover:scale-110"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>

        <div className="hidden lg:flex items-center space-x-8">
          <Link to="/fields" className="hover:text-green-200">
            Fields
          </Link>
          <Link to="/subscription" className="hover:text-green-200">
            Subscription
          </Link>
          <Link to="/payments" className="hover:text-green-200">
            Payments
          </Link>
          <div className="flex items-center space-x-4">
            <span>{user.name[0].toUpperCase() + user.name.slice(1)}</span>
            <button
              onClick={handleLogout}
              className="bg-green-700 px-4 py-2 rounded hover:bg-green-800"
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      
      <div 
        className={`lg:hidden fixed inset-0 bg-black bg-opacity-50 transition-opacity duration-300 ${
          menuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setMenuOpen(false)}
      />

     
      <div
        className={`lg:hidden fixed top-0 right-0 h-full w-4/5 max-w-sm bg-emerald-200 transform transition-transform duration-300 ease-in-out ${
          menuOpen ? 'translate-x-0' : 'translate-x-full'
        } shadow-2xl`}
      >
        <div className="flex flex-col p-6 space-y-6">
          <div className="flex justify-between items-center">
            <span className="text-xl font-bold text-green-900">Menu</span>
            <button
              onClick={() => setMenuOpen(false)}
              className="text-3xl text-red-600 hover:text-red-800 transition duration-300 focus:outline-none transform hover:rotate-90"
            >
              ×
            </button>
          </div>
          
          <div className="flex flex-col space-y-4">
            <Link
              to="/fields"
              onClick={() => setMenuOpen(false)}
              className="text-green-600 bg-white shadow-md p-3 rounded-lg transition-all duration-300 hover:shadow-lg hover:bg-yellow-200"
            >
              Fields
            </Link>
            <Link
              to="/subscription"
              onClick={() => setMenuOpen(false)}
              className="text-green-600 bg-white shadow-md p-3 rounded-lg transition-all duration-300 hover:shadow-lg hover:bg-yellow-200"
            >
              Subscription
            </Link>
            <Link
              to="/payments"
              onClick={() => setMenuOpen(false)}
              className="text-green-600 bg-white shadow-md p-3 rounded-lg transition-all duration-300 hover:shadow-lg hover:bg-yellow-200"
            >
              Payments
            </Link>
          </div>

          <div className="pt-6 border-t border-gray-100">
            <div className="bg-white text-green-600 shadow-md border border-gray-100 p-3 rounded-lg mb-4 text-center">
              {user.name[0].toUpperCase() + user.name.slice(1)}
            </div>
            <button
              onClick={() => {
                handleLogout();
                setMenuOpen(false);
              }}
              className="w-full bg-white text-green-600 shadow-md  px-4 py-3 rounded-lg transition-all duration-300 text-center hover:shadow-lg hover:text-white hover:bg-red-500"
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