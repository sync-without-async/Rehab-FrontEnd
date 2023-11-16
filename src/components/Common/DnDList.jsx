import styled from "styled-components";
import PropTypes from "prop-types";
import { useMemo } from "react";
import { Droppable } from "react-beautiful-dnd";
import DnDItem from "./DnDItem.jsx";
import classNames from "classnames";

const Container = styled.div`
  width: 300px;
  min-height: 280px;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;

  &.removable {
    width: 350px;
  }
`;

const DnDList = ({ id, data, dropping, dragging, removable }) => {
  return (
    <Droppable droppableId={id} isDropDisabled={!dropping}>
      {(provided, snapshot) => (
        <Container
          {...provided.droppableProps}
          ref={provided.innerRef}
          className={classNames({ removable })}
        >
          {data.map((item, index) => (
            <DnDItem
              key={[id, index].join("-")}
              id={[id, index].join("-")}
              index={index}
              data={item}
              dropping={dropping}
              dragging={dragging}
              removable={removable}
            />
          ))}
          {dropping && provided.placeholder}
        </Container>
      )}
    </Droppable>
  );
};

DnDList.propTypes = {
  id: PropTypes.string.isRequired,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  dropping: PropTypes.bool,
  dragging: PropTypes.bool,
  removable: PropTypes.bool,
};

DnDList.defaultProps = {
  dropping: false,
  dragging: false,
  removable: false,
};

export default DnDList;
