import { SIDEBAR_OPEN } from "../types";

export default function sidebar(state = false, action = {}) {
  switch (action.type) {
    case SIDEBAR_OPEN:
      return action.data;
    default:
      return state;
  }
}
