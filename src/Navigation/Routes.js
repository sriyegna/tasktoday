import React from "react";
import DayGrid from "../Components/FullCalendar/DayGrid";
import ListGrid from "../Components/FullCalendar/ListGrid";

const Routes = [
  { path: "/", content: <ListGrid /> },
  { path: "/listgrid", content: <ListGrid /> },
  { path: "/calendargrid", content: <DayGrid /> },
];

export default Routes;
