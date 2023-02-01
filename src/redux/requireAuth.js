import { Navigate,Outlet, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCurrentToken } from "./features/authSlice";


function RequireAuth() {
    const token = useSelector(selectCurrentToken);
    console.log(token);
    // const token = true;
    const location = useLocation();

  return (
    token
    ? <Outlet/>
    : <Navigate to="/"  />
  )
}

export default RequireAuth