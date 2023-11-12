import styled from "styled-components";
import Pagination from "../Pagination/Pagination";
import { ReducerContext } from "../../reducer/context.js";
import { useEffect, useReducer } from "react";
import {
  intialReservationListState,
  reservationListReducer,
} from "../../reducer/reservation-list.js";
import BlockContainer from "../Common/BlockContainer.jsx";
import TitleText from "../Common/TitleText.jsx";
import ReservationInfoModal from "./ReservationInfoModal.jsx";
import { useSelector } from "react-redux";
import { selectEmail, selectRole } from "../../redux/userSlice.js";
import {
  getReservationListAdmin,
  getReservationListUser,
} from "../../librarys/dummy-api.js";
import ReservationMiniItem from "./ReservationMiniItem.jsx";

const List = styled.div`
  margin: 28px 0;
  display: grid;
  grid-template-columns: 320px 320px;
  flex-direction: column;
  justify-content: center;
  gap: 28px 80px;
`;

const ReservationMiniList = () => {
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
  }, [id, role, page]);

  return (
    <ReducerContext.Provider value={[state, dispatch]}>
      <BlockContainer>
        <ReservationInfoModal />
        <TitleText text="비대면 진료 예약 목록" small />
        <List>
          {list.map((item) => (
            <ReservationMiniItem
              key={item.rno}
              id={item.rno}
              date={item.date}
              index={item.index}
              name={item.adminName || item.userName}
            />
          ))}
        </List>
      </BlockContainer>
    </ReducerContext.Provider>
  );
};

export default ReservationMiniList;
