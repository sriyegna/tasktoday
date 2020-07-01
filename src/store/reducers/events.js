import * as actionTypes from "../actions/actions";

const initialState = {
  events: [],
};

const eventsReducer = (state = initialState, action) => {
  if (action.type === actionTypes.SET_EVENTS) {
    return {
      ...state,
      events: action.value,
    };
  }
  return state;
};

export default eventsReducer;
