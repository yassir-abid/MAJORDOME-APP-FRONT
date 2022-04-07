import { combineReducers } from 'redux';

// import des reducers
import userReducer from './user';
import signUpReducer from './signUp';

const rootReducer = combineReducers({
  user: userReducer,
  signUp: signUpReducer,
});

export default rootReducer;
