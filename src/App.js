import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Calendar from "./Components/FullCalendar/FullCalendar";

const App = () => {
  return (
    <div className="App">
      <div className="Calendar">
        <Calendar />
      </div>
    </div>
  );
};

export default App;
