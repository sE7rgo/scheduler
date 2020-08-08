import React, { useState } from 'react';
import Button from "components/Button";
import InterviewerList from "components/InterviewerList";
import Show from "components/Appointment/Show";

export default function Form(props) {
/* creating hooks */
  const [name, setName] = useState(props.name || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);


  const reset = () => {
     return [setName(""), setInterviewer(null)];
  };

  const cancel = () => {
    return [reset(), props.onCancel()];
  };



  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form 
          autoComplete="off"
          onSubmit={event => event.preventDefault()}
        >
          <input
            className="appointment__create-input text--semi-bold"
            name={props.name}
            val={name}
            type="text"
            placeholder="Enter Student Name"
            onChange={(event) => setName(event.target.value)}
          />
        </form>
        <InterviewerList
          interviewers={props.interviewers} 
          value={interviewer} 
          setInterviewer={setInterviewer} />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button
            danger
            onClick={cancel}
          >
            Cancel
          </Button>
          <Button 
            confirm
            onClick={() => props.onSave(name, interviewer)}
          >
            Save
          </Button>
        </section>
      </section>
    </main>
  )
} 