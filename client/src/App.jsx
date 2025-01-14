import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import PrivateRoute from './components/common/PrivateRoute';
import Dashboard from './components/dashboard/Dashboard';
import FieldManagement from './components/fields/FieldManagement';
import AnalysisView from './components/analysis/AnalysisView';
import SubscriptionPlans from './components/subscription/SubscriptionPlans';
import PaymentHistory from './components/subscription/PaymentHistory';
import Navbar from './components/common/Navbar';
import AuthComponent from './components/auth/AuthComponent';

const AppRoutes = () => {
  return (
    <Routes>
      
      <Route path="/auth" element={<AuthComponent />} />
      
  
      <Route path="/dashboard" element={
        <PrivateRoute>
          <Navbar />
          <div className="container mx-auto px-4 py-8">
            <Dashboard />
          </div>
        </PrivateRoute>
      } />
      
      <Route path="/fields" element={
        <PrivateRoute>
          <Navbar />
          <div className="container mx-auto px-4 py-8">
            <FieldManagement />
          </div>
        </PrivateRoute>
      } />
      
      <Route path="/analysis/:fieldId" element={
        <PrivateRoute>
          <Navbar />
          <div className="container mx-auto px-4 py-8">
            <AnalysisView />
          </div>
        </PrivateRoute>
      } />
      
      <Route path="/subscription" element={
        <PrivateRoute>
          <Navbar />
          <div className="container mx-auto px-4 py-8">
            <SubscriptionPlans />
          </div>
        </PrivateRoute>
      } />
      
      <Route path="/payments" element={
        <PrivateRoute>
          <Navbar />
          <div className="container mx-auto px-4 py-8">
            <PaymentHistory />
          </div>
        </PrivateRoute>
      } />
      
      
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
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