import styled from 'styled-components';
import IconDesktop from "../../assets/icons/icondesktop1.png";
import IconDoctor from "../../assets/icons/icondoctor1.png";
import IconList from "../../assets/icons/iconlist1.png";
import PropTypes from 'prop-types';

const Container = styled.div`
    width: 240px;
    height: 240px;
    border-radius: 10px;
    border: 1px solid #0064FF;
    background-color: #FFFFFF;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 24px 32px;
`;

const CardIcon = styled.img`
    margin-bottom: 10px;
`;

const CardTitle = styled.div`
    font-size: 24px;
    color: #0064FF;
    font-weight: bold;
    margin-bottom: 10px;
    text-align: center;
`;

const CardDescription = styled.div`
    font-size: 12px;
    color: #000000;
    font-weight: 300;
    text-align: center;
    line-height: 1.5; 
`;

const CardhButton = ({ mode }) => {
  let icon, title, description;
  
  switch(mode) {
    case 'list':
      icon = IconList;
      title = "환자 목록";
      description = "김정원 님의 담당 환자 목록을 조회할 수 있습니다.";
      break;
    case 'treatment':
      icon = IconDesktop;
      title = "실시간 <br/> 비대면 진료";
      description = "김정원님의 담당 환자의 실시간으로 비대면 진료를 진행합니다."
      break;
    case 'register':
      icon = IconDoctor;
      title = "환자 등록";
      description = "김정원님의 환자에 대한 정보를 등록하고 과제를 할당합니다.";
      break;
    default:
      break;
  }

  return (
    <Container>
        <CardIcon src={icon} alt={title} />
        <CardTitle dangerouslySetInnerHTML={{ __html: title }} />
        <CardDescription dangerouslySetInnerHTML={{ __html: description }} />
    </Container>
  );
}

CardhButton.propTypes = {
  mode: PropTypes.oneOf(['list', 'treatment', 'register']).isRequired
};

export default CardhButton;
