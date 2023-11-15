import PropTypes from "prop-types";
import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectRole } from "../../redux/userSlice.js";
import { ROLE_TYPE } from "../../librarys/type.js";
import { useMemo } from "react";

const AuthorizedRoute = ({ children, to, whitelist }) => {
  const userRole = useSelector(selectRole);
  const pathname = useLocation().pathname;
  const redirect = to || pathname;

  const url = useMemo(() => {
    if (userRole === ROLE_TYPE.VISITOR) {
      return "/login?redirect=" + redirect;
    } else {
      return "/dashboard";
    }
  }, [userRole]);

  const authorized = true; // For testing only

  // const authorized = whitelist === null || whitelist.includes(userRole);

  return authorized ? <>{children}</> : <Navigate to={url} />;
};

AuthorizedRoute.propTypes = {
  children: PropTypes.node,
  whitelist: PropTypes.arrayOf(PropTypes.number),
  to: PropTypes.string,
};

AuthorizedRoute.defaultProps = {
  to: null,
  whitelist: null,
};

export default AuthorizedRoute;
