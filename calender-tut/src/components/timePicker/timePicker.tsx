/* eslint-disable @typescript-eslint/no-unused-vars */
import { FC, useEffect, useState } from 'react';
import { TimeSvg } from '../../assets/imagesSvg';
import './timePicker.scss';

interface TimePickerProps {
  handleChange: (key: string, value: string) => void;
  disabledTime: {
    date: string;
    time: { time: string }[];
  }[];
  reset?: boolean;
  activeDate: string;
}

const TimePicker: FC<TimePickerProps> = ({ handleChange, disabledTime, reset, activeDate }) => {
  // console.log('active-date', activeDate);
  // console.log(disabledTime);

  const [value, setValue] = useState('');
  const [timePickerVisibility, setTimePickerVisibility] = useState(false);

  const handlePickerVisibility = () => {
    if (!activeDate) {
      alert('please select a date');
      return;
    }
    setTimePickerVisibility(!timePickerVisibility);
  };

  const resetCallback = () => {
    setValue('');
  };

  useEffect(() => {
    if (reset) {
      resetCallback();
    }
  }, [reset]);

  const timeSlots = {
    start: 8,
    end: 18,
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
          className={`time-slots ${checkDisabled(i, disabledSlots) ? 'disabled' : ''}`}
          key={i}
          onClick={() => handleTimeSelection(i)}>
          {i}
        </div>
      );
    }
    return _timeSlots;
  };

  useEffect(() => {
    handleChange('time', value);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  const handleTimeSelection = (_value: string) => {
    setValue(_value);
    setTimePickerVisibility(false);
  };

  return (
    <div className='timePicker-main'>
      <div className='inputCanvas' onClick={handlePickerVisibility}>
        <div className='timePicker-canvas'>
          <span className='placeholder'> {value ? value : 'Choose a time'}</span>
        </div>
        <div className='timePicker-svg'>
          <TimeSvg />
        </div>
      </div>

      {timePickerVisibility && <div className='timePicker'>{getTimeSlots()}</div>}
    </div>
  );
};

export default TimePicker;
