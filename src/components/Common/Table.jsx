import styled from "styled-components";
import PropTypes from "prop-types";
import classNames from "classnames";
import TableItem from "./TableItem.jsx";
import { useMemo } from "react";

import { Droppable } from "react-beautiful-dnd";

const Container = styled.div`
  width: 100%;
  min-height: 280px;
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
`;

const Table = ({
  id,
  className,
  template,
  align,
  data,
  dropping,
  dragging,
}) => {
  const children = useMemo(
    () =>
      data.slice(1).map((item, index) => (
        <TableItem
          key={[id, index].join("-")}
          id={[id, index].join("-")}
          index={index}
          template={template}
          dropping={dropping}
          dragging={dragging}
        >
          {item.map((element, i) => (
            <Text key={[index, i].join("-")} $align={align[i]}>
              {element}
            </Text>
          ))}
        </TableItem>
      )),
    [data, template],
  );

  return (
    <>
      <TableItem header template={template}>
        {data[0].map((element, i) => (
          <Text key={i} $align={align[i]}>
            {element}
          </Text>
        ))}
      </TableItem>
      <Droppable droppableId={id} isDropDisabled={!dropping}>
        {(provided, snapshot) => (
          <Container
            {...provided.droppableProps}
            ref={provided.innerRef}
            className={className}
          >
            {children}
            {dropping && provided.placeholder}
          </Container>
        )}
      </Droppable>
    </>
  );
};

Table.propTypes = {
  id: PropTypes.string.isRequired,
  className: PropTypes.string,
  template: PropTypes.string.isRequired,
  align: PropTypes.arrayOf(PropTypes.string).isRequired,
  data: PropTypes.arrayOf(PropTypes.array).isRequired,
  dropping: PropTypes.bool,
  dragging: PropTypes.bool,
};

Table.defaultProps = {
  dropping: false,
  dragging: false,
};

export default Table;
