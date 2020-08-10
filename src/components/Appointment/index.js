import React from "react";
import "components/Appointment/styles.scss";

import useVisualMode from "hooks/useVisualMode";

import Header from "components/Appointment/Header";
import Show from "components/Appointment/Show";
import Empty from "components/Appointment/Empty";
import Form from "components/Appointment/Form";
import Status from "components/Appointment/Status";
import Confirm from "components/Appointment/Confirm";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING"
const CONFIRM = "CONFIRM";
const EDIT = "EDIT";

export default function Appointment(props) {
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING);
    Promise.resolve(props.bookInterview(props.id, interview))
    .then(() => transition(SHOW));
  }

  function confirm() {
    transition(CONFIRM)
  }

  function deleteAppointment(id) {
    transition(DELETING)
    Promise.resolve(props.cancelInterview(id))
    .then(() => transition(EMPTY));
  }

  function editAppointment() {
    transition(CREATE);
  }

  return (
    <article className="appointment">
      <Header
        time={props.time}
      />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onCancel={confirm}
          onEdit={editAppointment}
        />
      )}
      {mode === CREATE && 
        <Form
          name={props.interview.student}
          interviewer={props.interview.interviewer.id}
          interviewers={props.interviewers}
          onSave={(name, interviewer) => {
            save(name, interviewer);
          }}
        />
      }
      {mode === SAVING && 
        <Status 
          message={"Saving"} 
        />
      }
      {mode === DELETING && 
        <Status 
          message={"Deleting"} 
        />
      }
      {mode === CONFIRM && (
        <Confirm
          onCancel={() => {
            transition(SHOW);
          }}
          onConfirm={() => {
            deleteAppointment(props.id)
          }}
        />
      )}
    </article>
  )
}