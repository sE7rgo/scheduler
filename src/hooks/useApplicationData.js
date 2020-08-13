import react, { useState, useEffect } from "react";
import axios from "axios";


export default function useApplicationData() {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  const setDay = day => setState({ ...state, day });
  
  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    return axios.put(`/api/appointments/${id}`, {interview})
    .then(() => {
        let daysList = state.days;
        daysList.forEach((day) => {
          if (day.name === state.day) {
            day.spots--;
          } 
        })
        setState((prevState) => ({...prevState, days: daysList, appointments}));
       })
  }

  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    return ( 
      Promise.resolve(axios.delete(`/api/appointments/${id}`))
      .then(() => {
        let daysList = state.days;
        daysList.forEach((day) => {
          if (day.name === state.day) {
            day.spots++;
          } 
        })
        setState((prevState) => ({...prevState, days: daysList, appointments}));
      })
    )
  }

  useEffect(() => {

    Promise.all([
      Promise.resolve(axios.get('/api/days')),
      Promise.resolve(axios.get('/api/appointments')),
      Promise.resolve(axios.get('/api/interviewers'))
    ]).then((all) => {
      setState(prev => 
        ({ 
          day: "Monday",
          days: all[0].data, 
          appointments: all[1].data,
          interviewers: all[2].data
        }));
      })
  },[])

  return { state, setDay, bookInterview, cancelInterview }
}