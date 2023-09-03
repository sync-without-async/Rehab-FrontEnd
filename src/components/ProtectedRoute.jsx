import PropTypes from "prop-types";
import { Navigate, useLocation } from "react-router-dom";
import { selectIsAdmin, selectIsLoggedIn } from "../redux/userSlice";
import { useSelector } from "react-redux";
import Cookies from "js-cookie";

function ProtectedRoute({ children, role = 1 }) {
  const userRole = (() => {
    const role = Cookies.get("userRole");

    switch (role) {
      case "ROLE_USER":
        return 1;
      case "ROLE_ADMIN":
        return 2;
      default:
        return 0;
    }
  })();

  const url = userRole >= 1 ? "/" : "/?showLogin=true";

  return userRole >= role ? <>{children}</> : <Navigate to={url} />;
}

ProtectedRoute.propTypes = {
  children: PropTypes.node,
  role: PropTypes.number,
};

export default ProtectedRoute;
