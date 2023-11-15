import styled from "styled-components";
import PropTypes from "prop-types";
import classNames from "classnames";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { IoClose } from "react-icons/io5";
import { useContext, useMemo } from "react";
import { ReducerContext } from "../../reducer/context.js";
import { CATEGORY_TYPE } from "../../librarys/type.js";

const Item = styled.div`
  margin-top: 12px;
  width: 100%;
  height: 72px;
  border: 1px solid #bbbbbb;
  background-color: #ffffff;
  cursor: pointer;
  display: flex;
  gap: 12px;

  border-radius: 10px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  overflow: hidden;

  &.ghost {
    transform: none !important;
  }

  &.dragging {
    border: 1px dashed #b0b0b0;
  }
`;

const Image = styled.img`
  margin-top: 12px;
  margin-left: 12px;
  width: 70px;
  height: 50px;
  object-fit: cover;
`;

const Info = styled.div`
  margin: 12px 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex-grow: 1;
`;

const Title = styled.p`
  color: #000;
  font-size: 16px;
  font-weight: 500;
`;

const TagWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const Tag = styled.div`
  padding: 2px 8px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #eaeaea;
  color: #a2a2a2;
  font-size: 12px;

  &.ARM {
    background-color: #81f2c9;
    color: #249836;
  }
  &.SHOULDER {
    background-color: #9dd0ff;
    color: #6b7fe8;
  }
  &.KNEE {
    background-color: #ffb8b8;
    color: #d96262;
  }
  &.THIGH {
    background-color: #f9d58f;
    color: #c58e4d;
  }
`;

const Close = styled.button`
  width: 50px;
  height: 80px;
  border: none;
  background-color: white;
  cursor: pointer;

  &:not(.removable) {
    display: none;
  }
`;

const Icon = styled(IoClose)`
  width: 28px;
  height: 28px;
  color: #ff5252;
`;

function getDisplayTime(time) {
  const min = Math.floor(time / 60);
  const sec = Math.round(time - min * 60);
  return [min, sec].map((item) => item.toString().padStart(2, "0")).join(":");
}

const DnDItem = ({ id, index, data, dropping, dragging, removable }) => {
  const [state, dispatch] = useContext(ReducerContext);

  const handleButtonDown = (event) => {
    event.stopPropagation();
  };

  const handleRemove = (event) => {
    event.stopPropagation();
    dispatch({
      type: "removeAssign",
      payload: index,
    });
  };

  const displayTag = useMemo(() => `#${CATEGORY_TYPE[data.tag]} 운동`, [data]);
  const displayTime = useMemo(() => getDisplayTime(data.playTime), [data]);

  const innerComponent = (
    <>
      <Image src={data.thumbnailURL} />
      <Info>
        <Title>{data.title}</Title>
        <TagWrapper>
          <Tag className={data.tag}>{displayTag}</Tag>
          <Tag>{displayTime}</Tag>
        </TagWrapper>
      </Info>
      <Close
        className={classNames({ removable })}
        onMouseDown={handleButtonDown}
        onClick={handleRemove}
      >
        <Icon />
      </Close>
    </>
  );

  return (
    <Draggable draggableId={id} index={index} isDragDisabled={!dragging}>
      {(provided, snapshot) => {
        let style = {
          ...provided.draggableProps.style,
        };
        let ghost = null;

        if (!dropping) {
          style = {
            ...style,
            transform: snapshot.isDragging
              ? provided.draggableProps.style?.transform
              : "translate(0px, 0px)",
          };
          ghost = snapshot.isDragging && (
            <Item className="ghost">{innerComponent}</Item>
          );
        }

        return (
          <>
            <Item
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              className={classNames({ dragging: snapshot.isDragging })}
              style={style}
            >
              {innerComponent}
            </Item>
            {ghost}
          </>
        );
      }}
    </Draggable>
  );
};

DnDItem.propTypes = {
  id: PropTypes.string,
  index: PropTypes.number,
  children: PropTypes.node,
  dropping: PropTypes.bool,
  dragging: PropTypes.bool,
  removable: PropTypes.bool,
};

DnDItem.defaultProps = {
  dropping: false,
  dragging: false,
  removable: false,
};

export default DnDItem;
