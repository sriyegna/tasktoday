import React from "react";
import FullCalendar from "@fullcalendar/react";
import listPlugin from "@fullcalendar/list";
import Grid from "../Grid/Grid";
import "./ListGrid.css";

const ListGrid = () => {
  return <Grid gridPlugin={listPlugin} initialView="listMonth" />;
};

export default ListGrid;
