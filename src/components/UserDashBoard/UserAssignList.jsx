import styled from 'styled-components';
import assigninfo from "../../assets/icons/assigninfo.png";
import player from "../../assets/icons/player.png";
import Pagination from '../Pagination/Pagination';

const Container = styled.div`
    width: 720px; 
    height: 635px;
    margin: 0 auto;
    padding: 20px;
    border: 1px solid #0064FF;
    border-radius: 10px;
    background-color: #ffffff;
    font-family: 'Spoqa Han Sans Neo', 'sans-serif';
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
    background-color: #D9D9D9;
    border: none;
    margin-bottom: 20px;
`;

const InfoBox = styled.div`
width: 100%;
    height: 72px;
    border: 1px solid #0085FF;
    padding: 20px;
    border-radius: 5px;
    background-color: #F7FAFF;
    margin-bottom: 20px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
`

const InfoIcon = styled.img`
    width: 24px;
    height: 24px;
    margin-right: 10px;
    margin-top: -10px;
`;

const InfoTitle = styled.span`
    font-size: 16px;
    color: #0064FF;
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
        width: 400px;
    }
    &:nth-child(3) {
        width: 60px;
    }
    &:nth-child(4) {
      width: 80px;
  }
`;

const TableHeader = styled.th`
    background-color: #F3F3F3;
    height: 40px;
    border-bottom: 2px solid #D9D9D9;
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

const Percentage = styled.span`
    color: ${({completed}) => (completed ? '#0064FF' : '#FF0000')};
`;


const ExerciseList = () => {
      // 페이지네이션을 위한 상태 설정
      const totalItems = 40; // 전체 아이템 수를 설정해주세요
      const itemsPerPage = 8;
  
      const handlePageChange = (selectedPage) => {
          
          console.log("Selected page:", selectedPage);
      };
      return (
        <Container>
        <Title>과제</Title>
        <Divider />
        <InfoBox>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <InfoIcon src={assigninfo} alt="Info Icon" />
                <InfoTitle>재활치료사의 과제 설명</InfoTitle>
            </div>
            <InfoMessage>
                환자의 팔을 집중적으로 재활하는 과제를 할당하였습니다. ~~~를 신경쓰면서 해주세요.
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
                      {Array(8).fill(null).map((_, index) => (
                          <TableRow key={index}>
                              <TableCell>{index + 1}</TableCell>
                              <TableCell>과제 {index + 1}</TableCell>
                              <TableCell>
                                  <Percentage completed={index < 3}>
                                      {index < 2 ? '80%' : index === 2 ? '40%' : '0%'}
                                  </Percentage>
                              </TableCell>
                              <TableCell>{index < 2 ? '합격' : '미흡'}</TableCell>
                              <TableCell><PlayerIcon src={player} alt="Player Icon" /></TableCell>
                          </TableRow>
                      ))}
                  </tbody>
              </Table>
              
              {/* 페이지네이션 컴포넌트 추가 */}
              <Pagination 
                  totalItems={totalItems}
                  itemsPerPage={itemsPerPage}
                  onChange={handlePageChange}
              />
          </Container>
      );
  }

export default ExerciseList;