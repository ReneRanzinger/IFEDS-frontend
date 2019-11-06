import { combineReducers } from "redux";

import user from "./reducers/user";
import error from "./reducers/errorHandler";


export default combineReducers({
  user,
  error
});
