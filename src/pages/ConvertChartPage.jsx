import PropTypes from "prop-types";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { getChartWithId } from "../librarys/api/chart.js";
import { selectToken } from "../redux/userSlice.js";

const ConvertChartPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const token = useSelector(selectToken);

  useEffect(() => {
    (async () => {
      const res = await getChartWithId(token, id);
      navigate("/chart/" + res.cno);
    })();
  }, [token, id]);

  return <></>;
};

export default ConvertChartPage;
