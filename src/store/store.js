import { combineReducers, createStore } from "redux";
import eventsReducer from "./reducers/events";

export const rootReducer = combineReducers({
  events: eventsReducer,
});

export const reduxStore = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
