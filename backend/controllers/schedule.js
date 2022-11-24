const Schedule = require('../models/schedule');

const postSchedule = async (req, res) => {
  const date_arr = req.body.date.split('-');
  const yearMonth = `${date_arr[0]}-${date_arr[1]}`;
  const day = date_arr[2];

  let tempObj = {
    ...req.body,
    yearMonth,
    day,
  };

  const schedule = await Schedule.create(tempObj);
  res.status(201).json('Schedule created successfully');
};

const getSchedule = async (req, res) => {
  const active_date = req.params.active_date;

  let year, month;
  const active_date_arr = active_date.split(':');

  if (active_date_arr.length === 2) {
    year = active_date_arr[0];
    month = active_date_arr[1];
  } else return res.status(400).json('expected format is yyyy:mm');

  const fullMonthFormat = month.toString().length < 2 ? `0${month}` : month;

  let schedules_within_active_month = await Schedule.find({ yearMonth: `${year}-${fullMonthFormat}` });
  // console.log('schedules_within_active_month', schedules_within_active_month);

  let disabled_days = [];
  let disabled_time_slots = [];

  for (let t in schedules_within_active_month) {
    const time_query = await Schedule.find({ date: schedules_within_active_month[t].date });
    let t_obj = {
      date: schedules_within_active_month[t].date,
      time: time_query.map((t) => ({ time: t.time })),
    };

    if (time_query.length === 9) {
      disabled_days.push(schedules_within_active_month[t].day);
    } else {
      disabled_time_slots.push(t_obj);
    }
  }
  // res.status(200).json({ time_query });
  res.status(200).json({ disabled_days, disabled_time_slots });
};

module.exports = { postSchedule, getSchedule };
