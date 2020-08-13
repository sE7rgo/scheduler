import { useState, useEffect } from "react";
import axios from "axios";


export default function useApplicationData() {
//set useState hook, default to Monday
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  const setDay = day => setState({ ...state, day });
  //boot bookInterview function, called upon creation of new appointment
  function bookInterview(id, interview) {
    //update appointments with a newly created appointment
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    //updating api with a new appointment
    return axios.put(`/api/appointments/${id}`, {interview})
    .then(() => {
        if (state.appointments[id].interview === null) {
          state.days.forEach((day) => {
            if (day.name === state.day) {
              day.spots--;
            }
          })
        }
        setState((prevState) => ({...prevState, days: state.days, appointments}));
       })
  }

  function cancelInterview(id) {
    //delete of existent interview
    const appointment = {
      ...state.appointments[id],
      interview: null
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    return ( 
      //from api
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
// getting all needed data upon page opening
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