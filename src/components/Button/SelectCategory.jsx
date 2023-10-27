import { useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import ToggleButton from "./ToggleButton.jsx";
import { CATEGORY_TYPE } from "../../librarys/type.js";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

const Label = styled.label`
  font-family: "Spoqa Han Sans Neo", "sans-serif";
  font-size: 16px;
  font-weight: 500;
  margin-bottom: 5px;
`;

const Toggle = styled(ToggleButton)`
  width: 100px;
`;

const List = styled.div`
  display: flex;
  justify-content: space-between;
`;

function SelectCategory({ onChange }) {
  const [selectedTag, setSelectedTag] = useState(null);

  const handleClick = (item) => {
    setSelectedTag(item);
    onChange(item);
  };

  return (
    <Container>
      <Label>운동 태그 *</Label>
      <List>
        {CATEGORY_TYPE.map(({ key, value }) => (
          <Toggle
            key={key}
            selected={selectedTag === key}
            onClick={() => handleClick(key)}
          >
            {value}
          </Toggle>
        ))}
      </List>
    </Container>
  );
}

SelectCategory.propTypes = {
  onChange: PropTypes.func,
};

export default SelectCategory;
