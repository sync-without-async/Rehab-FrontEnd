import styled from "styled-components";
import PropTypes from "prop-types";

const Item = styled.div`
  width: 100%;
  height: 40px;
  border-bottom: 2px solid #d9d9d9;
  display: grid;
  grid-template-columns: ${(props) => props.$template || "1fr"};
  text-align: center;
  user-select: none;
  background-color: #ffffff;
  cursor: pointer;

  transition:
    transform 0.25s,
    background-color 0.25s;

  &.header {
    background-color: #f3f3f3;
    color: #666;
    cursor: default;
  }

  &:not(.header) {
    &:hover {
      background-color: #f3f3f3;
      transform: scale(1.01);
    }
  }
`;

const TableItem = ({ header, template, children }) => {
  if (header) {
    return (
      <Item className="header" $template={template}>
        {children}
      </Item>
    );
  }

  return <Item $template={template}>{children}</Item>;
};

TableItem.propTypes = {
  id: PropTypes.string,
  index: PropTypes.number,
  header: PropTypes.bool,
  template: PropTypes.string.isRequired,
  children: PropTypes.node,
};

TableItem.defaultProps = {
  header: false,
};

export default TableItem;
