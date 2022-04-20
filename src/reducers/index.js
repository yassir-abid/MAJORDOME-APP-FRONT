import { combineReducers } from 'redux';

// import des reducers
import userReducer from './user';
import signUpReducer from './signUp';
import projectReducer from './project';
import addClientReducer from './addClient';
import interventionReducer from './intervention';

const rootReducer = combineReducers({
  user: userReducer,
  signUp: signUpReducer,
  project: projectReducer,
  addClient: addClientReducer,
  intervention: interventionReducer,
});

export default rootReducer;
