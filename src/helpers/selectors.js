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
function getInterviewersForDay (state, day) {
  let interviewersForDay = [];
  //get specific day
  const resultDay = state.days.filter(d => d.name === day);
  if (resultDay[0] !== undefined) {
    const interviewers = Object.values(state.interviewers);
          //loop all interviewers for this day 
    resultDay[0].interviewers.forEach(element => {
      interviewersForDay.push(interviewers[element-1]);
    });
  }
  return interviewersForDay;
}

function getInterview(state, interview) {
  let result = { "student": null, "interviewer": null };
  
  if (!interview) {
    return null;
  } else {
      const { interviewer, student } = interview;

      if (interviewer) {
        result["interviewer"] = state.interviewers[interviewer.toString()];
        result["student"] = student;
      }

      return result;
  }
};

module.exports = { getAppointmentsForDay, getInterview, getInterviewersForDay };