import { createStore, applyMiddleware, compose } from 'redux';
import authMW from '../middlewares/auth';
import reducer from '../reducers';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  reducer,
  composeEnhancers(applyMiddleware(authMW)),
);

export default store;
