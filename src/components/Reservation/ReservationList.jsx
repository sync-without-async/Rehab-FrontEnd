import styled from "styled-components";
import ReservationItem from "./ReservationItem";
import Pagination from "../Pagination/Pagination";
import { ReducerContext } from "../../reducer/context.js";
import { useEffect, useReducer } from "react";
import {
  intialReservationListState,
  reservationListReducer,
} from "../../reducer/reservation-list.js";
import BlockContainer from "../Common/BlockContainer.jsx";
import TitleText from "../Common/TitleText.jsx";
import { getAdminReservationList } from "../../librarys/api/reservation.js";
import ReservationModal from "./ReservationModal.jsx";

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

  useEffect(() => {
    (async () => {
      const data = await getAdminReservationList("ldh", page);
      dispatch({
        type: "data",
        payload: data,
      });
    })();
  }, [page]);

  return (
    <ReducerContext.Provider value={[state, dispatch]}>
      <BlockContainer>
        <ReservationModal />
        <TitleText text="비대면 진료 예약 목록" />
        <List>
          {list.map((item) => (
            <ReservationItem
              key={item.rno}
              date={item.date}
              index={item.index}
              dept="한림대학교"
              role="ADMIN_DOCTOR"
              name="김경재"
            />
          ))}
          <ReservationItem
            date="2023/11/05"
            index={38}
            dept="한림대학교"
            role="ADMIN_DOCTOR"
            name="사용자"
          />
          <ReservationItem
            date="2023/11/02"
            index={28}
            dept="한림대학교"
            role="ADMIN_THERAPIST"
            name="홍길동"
          />
        </List>
        <Pagination />
      </BlockContainer>
    </ReducerContext.Provider>
  );
};

export default ReservationList;
