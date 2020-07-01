import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction"; // needed for dayClick
import "./FullCalendar.css";

import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";

import axios from "../../axios-firebase";
import { useDispatch, useSelector } from "react-redux";
import { setEventsStore } from "../../store/actions/actions";

const Calendar = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [dialogDate, setDialogDate] = useState("");
  const [date, setDate] = useState("");
  const [textAreaContent, setTextAreaContent] = useState("");

  const events = useSelector((state) => state.events.events);

  const getEvents = () => {
    const updateStore = (data) => {
      console.log(data);
      let events = [];
      for (let prop in data) {
        const obj = {
          title: data[prop]["content"].substr(0, 60) + "...",
          content: data[prop]["content"],
          date: prop,
        };
        events.push(obj);
      }
      dispatch(setEventsStore(events));
    };
    axios
      .get("/days.json")
      .then((response) => updateStore(response.data))
      .catch((error) => console.log("text" + JSON.stringify(error)));
  };

  useEffect(() => {
    getEvents();
  }, []);

  const parseDate = (dateStr) => {
    return dateStr.split("00:00:00")[0];
  };

  const handleDateClick = (arg) => {
    const date = arg.dateStr;
    setDate(date);
    const parsedDate = parseDate(arg.date.toString());
    setDialogDate(parsedDate);
    const selectedEvent = events.filter((e) => e.date === date);
    selectedEvent.length > 0
      ? setTextAreaContent(selectedEvent[0].content)
      : setTextAreaContent("");
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
    axios
      .patch("/days.json", data)
      .then(() => getEvents())
      .catch((error) => console.log(error));
    handleClose();
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
