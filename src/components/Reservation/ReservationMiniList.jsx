import styled from "styled-components";
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
import ReservationMiniItem from "./ReservationMiniItem.jsx";
import {
  getAdminReservationList,
  getUserReservationList,
} from "../../librarys/api/reservation.js";

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
  const token = useSelector(selectToken);
  const id = useSelector(selectId);
  const role = useSelector(selectRole);

  useEffect(() => {
    (async () => {
      let data;

      if (role === "USER") {
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

  return (
    <ReducerContext.Provider value={[state, dispatch]}>
      <BlockContainer>
        <ReservationInfoModal />
        <TitleText text="비대면 진료 예약 목록" small />
        <List>
          {list.map((item) => (
            <ReservationMiniItem
              key={item.rno}
              id={item.id}
              uuid={item.uuid}
              date={item.date}
              index={item.index}
              role={item.role}
              name={item.name}
              description={item.description}
              summary={item.summary}
            />
          ))}
        </List>
      </BlockContainer>
    </ReducerContext.Provider>
  );
};

export default ReservationMiniList;
