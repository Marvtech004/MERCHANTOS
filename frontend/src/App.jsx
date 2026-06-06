import { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/auth/Login.jsx';
import Register from './pages/auth/Register.jsx';
import ForgotPassword from './pages/auth/ForgotPassword.jsx';
import Dashboard from './pages/dashboard/Dashboard.jsx';
import Products from './pages/inventory/Products.jsx';
import ProductForm from './pages/inventory/ProductForm.jsx';
import POS from './pages/sales/POS.jsx';
import SalesHistory from './pages/sales/SalesHistory.jsx';
import Customers from './pages/customers/Customers.jsx';
import Reports from './pages/reports/Reports.jsx';
import Profile from './pages/profile/Profile.jsx';
import Layout from './components/Layout.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';

function App() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className={darkMode ? 'dark' : ''}>
      <div className="min-h-screen bg-slate-100 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/" element={<ProtectedRoute><Layout darkMode={darkMode} setDarkMode={setDarkMode} /></ProtectedRoute>}>
            <Route index element={<Dashboard />} />
            <Route path="products" element={<Products />} />
            <Route path="products/new" element={<ProductForm />} />
            <Route path="products/:id" element={<ProductForm />} />
            <Route path="pos" element={<POS />} />
            <Route path="sales" element={<SalesHistory />} />
            <Route path="customers" element={<Customers />} />
            <Route path="reports" element={<Reports />} />
            <Route path="profile" element={<Profile />} />
          </Route>
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
