import React from "react";

import AppDrawer from "../../Container/AppDrawer/AppDrawer";
import DayGrid from "../../Components/FullCalendar/DayGrid";
import ListGrid from "../../Components/FullCalendar/ListGrid";

const AppContainer = () => {
  return (
    <>
      <AppDrawer>
        <ListGrid />
        <DayGrid />
      </AppDrawer>
    </>
  );
};

export default AppContainer;
