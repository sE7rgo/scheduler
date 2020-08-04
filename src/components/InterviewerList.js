import React from "react";
import "components/InterviewerList.scss";
import InterviewerListItem from "components/InterviewerListItem";

export default function InterviewerList(props) {
  console.log(props)
  const list = props.interviewers.map((interviewer) => {
    const { id, name, avatar } = interviewer;
    return (
      <InterviewerListItem
        id={id}
        name={name}
        avatar={avatar}
        selected={id === props.interviewer}
				setInterviewer={() => props.setInterviewer(id)}
      />
    )
  })
  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">
        {list}
      </ul>
    </section>
  )
}