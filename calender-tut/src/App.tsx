/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from 'react';
import axios from 'axios';
import './App.scss';
import CalenderPicker from './components/calenderPicker/calenderPicker';
import TimePicker from './components/timePicker/timePicker';

const baseUrl = 'http://localhost:5000/api/schedule';
const postScheduleUrl = '/post-schedule';
const getScheduleUrl = '/get-schedule/';

function App() {
  const initializeDay = () => {
    const today = new Date();
    return `${today.getFullYear()}:${today.getMonth() + 1}`;
  };

  const [loading, setLoading] = useState(false);
  const [reset, setReset] = useState(false);
  const [dateChange, setDateChange] = useState(initializeDay());
  const [schedule, setSchedule] = useState({
    date: '',
    time: '',
  });

  const [disabledObj, setDisabledObj] = useState({
    disabled_days: [],
    disabled_time_slots: [],
    // disabled_time_slots: [{ date: '2022-10-17', time: [{ time: '10:00' }] }],
  });

  console.log(disabledObj);

  const handleChange = (key: string, value: string) => {
    setSchedule({
      ...schedule,
      [key]: value,
    });
  };

  const getConfig = async () => {
    const response = await axios
      .get(baseUrl + getScheduleUrl + dateChange)
      .catch((err) => console.log(err));
    if (response) {
      setDisabledObj(response.data);
    }
  };

  useEffect(() => {
    getConfig();
  }, [dateChange]);

  useEffect(() => {
    setReset(false);
  }, [reset]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!schedule.date || !schedule.time) {
      alert('select date and time');
      return;
    }

    setLoading(true);
    const response = await axios
      .post(baseUrl + postScheduleUrl, schedule)
      .catch((err) => console.log(err));
    if (response) {
      alert(response.data);
    }
    setReset(true);
    setLoading(false);
  };

  const handleDateChange = (date: string) => {
    setDateChange(date);
  };

  // console.log('schedule', schedule);

  return (
    <div className='mainContainer'>
      <form className='scheduleForm' onSubmit={handleSubmit}>
        <CalenderPicker
          handleChange={handleChange}
          disabledDays={disabledObj.disabled_days}
          reset={reset}
          handleDateChange={handleDateChange}
        />
        <TimePicker
          handleChange={handleChange}
          disabledTime={disabledObj.disabled_time_slots}
          reset={reset}
          activeDate={schedule.date}
        />
        <button type='submit'>{loading ? 'Loading' : 'Submit'}</button>
      </form>
    </div>
  );
}

export default App;
