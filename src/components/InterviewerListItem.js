import React from "react";
import className from "classnames";
import "components/InterviewerListItem.scss";

export default function InterviewerListItem(props) {

    const ItemClass = className("interviewers__item",
      {
        "interviewers__item--selected": props.selected
      }
    )
  return (
    <li
      key={props.id}
      className={ItemClass} 
      onClick={props.setInterviewer}
    >
        <img
          className='interviewers__item-image'
          src={props.avatar}
          alt={props.name}
        />
    {props.selected && props.name}
    </li>
  )
}