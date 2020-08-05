import React from "react";
import "components/InterviewerList.scss";
import InterviewerListItem from "components/InterviewerListItem";

export default function InterviewerList(props) {
  const list = props.interviewers.map((interviewer) => {
    const { id, name, avatar } = interviewer;
    
    return (
      <InterviewerListItem
        key={id}
        name={name}
        avatar={avatar}
        selected={id === props.value}
				setInterviewer={event => {
          props.setInterviewer(id)
          console.log('clicked inter. item.id', id)
          }
        }
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