import { createStore, applyMiddleware, compose } from 'redux';
import authMW from '../middlewares/auth';
import signUpMW from '../middlewares/signUp';
import addClientMW from '../middlewares/addClient';
import reducer from '../reducers';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  reducer,
  composeEnhancers(applyMiddleware(authMW, signUpMW, addClientMW)),
);

export default store;
