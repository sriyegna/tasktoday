import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import Grid from "../Grid/Grid";
import "./DayGrid.css";

const DayGrid = () => {
  return <Grid gridPlugin={dayGridPlugin} initialView="dayGridMonth" />;
};

export default DayGrid;
