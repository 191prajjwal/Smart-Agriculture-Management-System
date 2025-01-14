import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Login from './Login';
import Register from './Register';
import img from "../../assets/img6.jpg";
import img1 from "../../assets/img7.jpg";

const AuthComponent = () => {
  const [isLogin, setIsLogin] = useState(true);

  const features = [
    { title: "Smart Farming Solutions", description: "Optimize your crop yields with AI-powered insights" },
    { title: "Real-time Monitoring", description: "Track your farm's health with advanced sensors" },
    { title: "Expert Support", description: "Connect with agricultural experts 24/7" }
  ];

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
     
      <div className="lg:w-1/2 relative flex items-center justify-center text-center">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${img1})`,
            backgroundSize: 'cover',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/70 to-transparent z-10" />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-20 text-yellow-400  px-8 py-12 lg:p-16"
        >
          <h1 className="text-3xl lg:text-3xl bg-white px-8 py-5 font-bold mb-8  rounded-lg shadow-md hover:shadow-lg transition-all duration-300 border">
            Welcome to <br /> Smart Agriculture Management System
          </h1>

          <div className="space-y-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.2 }}
                className="bg-emerald-600/40 backdrop-blur-md p-4 lg:p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 border border-emerald-400"
              >
                <h3 className="text-lg lg:text-xl font-bold text-white-100 mb-2">
                  {feature.title}
                </h3>
                <p className="text-emerald-50">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>

          <div className="mt-12 text-emerald-200">
            <p className="text-lg font-medium">
              Join thousands of farmers revolutionizing agriculture with our platform.
            </p>
          </div>
        </motion.div>
      </div>

  
      <div className="lg:w-1/2 relative flex-1">
        <div
          className="absolute inset-0 bg-cover bg-center z-0"
          style={{
            backgroundImage: `url(${img})`,
            backgroundSize: 'cover',
          }}
        />
        <div className="absolute inset-0 bg-black bg-opacity-60 z-10" />
        <div className="relative z-20 min-h-screen lg:h-full flex items-center justify-center p-6 lg:p-12">
          <div className="bg-white/95 backdrop-blur-sm p-6 lg:p-8 rounded-lg shadow-xl w-full max-w-md">
            <AnimatePresence mode="wait">
              {isLogin ? (
                <motion.div
                  key="login"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                >
                  <Login onRegisterClick={() => setIsLogin(false)} />
                </motion.div>
              ) : (
                <motion.div
                  key="register"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                >
                  <Register onLoginClick={() => setIsLogin(true)} />
                </motion.div>
              )}
            </AnimatePresence>

            <button
              onClick={() => setIsLogin(!isLogin)}
              className="mt-4 text-emerald-600 hover:text-emerald-700 font-semibold block w-full text-center transition-colors duration-300"
            >
              {isLogin ? "Need an account? Sign up" : "Already have an account? Login"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthComponent;
