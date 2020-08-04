import React from "react";
import className from "classnames";
import "components/DayListItem.scss"

export default function DayListItem(props) {

  console.log(props)
  let dayClass = className("day-list__item", 
    {
      "day-list__item--selected": props.selected,
      "day-list__item--full": props.spots === 0
    })

  return (
    <li
      onClick={() => props.setDay(props.name)}
      className={dayClass}
    >
      <h2>{props.name}</h2> 
      <h3>{props.spots}</h3>
    </li>
  );
}