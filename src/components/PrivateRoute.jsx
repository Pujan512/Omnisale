
import { Navigate, Outlet } from 'react-router';
import {getCurrentUser} from "../authService";

const PrivateRoute = () => {

  return getCurrentUser() ? (
    <Outlet/>
  ) : (
    <Navigate to="/login" />
  );
};

export default PrivateRoute;
