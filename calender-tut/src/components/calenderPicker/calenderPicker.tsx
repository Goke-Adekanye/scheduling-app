/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-useless-concat */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { FC, useEffect, useState } from 'react';
import './calenderPicker.scss';
import {
  CalenderSvg,
  ChevronLeft,
  ChevronLeftDouble,
  ChevronRight,
  ChevronRightDouble,
} from '../../assets/imagesSvg';

const weekShortArray = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
const weekLongArray = [
  'sunday',
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  'friday',
  'saturday',
];
const monthShortArray = [
  'jan',
  'feb',
  'mar',
  'apr',
  'may',
  'jun',
  'jul',
  'aug',
  'sep',
  'oct',
  'nov',
  'dec',
];
const monthLongArray = [
  'january',
  'febuary',
  'march',
  'april',
  'may',
  'june',
  'july',
  'august',
  'september',
  'october',
  'november',
  'december',
];

interface CalenderPickerProps {
  handleChange: (key: string, value: string) => void;
  disabledDays: number[];
  reset: boolean;
  handleDateChange: (value: string) => void;
}

const CalenderPicker: FC<CalenderPickerProps> = ({
  handleChange,
  disabledDays,
  reset,
  handleDateChange,
}) => {
  const [value, setValue] = useState('');
  const [datePickerVisibility, setDatePickerVisibility] = useState(false);
  const [activeYear, setActiveYear] = useState<number>(1);
  const [activeMonth, setActiveMonth] = useState<number>(1);
  const [activeDay, setActiveDay] = useState<number>(1);
  const [selectedValue, setSelectedValue] = useState<{
    year: number;
    month: number;
    day: number;
  }>();

  const handlePickerVisibility = () => {
    setDatePickerVisibility(!datePickerVisibility);
  };
  const getToday = () => {
    return new Date();
  };

  const resetCallback = () => {
    setValue('');
    setSelectedValue(undefined);
  };

  useEffect(() => {
    if (reset) {
      resetCallback();
    }
  }, [reset]);

  useEffect(() => {
    handleChange('date', value);
  }, [value]);

  useEffect(() => {
    handleDateChange(`${activeYear}:${activeMonth}`);
  }, [activeYear, activeMonth]);

  useEffect(() => {
    const today = getToday();

    setActiveYear(today.getFullYear());
    setActiveMonth(today.getMonth() + 1);
    setActiveDay(today.getDate());
  }, []);

  useEffect(() => {
    if (selectedValue?.day) {
      const fullDayFormat =
        selectedValue.day.toString().length < 2 ? `0${selectedValue.day}` : selectedValue.day;
      const fullMonthFormat =
        selectedValue.month.toString().length < 2 ? `0${selectedValue.month}` : selectedValue.month;

      const stringFormat = `${selectedValue?.year}-${fullMonthFormat}-${fullDayFormat}`; //yyyy-mm-dd
      setValue(stringFormat);
      setDatePickerVisibility(false);
    }
  }, [selectedValue]);

  const getDaysInMonth = (_activeMonth: number, _activeYear: number) => {
    return _activeMonth === 2
      ? _activeYear & 3 || (!(_activeYear % 25) && _activeYear & 15)
        ? 28
        : 29
      : 30 + ((_activeMonth + (_activeMonth >> 3)) & 1);
  };

  const getStartWeekDay = (_activeMonth: number, _activeYear: number) => {
    if (_activeMonth > 9) {
      const dateReview = new Date(_activeYear + '-' + _activeMonth + '-' + '01').getDay() + 1;
      if (dateReview === 7) return 0;
      else return dateReview;
    }
    return new Date(_activeYear + '-' + _activeMonth + '-' + '01').getDay();
  };

  const checkDisabled = (value: number) => {
    const disable_data_mock = {
      year: selectedValue?.year,
      month: selectedValue?.month,
      days: [1, 5, 15, 25],
    };

    const today = getToday();
    today.setHours(0, 0, 0, 0);
    const selectedDate = new Date(activeYear, activeMonth - 1, value);

    if (selectedDate < today) return true;

    if (selectedDate.getDay() === 0 || selectedDate.getDay() === 6) return true;

    if (disabledDays.includes(value)) return true;

    if (activeYear === disable_data_mock.year && activeMonth === disable_data_mock.month) {
      if (disable_data_mock.days.includes(value)) return true;
    }
    return false;
  };

  const getIsToday = (value: number) => {
    if (activeMonth === getToday().getMonth() + 1 && activeYear === getToday().getFullYear()) {
      if (getToday().getDate() === value) return true;
    }
    return false;
  };

  const getIsSelected = (value: number) => {
    if (selectedValue?.month === activeMonth && selectedValue?.year === activeYear) {
      if (selectedValue?.day === value) return true;
    }
    return false;
  };

  const handleSelected = (value: number) => {
    setSelectedValue({
      day: value,
      month: activeMonth,
      year: activeYear,
    });
  };

  const getDateInfo = () => {
    let returnValue = [];
    returnValue.push(
      weekShortArray.map((item, key) => (
        <div key={key} className='weekTitle'>
          {item}
        </div>
      ))
    );

    const totalDaysInMonth = getDaysInMonth(activeMonth, activeYear);
    const startWeekDay = getStartWeekDay(activeMonth, activeYear);

    const loopCount = totalDaysInMonth + startWeekDay;

    let tempArray: any = [];

    for (let i = 1; i <= loopCount; i++) {
      if (i <= startWeekDay) {
        tempArray.push(<div key={i} className='weekDays disabled' />);
      } else {
        const tempHolder = i - startWeekDay;
        tempArray.push(
          <div
            key={i}
            onClick={() => {
              if (checkDisabled(tempHolder)) return;
              handleSelected(tempHolder);
            }}
            className={`weekDays 
                        ${getIsToday(tempHolder) ? 'active' : ''}
                        ${getIsSelected(tempHolder) ? 'selected' : ''}
                        ${checkDisabled(tempHolder) ? 'disabled' : ''}`}>
            {tempHolder}
          </div>
        );
      }

      if (tempArray.length === 7) {
        returnValue.push(tempArray);
        tempArray = [];
      }
    }

    if (tempArray.length > 0) {
      returnValue.push(tempArray);
    }

    return returnValue;
  };

  const handleMonthChange = (value: number) => {
    const changeInValue = activeMonth + value;

    if (changeInValue === 13) {
      setActiveMonth(1);
      setActiveYear(activeYear + 1);
    } else if (changeInValue === 0) {
      setActiveMonth(12);
      setActiveYear(activeYear - 1);
    } else {
      setActiveMonth(changeInValue);
    }
  };

  const handleYearChange = (value: number) => {
    const changeInValue = activeYear + value;
    setActiveYear(changeInValue);
  };

  return (
    <div className='datePicker-main'>
      <div className='inputCanvas' onClick={handlePickerVisibility}>
        <div className='datePicker-canvas'>
          <span className='placeholder'> {value ? value : 'Choose a date'}</span>
        </div>
        <div className='datePicker-svg'>
          <CalenderSvg />
        </div>
      </div>

      {datePickerVisibility && (
        <div className='calenderPicker'>
          <div className='calenderHeader'>
            <div className='left'>
              <ChevronLeftDouble onClick={() => handleYearChange(-1)} />
              <ChevronLeft onClick={() => handleMonthChange(-1)} />
            </div>
            <div className='center'>
              {monthLongArray[activeMonth - 1]} {activeYear}
            </div>
            <div className='right'>
              <ChevronRight onClick={() => handleMonthChange(1)} />
              <ChevronRightDouble onClick={() => handleYearChange(1)} />
            </div>
          </div>

          <div className='calenderBody'>
            <div className='date-info'>{getDateInfo().map((item) => item)}</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CalenderPicker;
