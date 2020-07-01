export const SET_EVENTS = "SET_EVENTS";

export const setEventsStore = (events) => {
  return {
    type: SET_EVENTS,
    value: events,
  };
};
