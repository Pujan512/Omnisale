
import { Navigate, Outlet } from 'react-router';
import { getCurrentUser } from "../../authService";

const PrivateAdminRoute = () => {
    const bytes = atob(sessionStorage.getItem("adminRole"));
    const text = new TextDecoder('utf-8').decode(new Uint8Array([...bytes].map(char => char.charCodeAt(0))));
    return getCurrentUser() && text == "PujanNirjala" ? (
        <Outlet />
    ) : (
        <Navigate to="/adminLogin" />
    );
};

export default PrivateAdminRoute;
