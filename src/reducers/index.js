import { combineReducers } from 'redux';

// import des reducers
import userReducer from './user';
import signUpReducer from './signUp';
import projectReducer from './project';

const rootReducer = combineReducers({
  user: userReducer,
  signUp: signUpReducer,
  project: projectReducer,
});

export default rootReducer;
