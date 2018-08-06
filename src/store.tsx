import { applyMiddleware, createStore } from "redux";
import createSagaMiddleware from 'redux-saga';

import logger from 'redux-logger';

import reducer from './reducers/reducer';
import rootSaga from "./sagas/sagas";

const sagaMiddleware = createSagaMiddleware();

const store = createStore(reducer, applyMiddleware(logger, sagaMiddleware));

sagaMiddleware.run(rootSaga);

export default store;