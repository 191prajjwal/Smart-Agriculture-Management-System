import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import PrivateRoute from './components/common/PrivateRoute';
import Dashboard from './components/dashboard/Dashboard';
import FieldManagement from './components/fields/FieldManagement';
import AnalysisView from './components/analysis/AnalysisView';
import SubscriptionPlans from './components/subscription/SubscriptionPlans';
import PaymentHistory from './components/subscription/PaymentHistory';
import Navbar from './components/common/Navbar';
import AuthComponent from './components/auth/AuthComponent';

const AppRoutes = () => {
  const { user } = useAuth();

  // If user is authenticated, redirect to dashboard from auth page
  const AuthRoute = () => {
    return !user ? <AuthComponent /> : <Navigate to="/dashboard" />;
  };

  return (
    <>
      {/* Only show Navbar when user is authenticated */}
      {user && <Navbar />}
      
      <div className={user ? "container mx-auto px-4 py-8" : ""}>
        <Routes>
          {/* Auth route */}
          <Route path="/auth" element={<AuthRoute />} />
          
          {/* Protected routes */}
          <Route path="/dashboard" element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          } />
          <Route path="/fields" element={
            <PrivateRoute>
              <FieldManagement />
            </PrivateRoute>
          } />
          <Route path="/analysis/:fieldId" element={
            <PrivateRoute>
              <AnalysisView />
            </PrivateRoute>
          } />
          <Route path="/subscription" element={
            <PrivateRoute>
              <SubscriptionPlans />
            </PrivateRoute>
          } />
          <Route path="/payments" element={
            <PrivateRoute>
              <PaymentHistory />
            </PrivateRoute>
          } />

          {/* Redirect logic */}
          <Route path="/" element={<Navigate to={user ? "/dashboard" : "/auth"} />} />
          <Route path="*" element={<Navigate to={user ? "/dashboard" : "/auth"} />} />
        </Routes>
      </div>
    </>
  );
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <AppRoutes />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;