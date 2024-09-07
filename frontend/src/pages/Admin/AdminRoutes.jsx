import { Navigate, Outlet } from "react-router";
import { useSelector, useDispatch } from "react-redux";

const AdminRoutes = () => {
  const { userInfo } = useSelector((state) => state.auth);

  return userInfo && userInfo.isAdmin ? <Outlet /> : <Navigate to="/login" replace />;
};

export default AdminRoutes;
