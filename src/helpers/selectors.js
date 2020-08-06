function getAppointmentsForDay(state, day) {
  let appointmentsForDay = [];
  // get specific day from array
  const resultDay = state.days.filter(d => d.name === day);
   if (resultDay[0] !== undefined) {
     const appointments = Object.values(state.appointments);
     //loop all appointments for this day appointments
     resultDay[0].appointments.forEach(element => {
       appointmentsForDay.push(appointments[element-1]);
     });
   }
  return appointmentsForDay;
}

function getInterview(state, interview) {
  let result = { "student": null, "interviewer": null };
  
  if (!interview) return null;
  
  const { interviewer, student } = interview;
  result["interviewer"] = state.interviewers[interviewer.toString()];
  result["student"] = student;

  return result;
}

module.exports = { getAppointmentsForDay, getInterview }