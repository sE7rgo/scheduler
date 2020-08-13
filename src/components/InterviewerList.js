import React from "react";
import PropTypes from "prop-types";

import "components/InterviewerList.scss";

import InterviewerListItem from "components/InterviewerListItem";

export default function InterviewerList(props) {

  //check if prop passed in this component is not other then:
  InterviewerList.propTypes = {
    value: PropTypes.number,
    setInterviewer: PropTypes.func.isRequired
  };
//render InterviewerListItem
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