import axios from "../axios-firebase";
import { reduxStore } from "../store/store";
import { setEventsStore } from "../store/actions/actions";
import { parseTitle } from "./parseUtils";

export const getEvents = () => {
  const updateStore = (data) => {
    console.log(data);
    let events = [];
    for (let prop in data) {
      events.push(data[prop]);
    }
    reduxStore.dispatch(setEventsStore(events));
  };
  axios
    .get("/days.json")
    .then((response) => updateStore(response.data))
    .catch((error) => console.log("Error: " + JSON.stringify(error)));
};

export const patchEvent = (data, date) => {
  let obj = {};
  obj[date] = {
    title: parseTitle(data),
    date: date,
    content: data,
  };
  axios
    .patch("/days.json", obj)
    .then(() => getEvents())
    .catch((error) => console.log(error));
};
