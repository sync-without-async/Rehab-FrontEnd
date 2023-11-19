import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { ReducerContext } from "../../reducer/context.js";
import { getDisplayBirthday } from "../../librarys/util.js";
import { GENDER_TYPE } from "../../librarys/type.js";
import BlockContainer from "../Common/BlockContainer.jsx";

const Container = styled(BlockContainer)`
  color: #000000;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 18px 24px;
`;

const Wrapper = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
`;

const UserName = styled.span`
  font-size: 20px;
  font-weight: 600;
`;

const Gender = styled.span`
  font-size: 16px;
  color: #908b8b;
  font-weight: 400;
`;

const Birth = styled.span`
  font-size: 16px;
  font-weight: 400;
`;

const DoctorDetailHeader = () => {
  const [state, dispatch] = useContext(ReducerContext);
  const { name, gender, birthday } = state;

  return (
    <Container>
      <Wrapper>
        <UserName>{name}</UserName>
        <Gender>{GENDER_TYPE[gender]}</Gender>
      </Wrapper>
      <Birth>{getDisplayBirthday(birthday)}</Birth>
    </Container>
  );
};

export default DoctorDetailHeader;
