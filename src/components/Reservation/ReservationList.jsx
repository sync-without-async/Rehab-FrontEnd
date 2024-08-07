import styled from "styled-components";
import ReservationItem from "./ReservationItem";
import Pagination from "../Pagination/Pagination";
import { ReducerContext } from "../../reducer/context.js";
import { useEffect, useReducer } from "react";
import {
  intialReservationListState,
  reservationListReducer,
} from "../../reducer/meeting-list.js";
import BlockContainer from "../Common/BlockContainer.jsx";
import TitleText from "../Common/TitleText.jsx";
import ReservationInfoModal from "./ReservationInfoModal.jsx";
import { useSelector } from "react-redux";
import { selectId, selectRole, selectToken } from "../../redux/userSlice.js";
import { ROLE_TYPE } from "../../librarys/type.js";
import {
  getAdminReservationList,
  getUserReservationList,
} from "../../librarys/api/reservation.js";
import Empty from "../Common/Empty.jsx";
import Conditional from "../Common/Conditional.jsx";

const List = styled.div`
  margin: 28px 0;
  display: flex;
  flex-direction: column;
  gap: 28px;
`;

const ReservationList = () => {
  const [state, dispatch] = useReducer(
    reservationListReducer,
    intialReservationListState,
  );
  const { list, page } = state;
  const token = useSelector(selectToken);
  const id = useSelector(selectId);
  const role = useSelector(selectRole);

  useEffect(() => {
    (async () => {
      let data;

      if (role === ROLE_TYPE.USER) {
        data = await getUserReservationList(token, id, page);
      } else {
        data = await getAdminReservationList(token, id, page);
      }

      dispatch({
        type: "data",
        payload: data,
      });
    })();
  }, [token, id, page, role]);

  const buttons =
    role === ROLE_TYPE.USER
      ? [
          {
            text: "예약 신청",
            to: "/meeting/create",
          },
        ]
      : [];

  return (
    <ReducerContext.Provider value={[state, dispatch]}>
      <BlockContainer>
        <ReservationInfoModal />
        <TitleText text="비대면 진료 예약 목록" buttons={buttons} />
        <List>
          {list.map((item) => (
            <ReservationItem
              key={item.rno}
              id={item.id}
              uuid={item.uuid}
              date={item.date}
              index={item.index}
              role={item.role}
              patient={item.patient}
              name={item.name}
              image={item.image}
              deleted={item.deleted}
              description={item.description}
              summary={item.summary}
            />
          ))}
          <Conditional
            condition={list.length === 0}
            content={<Empty message="진료 예약 기록이 없습니다." />}
          />
        </List>
        <Pagination />
      </BlockContainer>
    </ReducerContext.Provider>
  );
};

export default ReservationList;
