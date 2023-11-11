import styled from "styled-components";
import PropTypes from "prop-types";
import classNames from "classnames";
import { Draggable, Droppable } from "react-beautiful-dnd";

const Item = styled.div`
  width: 100%;
  height: 40px;
  border-bottom: 2px solid #d9d9d9;
  display: grid;
  grid-template-columns: ${(props) => props.template || "1fr"};
  text-align: center;
  user-select: none;
  background-color: #ffffff;
  cursor: pointer;

  &.header {
    background-color: #f3f3f3;
    color: #666;
    cursor: default;
  }

  &.dragging {
    border: 1px dashed #d9d9d9;
    box-shadow: 2px 2px 4px #0000001f;
  }
`;

const TableItem = ({ id, index, header, template, children, dragging }) => {
  if (header) {
    return (
      <Item className="header" template={template}>
        {children}
      </Item>
    );
  }

  return (
    <Draggable draggableId={id} index={index} isDragDisabled={!dragging}>
      {(provided, snapshot) => (
        <>
          <Item
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            className={classNames({ dragging: snapshot.isDragging })}
            template={template}
            style={{
              ...provided.draggableProps.style,
              transform: snapshot.isDragging
                ? provided.draggableProps.style?.transform
                : "translate(0px, 0px)",
            }}
          >
            {children}
          </Item>
          {snapshot.isDragging && (
            <Item style={{ transform: "none !important" }} template={template}>
              {children}
            </Item>
          )}
        </>
      )}
    </Draggable>
  );
};

TableItem.propTypes = {
  id: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  header: PropTypes.bool,
  template: PropTypes.string.isRequired,
  children: PropTypes.node,
  dragging: PropTypes.bool,
};

TableItem.defaultProps = {
  header: false,
  dragging: false,
};

export default TableItem;
