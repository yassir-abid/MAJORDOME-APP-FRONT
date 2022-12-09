/* eslint-disable max-len */
import { createStore, applyMiddleware, compose } from 'redux';
import userMW from '../middlewares/user';
import signUpMW from '../middlewares/signUp';
import projectMW from '../middlewares/project';
import clientMW from '../middlewares/client';
import interventionMW from '../middlewares/intervention';
import documentMW from '../middlewares/document';
import reducer from '../reducers';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  reducer,
  composeEnhancers(applyMiddleware(userMW, signUpMW, projectMW, clientMW, interventionMW, documentMW)),

);

export default store;
