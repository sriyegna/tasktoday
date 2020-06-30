import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction"; // needed for dayClick

const Calendar = () => {
  const events = [
    { title: "event 1", date: "2020-06-10" },
    { title: "event 2", date: "2019-04-02" },
  ];
  const handleDateClick = (arg) => {
    console.log(arg);
  };
  return (
    <FullCalendar
      plugins={[dayGridPlugin, interactionPlugin]}
      initialView="dayGridMonth"
      dateClick={handleDateClick}
      events={events}
    />
  );
};

export default Calendar;
