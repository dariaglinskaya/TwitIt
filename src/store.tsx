import { applyMiddleware, createStore } from "redux";
import createSagaMiddleware from 'redux-saga';
import logger from 'redux-logger';
import reducer from './reducers/reducer';

const sagaMiddleware = createSagaMiddleware();
const store = createStore(reducer, applyMiddleware(logger, sagaMiddleware));

export default store;