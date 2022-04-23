import { combineReducers } from 'redux';

// import des reducers
import userReducer from './user';
import signUpReducer from './signUp';
import projectReducer from './project';
import addClientReducer from './addClient';
import interventionReducer from './intervention';
import passwordReducer from './password';

const rootReducer = combineReducers({
  user: userReducer,
  signUp: signUpReducer,
  project: projectReducer,
  addClient: addClientReducer,
  intervention: interventionReducer,
  password: passwordReducer,
});

export default rootReducer;
