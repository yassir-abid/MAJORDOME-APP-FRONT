import { combineReducers } from 'redux';

// import des reducers
import userReducer from './user';
import signUpReducer from './signUp';
import projectReducer from './project';
import addClientReducer from './addClient';

const rootReducer = combineReducers({
  user: userReducer,
  signUp: signUpReducer,
  project: projectReducer,
  addClient: addClientReducer,
});

export default rootReducer;
