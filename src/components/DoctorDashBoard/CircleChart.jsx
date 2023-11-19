import PropTypes from "prop-types";
import { useMemo } from "react";
import styled from "styled-components";

const Outer = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background: #dfdfdf;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Inner = styled.div`
  width: 70px;
  height: 70px;
  border-radius: 50%;
  background-color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
`;

const CircularChart = ({ className, totalExercises, passedExercises }) => {
  const percentage =
    Math.round((passedExercises / totalExercises) * 100) || null;
  const gradientCss = `conic-gradient(#3592FF 0% ${percentage}%, #D9D9D9 ${
    percentage || 0
  }% 100%)`;

  const text = useMemo(
    () => (percentage !== null ? percentage + "%" : ""),
    [percentage],
  );

  return (
    <Outer className={className} style={{ background: gradientCss }}>
      <Inner>{text}</Inner>
    </Outer>
  );
};

CircularChart.propTypes = {
  className: PropTypes.string,
  totalExercises: PropTypes.number.isRequired,
  passedExercises: PropTypes.number.isRequired,
};

export default CircularChart;
