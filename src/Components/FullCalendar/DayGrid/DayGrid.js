import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction"; // needed for dayClick
import "./DayGrid.css";

import { parseDate } from "../../../utils/parseUtils";
import { getEvents, patchEvent } from "../../../utils/eventsUtils";

import { useSelector } from "react-redux";

import RichTextEditor from "../../RichTextEditor/RichTextEditor";

const DayGrid = ({ classes }) => {
  const [open, setOpen] = useState(false);
  const [dialogDate, setDialogDate] = useState("");
  const [date, setDate] = useState("");
  const [textAreaContent, setTextAreaContent] = useState();

  const events = useSelector((state) => state.events.events);

  useEffect(() => {
    getEvents();
  }, []);

  const handleDateClick = (arg) => {
    const date = arg.dateStr;
    const parsedDate = parseDate(arg.date.toString());
    handleClick(date, parsedDate);
  };

  const handleEventClick = (arg) => {
    const date = arg.event.startStr;
    const parsedDate = parseDate(arg.event.start.toString());
    handleClick(date, parsedDate);
  };

  const handleClick = (date, parsedDate) => {
    setDate(date);
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

  const handleUpdate = (data) => {
    patchEvent(data, date);
    handleClose();
  };

  return (
    <>
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        dateClick={handleDateClick}
        eventClick={handleEventClick}
        events={events}
      />
      <RichTextEditor
        open={open}
        dialogDate={dialogDate}
        textAreaContent={textAreaContent}
        handleClose={handleClose}
        handleUpdate={handleUpdate}
      />
    </>
  );
};

export default DayGrid;
