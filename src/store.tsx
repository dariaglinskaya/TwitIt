import { applyMiddleware, createStore } from "redux";
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import reducer from './reducers/combineReducers';

const store = createStore(reducer, applyMiddleware(logger, thunk));
export default store;