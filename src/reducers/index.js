import { combineReducers } from 'redux';

// import des reducers
import userReducer from './user';

const rootReducer = combineReducers({
  user: userReducer,
});

export default rootReducer;
