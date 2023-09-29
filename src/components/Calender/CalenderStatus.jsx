import { useMemo, useContext } from "react";
import { styled } from "styled-components";

import Select from "../Calender/Select.jsx"

import { StateContext, DispatchContext } from "../../librarys/context.js";
import { useState } from "react";
import { useEffect } from "react";

const TotalAmount = styled.p`
  font-size: 32px;
  font-weight: 700;
`;

const CalenderStatus = () => {
  const { calenderlist, expenseList } = useContext(StateContext);
  const dispatch = useContext(DispatchContext);

  const [value, setValue] = useState();
  const [list, setList] = useState([]);

  useEffect(() => {
    if (!calenderlist) {
      return;
    }
    const list = calenderlist.map((item, index) => ({
      id: index + 1,
      year: item.year,
      month: item.month,
      name: `${item.year}년 ${item.month}월`,
    }));

    setList(list);

    if (list[0]) {
      setValue(list[0].id);
    }
  }, [calenderlist]);

  const price = useMemo(
    () => expenseList.reduce((result, item) => result + item.price, 0),
    [expenseList],
  );

  return (
    <>
      <Select
        list={list}
        value={value}
        onSelect={(item) => {
          setValue(item.id);
          dispatch({
            type: "selectCalender",
            payload: item,
          });
        }}
      />
      <TotalAmount>{price.toLocaleString()}원</TotalAmount>
    </>
  );
};

export default CalenderStatus;