import { combineReducers } from "redux";

import tweets from "./reducer";
import login from "./loginReducer";

export default combineReducers({
  tweets,
  login
});