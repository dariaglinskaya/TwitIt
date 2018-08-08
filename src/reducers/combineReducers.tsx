import { combineReducers } from "redux";

import tweets from "./tweetsReducer";
import authentication from './authReducer';

export default combineReducers({
  tweets,
  authentication
});