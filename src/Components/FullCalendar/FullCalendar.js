import React, { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction"; // needed for dayClick

import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";

import axios from "../../axios-firebase";

const Calendar = () => {
  const [open, setOpen] = useState(false);
  const [dialogDate, setDialogDate] = useState("");
  const [date, setDate] = useState("");
  const [textAreaContent, setTextAreaContent] = useState("");

  const events = [
    { title: "event 1", date: "2020-06-10" },
    { title: "event 2", date: "2019-04-02" },
  ];

  const parseDate = (dateStr) => {
    return dateStr.split("00:00:00")[0];
  };

  const handleDateClick = (arg) => {
    setDate(arg.dateStr);
    const parsedDate = parseDate(arg.date.toString());
    setDialogDate(parsedDate);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleTextUpdate = (e) => {
    setTextAreaContent(e.target.value);
  };

  const handleUpdate = () => {
    let data = {};
    data[date] = { content: textAreaContent };
    axios.patch("/days.json", data).catch((error) => console.log(error));
  };

  return (
    <>
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        dateClick={handleDateClick}
        events={events}
      />
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        fullWidth={true}
      >
        <DialogTitle id="form-dialog-title">{dialogDate}</DialogTitle>
        <DialogContent>
          <TextareaAutosize
            aria-label="empty textarea"
            value={textAreaContent}
            onChange={handleTextUpdate}
            rowsMin={10}
            style={{ width: "90%", padding: "4%" }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleUpdate} color="primary">
            Subscribe
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Calendar;
