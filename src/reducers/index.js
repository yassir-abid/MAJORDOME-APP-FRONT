import { combineReducers } from 'redux';

// import des reducers
import userReducer from './user';
import signUpReducer from './signUp';
import projectReducer from './project';
import clientReducer from './client';
import interventionReducer from './intervention';
import passwordReducer from './password';
import documentReducer from './document';

const rootReducer = combineReducers({
  user: userReducer,
  signUp: signUpReducer,
  project: projectReducer,
  client: clientReducer,
  intervention: interventionReducer,
  password: passwordReducer,
  document: documentReducer,
});

export default rootReducer;
