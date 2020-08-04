import React from "react";
import "components/InterviewerList.scss";

export default function InterviewerList(props) {
  // const list = props.interviewers.map((interviewer) => {
  //   return (
  //     <InterviewerListItem

  //     />
  //   )
  // })
  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list"></ul>
    </section>
  )
}