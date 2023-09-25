import styled from 'styled-components';

const SignupContainer = styled.div`
  width: 1000px;
  height: 1000px;
  border: 1px solid #0064FF;
  border-radius: 10px;
  font-family: 'Spoqa Han Sans Neo', 'sans-serif';
`;

const Divider = styled.div`
  width: 900px;
  height: 1px;
  background-color: #D9D9D9;
  margin-top: 10px;
  margin-left: 30px;
  margin-right: auto;
`;

const Title = styled.div`
  margin: 24px 0 0 50px;
  font-size: 42px;
  font-weight: 700;
  position: relative;

  &::after {
    content: "";
    display: block;
    width: 900px;
    height: 1px;
    background-color: #D9D9D9;
    position: absolute;
    bottom: -20px;
    left: 0;
  }
`;

const Button = styled.button`
  width: 320px;
  height: 72px;
  background-color: #F3F3F3;
  border: 1px solid #BBBBBB;
  border-radius: 10px;
  font-weight: 500;
  margin: 163px 0 0 130px;
  cursor: pointer;

  &:nth-child(3) {
    margin-left: 30px;
  }
`;

const SignupComponents = () => {
  return (
    <SignupContainer>
      <Title>회원가입</Title>
      <Divider />
      <Button>전문의</Button>
      <Button>재활치료사</Button>
    </SignupContainer>
  );
};

export default SignupComponents;
