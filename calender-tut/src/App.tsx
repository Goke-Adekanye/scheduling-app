/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from "react";
import axios from "axios";
import "./App.scss";
import CalenderPicker from "./components/calendar";
import TimePicker from "./components/time";
import BouncingDotsLoader from "./components/bouncingDots";
import { TimeSvg } from "./assets/imagesSvg";

const baseUrl = "http://localhost:5000/api/schedule";
const postScheduleUrl = "/post-schedule";
const getScheduleUrl = "/get-schedule/";

function App() {
  const initializeDay = () => {
    const today = new Date();
    return `${today.getFullYear()}:${today.getMonth() + 1}`;
  };

  const [loading, setLoading] = useState(false);
  const [reset, setReset] = useState(false);
  const [dateChange, setDateChange] = useState(initializeDay());
  const [schedule, setSchedule] = useState({
    date: "",
    time: "",
  });

  const [disabledObj, setDisabledObj] = useState({
    disabled_days: [],
    disabled_time_slots: [],
    // disabled_time_slots: [{ date: '2022-10-17', time: [{ time: '10:00' }] }],
  });

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
    setSchedule({
      date: "",
      time: "",
    });
  }, [reset]);

  // console.log(schedule);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!schedule.date || !schedule.time) {
      alert("select date and time");
      return;
    }

    setLoading(true);
    const response = await axios
      .post(baseUrl + postScheduleUrl, schedule)
      .catch((err) => console.log(err));
    if (response) {
      getConfig();
    }
    setReset(true);
    setLoading(false);
  };

  const handleDateChange = (date: string) => {
    setDateChange(date);
  };

  return (
    <div className="home">
      <div className="main-container">
        <a href="##" target="_blank" className="schedule-emblem">
          <div className="branding">
            <div className="text-one">powered by</div>
            <div className="text-two">Scheduly</div>
          </div>
        </a>

        <div className="top-container">
          <div className="inner">
            <div className="name">Usman Chukwuemeka</div>
            <h1 className="header">60 Minute Meeting</h1>
            <div className="time-indicator">
              <div className="indicator-details">
                <span className="time-svg">
                  <TimeSvg />
                </span>
                <span className="text">60 min</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bottom-container">
          <h2>Select a Date & Time</h2>

          <form className="schedule-form" onSubmit={handleSubmit}>
            {loading && <BouncingDotsLoader />}
            <div className="inner">
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
            </div>

            <div className="btn-container">
              <button type="submit">Submit</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
