import { combineReducers } from "redux";

import user from "./reducers/user";
import error from "./reducers/errorHandler";
import setting from "./reducers/applicationSettings";


export default combineReducers({
  user,
  error,setting
});
