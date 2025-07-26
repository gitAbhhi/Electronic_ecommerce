import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { StoreContext } from './context/StoreContext';

const ProtectedRoute = () => {
  const { token } = useContext(StoreContext);

  return token ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
