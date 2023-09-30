import { BsFillCalendarHeartFill } from 'react-icons/bs';
import {useState} from 'react';
import Datetime from 'react-datetime';

const DateSelect = () => {
  const [date, setDate] = useState('');
  const [open, setOpen] = useState(false);

  const format = 'YYYY-MM-DD';

  const handleClickButton = () => {
    setOpen(!open);
  };

  const handleChangeCalendar = (selected) => {
    const formattedDate = selected.format(format);
    setDate(formattedDate);
    setOpen(false);
  };

  const getSeparator = () => {
    const regex = /[^0-9a-zA-Z]+/;
    const match = format.match(regex);

    if (match) {
      const symbol = match[0];
      const indexes = [];

      for (let i = 0; i < format.length; i++) {
        if (format[i] === symbol) {
          indexes.push(i);
        }
      }

      return { symbol, indexes };
    }
    return { symbol: undefined, indexes: [] };
  };

  const separator = getSeparator();

  const handleChangeDate = (e) => {
    let currentDate = e.target.value;

    if (separator.symbol && separator.indexes.length > 0) {
      separator.indexes.forEach((index) => {
        if (currentDate.length > index) {
          currentDate =
            currentDate.slice(0, index) +
            separator.symbol +
            currentDate.slice(index);
        }
      });
    }

    setDate(currentDate);
  };

  return (
    <div>
      <input
        type='text'
        value={date}
        placeholder='placeholder'
        onChange={handleChangeDate}
      />
      <button type='button' onClick={handleClickButton}>
        <BsFillCalendarHeartFill />
      </button>
      {open && (
          <Datetime
            input={false}
            timeFormat={false}
            dateFormat={format}
            value={date}
            onChange={handleChangeCalendar}
          />
      )}
    </div>
  );
};

export default DateSelect;