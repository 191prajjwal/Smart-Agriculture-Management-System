import React, { useState } from 'react';
import Login from './Login';
import Register from './Register';
import backgroundImage from '../../assets/img6.jpg';

const AuthComponent = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div 
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{ 
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${backgroundImage})` 
      }}
    >
      <div className="w-full max-w-md">
        {isLogin ? (
          <>
            <Login />
            <div className="text-center mt-4">
              <p className="text-white">Not a member?</p>
              <button
                onClick={() => setIsLogin(false)}
                className="text-green-400 hover:text-green-300 font-semibold mt-2"
              >
                Sign up now
              </button>
            </div>
          </>
        ) : (
          <>
            <Register />
            <div className="text-center mt-4">
              <p className="text-white">Already a member?</p>
              <button
                onClick={() => setIsLogin(true)}
                className="text-green-400 hover:text-green-300 font-semibold mt-2"
              >
                Login here
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AuthComponent;