import React from "react";
import className from "classnames";
import "components/DayListItem.scss"

export default function DayListItem(props) {

  console.log(props)
  let buttonClass = className("DayListItem", 
    {
      "DayListItem--clickable": props.clickable
    })
  return (
    <li
      onClick={() => props.setDay(props.name)}
    >
      <h2 className={buttonClass}>{props.name}</h2> 
      <h3 className="text--light">{props.spots}</h3>
    </li>
  );
}