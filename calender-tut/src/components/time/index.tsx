/* eslint-disable @typescript-eslint/no-unused-vars */
import { FC, useEffect, useState } from "react";
import "./time.scss";

interface TimePickerProps {
  handleChange: (key: string, value: string) => void;
  disabledTime: {
    date: string;
    time: { time: string }[];
  }[];
  reset?: boolean;
  activeDate: string;
}

const TimePicker: FC<TimePickerProps> = ({
  handleChange,
  disabledTime,
  reset,
  activeDate,
}) => {
  // console.log("active-date", activeDate);

  const [value, setValue] = useState("");
  const [selectedValue, setSelectedValue] = useState("");

  const resetCallback = () => {
    setValue("");
  };

  useEffect(() => {
    if (reset) {
      resetCallback();
    }
  }, [reset]);

  useEffect(() => {
    if (activeDate) {
      setSelectedValue("");
      setValue("");
    }
  }, [activeDate]);

  const timeSlots = {
    start: 8,
    end: 16,
  };

  const checkDisabled = (value: string, _timeSlots: string[]): boolean => {
    if (_timeSlots.includes(value)) return true;
    return false;
  };

  const getTimeSlots = () => {
    const _timeSlots: any[] = [];
    const formattedTimeSlots = [];
    for (let i = timeSlots.start; i <= timeSlots.end; i++) {
      formattedTimeSlots.push(`${i}:00`);
    }

    const disabledSlots: any[] = [];
    const _tempTimeSlots = disabledTime.find((i) => i.date === activeDate);
    if (_tempTimeSlots) {
      for (let i of _tempTimeSlots.time) {
        disabledSlots.push(i.time);
      }
    }

    for (let i of formattedTimeSlots) {
      _timeSlots.push(
        <div
          className={`list-item ${
            checkDisabled(i, disabledSlots) && "disabled"
          } ${selectedValue === i && "selected"}`}
          key={i}
          onClick={() => {
            handleTimeSelection(i);
            setSelectedValue(i);
          }}
        >
          {i}
        </div>
      );
    }
    return _timeSlots;
  };

  useEffect(() => {
    handleChange("time", value);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  const handleTimeSelection = (_value: string) => {
    setValue(_value);
  };

  return (
    <div className={`timePicker-main ${activeDate && "show"}`}>
      <div className="picker-inner">
        <div className="slot-list">{getTimeSlots()}</div>
      </div>
    </div>
  );
};

export default TimePicker;
