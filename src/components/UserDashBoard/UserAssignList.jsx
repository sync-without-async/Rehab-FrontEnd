import styled from "styled-components";
import assigninfo from "../../assets/icons/assigninfo.png";
import player from "../../assets/icons/player.png";
import Pagination from "../Pagination/Pagination";
import { getUserExercises } from "../../librarys/dummy-api";

const Container = styled.div`
  width: 800px;
  height: 635px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #0064ff;
  border-radius: 10px;
  background-color: #ffffff;
  font-family: "Spoqa Han Sans Neo", "sans-serif";
`;

const Title = styled.h1`
  font-size: 28px;
  font-weight: bold;
  color: #333;
  margin-bottom: 15px;
`;

const Divider = styled.hr`
  width: 100%;
  height: 1px;
  background-color: #d9d9d9;
  border: none;
  margin-bottom: 20px;
`;

const InfoBox = styled.div`
  width: 100%;
  height: 72px;
  border: 1px solid #0085ff;
  padding: 20px;
  border-radius: 5px;
  background-color: #f7faff;
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
`;

const InfoIcon = styled.img`
  width: 24px;
  height: 24px;
  margin-right: 10px;
  margin-top: -10px;
`;

const InfoTitle = styled.span`
  font-size: 16px;
  color: #0064ff;
  font-weight: 600;
  margin-right: 10px;
  margin-top: -10px;
`;

const InfoMessage = styled.p`
  flex-grow: 1;
  font-size: 14px;
  color: #000000;
  margin-top: -4px;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableRow = styled.tr`
  height: 40px;
  border-bottom: 1px solid #e1e1e1;
  font-size: 14px;
`;

const TableCell = styled.td`
  padding: 10px 15px;
  &:first-child {
    width: 60px;
  }
  &:nth-child(2) {
    width: 470px;
  }
  &:nth-child(3) {
    width: 60px;
  }
  &:nth-child(4) {
    width: 80px;
  }
`;

const TableHeader = styled.th`
  background-color: #f3f3f3;
  height: 40px;
  border-bottom: 2px solid #d9d9d9;
  font-size: 14px;
  color: #666666;
  text-align: left;
  padding-left: 15px;
  &:first-child {
    width: 60px;
  }
  &:nth-child(2) {
    width: 400px;
  }
  &:nth-child(3) {
    width: 80px;
  }
  &:nth-child(4) {
    width: 80px;
  }
`;

const PlayerIcon = styled.img`
  width: 18px;
  height: 18px;
`;

const Accuracy = styled.span`
  color: #000;
`;

const Judgement = styled.span`
  color: ${({ accuracy }) => {
    const percent = parseInt(accuracy, 10);
    if (percent === 0) return "#000";
    if (percent >= 80) return "#0085FF";
    return "#C71737";
  }};
`;

const UserAssignList = () => {
  const userId = "HL0001";
  const exercises = getUserExercises(userId);

  const totalItems = 40;
  const itemsPerPage = 8;

  const handlePageChange = (selectedPage) => {
    console.log("Selected page:", selectedPage);
  };
  return (
    <Container>
      <Title>과제</Title>
      <Divider />
      <InfoBox>
        <div style={{ display: "flex", alignItems: "center" }}>
          <InfoIcon src={assigninfo} alt="Info Icon" />
          <InfoTitle>재활치료사의 과제 설명</InfoTitle>
        </div>
        <InfoMessage>
          환자의 팔을 집중적으로 재활하는 과제를 할당하였습니다. ~~~를
          신경쓰면서 해주세요.
        </InfoMessage>
      </InfoBox>
      <Table>
        <thead>
          <TableRow>
            <TableHeader>번호</TableHeader>
            <TableHeader>과제 이름</TableHeader>
            <TableHeader>정확도</TableHeader>
            <TableHeader>판정</TableHeader>
            <TableHeader>수강</TableHeader>
          </TableRow>
        </thead>
        <tbody>
          {exercises.map((exercise, index) => (
            <TableRow key={index}>
              <TableCell>{exercise.id}</TableCell>
              <TableCell>{exercise.name}</TableCell>
              <TableCell>
                <Accuracy>{exercise.accuracy}</Accuracy>
              </TableCell>
              <TableCell>
                <Judgement accuracy={exercise.accuracy}>
                  {exercise.judgement}
                </Judgement>
              </TableCell>
              <TableCell>
                <PlayerIcon src={player} alt="Player Icon" />
              </TableCell>
            </TableRow>
          ))}
        </tbody>
      </Table>

      <Pagination
        totalItems={totalItems}
        itemsPerPage={itemsPerPage}
        onChange={handlePageChange}
      />
    </Container>
  );
};

export default UserAssignList;
