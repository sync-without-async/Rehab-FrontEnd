import { useState } from 'react';
import styled from 'styled-components';

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: -40px;
`;

const Label = styled.label`
  font-family: 'Spoqa Han Sans Neo', 'sans-serif';
  font-size: 16px;
  font-weight: 500;
  margin-bottom: 5px;
`;

const TagButton = styled.button`
  width: 100px;
  height: 40px;
  border-radius: 10px;
  background-color: ${props => props.selected ? '#F3F1FF' : '#FAFAFA'};
  border: ${props => props.selected ? '2px solid #0064FF' : '1px solid #E8E8E8'};
  color: #000000;
  font-size: 18px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
  margin-right: 10px; // 마지막 버튼 제외 각 버튼의 오른쪽 간격
  cursor: pointer;

  &:last-child {
    margin-right: 0; // 마지막 버튼 오른쪽 간격 제거
  }
`;

function FilterButton({ label }) {
  const [selectedTag, setSelectedTag] = useState(null);

  const tags = ["팔", "허벅지", "어깨", "무릎"];

  const handleTagClick = (tag) => {
    if (selectedTag === tag) {
      setSelectedTag(null); 
    } else {
      setSelectedTag(tag); 
    }
  }

  return (
    <InputContainer>
      <Label>{label}</Label>
      <div>
        {tags.map(tag => (
          <TagButton 
            key={tag}
            selected={selectedTag === tag}
            onClick={() => handleTagClick(tag)}
          >
            {tag}
          </TagButton>
        ))}
      </div>
    </InputContainer>
  );
}

export default FilterButton;
