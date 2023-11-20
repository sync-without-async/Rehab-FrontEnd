import styled from "styled-components";
import PropTypes from "prop-types";
import BlockContainer from "../Common/BlockContainer.jsx";
import TitleText from "../Common/TitleText.jsx";
import { useDispatch } from "react-redux";
import { show } from "../../redux/modalSlice.js";
import { useSelector } from "react-redux";
import { selectRole } from "../../redux/userSlice.js";
import { ROLE_TYPE } from "../../librarys/type.js";

const Item = styled.div`
  width: 100%;
`;

const Date = styled.p`
  font-size: 24px;
  font-weight: 800;
`;

const Content = styled.p`
  min-height: 100px;
  max-height: 200px;
  margin-top: 8px;
  padding: 12px;
  border-radius: 10px;
  border: 1px solid #bbb;
  background: #fafafa;
  color: #3f3f3f;
  font-size: 16px;
  font-weight: 400;
  overflow: auto;
  white-space: pre-wrap;
`;

const RecordItem = ({ date, content }) => {
  return (
    <Item>
      <Date>{date}</Date>
      <Content>{content}</Content>
    </Item>
  );
};

RecordItem.propTypes = {
  date: PropTypes.string,
  content: PropTypes.string,
};

const List = styled.div`
  margin-top: 12px;
  margin-bottom: 24px;
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const DoctorRecord = ({ title, data, button }) => {
  const dispatch = useDispatch();
  const role = useSelector(selectRole);

  const buttons =
    button && role === ROLE_TYPE.DOCTOR
      ? [
          {
            text: "진료 기록 추가",
            callback: () => dispatch(show("chart_record_create")),
          },
        ]
      : [];

  return (
    <BlockContainer>
      <TitleText text={title} small buttons={buttons} />
      <List>
        {data.slice(0, 2).map((item, index) => (
          <RecordItem key={index} date={item.date} content={item.content} />
        ))}
      </List>
    </BlockContainer>
  );
};

DoctorRecord.propTypes = {
  title: PropTypes.string,
  data: PropTypes.arrayOf({
    date: PropTypes.string,
    content: PropTypes.string,
  }),
  button: PropTypes.bool,
};

DoctorRecord.defaultProps = {
  data: [],
  button: false,
};

export default DoctorRecord;
