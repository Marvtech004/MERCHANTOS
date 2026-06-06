import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({ children }) {
  const token = localStorage.getItem('merchantos_access_token');
  return token ? children : <Navigate to="/login" replace />;
}
