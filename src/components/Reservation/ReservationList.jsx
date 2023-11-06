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
import ReservationInfoModal from "./ReservationInfoModal.jsx";
import { useSelector } from "react-redux";
import { selectEmail, selectRole } from "../../redux/userSlice.js";
import {
  getReservationListAdmin,
  getReservationListUser,
} from "../../librarys/dummy-api.js";

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
  const id = useSelector(selectEmail);
  const role = useSelector(selectRole);

  useEffect(() => {
    (async () => {
      let data;
      if (role === "USER") {
        data = await getReservationListUser(id, page);
      } else {
        data = await getReservationListAdmin(id, page);
      }

      dispatch({
        type: "data",
        payload: data,
      });
    })();
  }, [page]);

  return (
    <ReducerContext.Provider value={[state, dispatch]}>
      <BlockContainer>
        <ReservationInfoModal />
        <TitleText text="비대면 진료 예약 목록" />
        <List>
          {list.map((item) => (
            <ReservationItem
              key={item.rno}
              id={item.rno}
              date={item.date}
              index={item.index}
              dept="한림대학교"
              role="ADMIN_DOCTOR"
              name={item.adminName || item.userName}
            />
          ))}
        </List>
        <Pagination />
      </BlockContainer>
    </ReducerContext.Provider>
  );
};

export default ReservationList;
