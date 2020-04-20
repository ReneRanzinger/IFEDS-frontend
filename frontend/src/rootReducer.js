import { combineReducers } from "redux";

import user from "./reducers/user";
import error from "./reducers/errorHandler";
import setting from "./reducers/applicationSettings";
import sidebar from "./reducers/sidebarOpen";


export default combineReducers({
  user, error, setting, sidebar
});
