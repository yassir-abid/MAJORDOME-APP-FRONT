/* eslint-disable max-len */
import { createStore, applyMiddleware, compose } from 'redux';
import authMW from '../middlewares/auth';
import signUpMW from '../middlewares/signUp';
import projectMW from '../middlewares/project';
import addClientMW from '../middlewares/addClient';
import interventionMW from '../middlewares/intervention';
import documentMW from '../middlewares/document';
import reducer from '../reducers';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  reducer,
  composeEnhancers(applyMiddleware(authMW, signUpMW, projectMW, addClientMW, interventionMW, documentMW)),

);

export default store;
