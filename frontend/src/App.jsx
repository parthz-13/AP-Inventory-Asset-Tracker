import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import LandingPage from './pages/LandingPage';
import Login from './pages/login';
import Signup from './pages/signup';
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';

// Placeholder pages for dashboard routes
const Dashboard = () => <div>Dashboard Content</div>;
const Inventory = () => <div>Inventory Content</div>;
const Billing = () => <div>Billing Content</div>;
const Customers = () => <div>Customers Content</div>;

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* Protected Dashboard Routes */}
          <Route path="/" element={<ProtectedRoute><Layout /></ProtectedRoute>}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="inventory" element={<Inventory />} />
            <Route path="billing" element={<Billing />} />
            <Route path="customers" element={<Customers />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
