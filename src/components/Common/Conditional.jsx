import { useMemo } from "react";
import PropTypes from "prop-types";

// condition이 true이면 content를, false이면 alternativeContent를 렌더링하는 컴포넌트
const Conditional = ({
  condition,
  content = null,
  alternativeContent = null,
}) => {
  return useMemo(
    () => (condition ? content : alternativeContent),
    [condition, content, alternativeContent],
  );
};

Conditional.propTypes = {
  condition: PropTypes.bool.isRequired,
  content: PropTypes.node.isRequired,
  alternativeContent: PropTypes.node.isRequired,
};

export default Conditional;
