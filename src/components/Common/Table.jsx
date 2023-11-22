import styled from "styled-components";
import PropTypes from "prop-types";
import TableItem from "./TableItem.jsx";
import { useMemo } from "react";

const Wrapper = styled.div``;

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
`;

const Text = styled.p`
  width: 100%;
  height: 100%;
  text-align: ${(props) => props.$align || "left"};
  padding: 7px 12px;
  font-size: 14px;
  font-weight: 400;
  line-height: 24px;
  vertical-align: middle;
`;

const Table = ({ className, template, align, data, onClick }) => {
  const handleItemClick = (data, index) => {
    return () => {
      onClick(data, index);
    };
  };

  const children = useMemo(
    () =>
      data.slice(1).map((item, index) => (
        <TableItem
          key={index}
          template={template}
          onClick={handleItemClick(item, index)}
        >
          {item.map((element, i) => (
            <Text key={[index, i].join("-")} $align={align[i]}>
              {element}
            </Text>
          ))}
        </TableItem>
      )),
    [data, template, align],
  );

  return (
    <Wrapper>
      <TableItem header template={template}>
        {data[0].map((element, i) => (
          <Text key={i} $align={align[i]}>
            {element}
          </Text>
        ))}
      </TableItem>
      <Container
        className={className}
        style={{ minHeight: data.length < 2 ? "auto" : "280px" }}
      >
        {children}
      </Container>
    </Wrapper>
  );
};

Table.propTypes = {
  className: PropTypes.string,
  template: PropTypes.string.isRequired,
  align: PropTypes.arrayOf(PropTypes.string).isRequired,
  data: PropTypes.arrayOf(PropTypes.array).isRequired,
  onClick: PropTypes.func,
};

export default Table;
