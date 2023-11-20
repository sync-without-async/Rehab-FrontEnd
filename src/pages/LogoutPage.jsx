import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../redux/userSlice.js";
import { useNavigate } from "react-router-dom";

const LogoutPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(logout());
    navigate("/");
  }, []);

  return <></>;
};

export default LogoutPage;
