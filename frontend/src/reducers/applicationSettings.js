import { APPLICATION_SETTING } from "../types";

export default function setting(state = [], action = {}) {
  switch (action.type) {
    case APPLICATION_SETTING:
      return action.data;
    default:
      return state;
  }
}
