import { CHANGE_USER_LOGIN_FIELD, SAVE_USER } from '../actions/user';

// initialState from user
export const initialState = {
  email: 'acidman@herocorp.io',
  password: 'fructis',
  logged: false,
  token: null,
};

const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case CHANGE_USER_LOGIN_FIELD: {
      console.log(CHANGE_USER_LOGIN_FIELD);
      return {
        ...state,
        [action.name]: action.value,
      };
    }
    case SAVE_USER: {
      return {
        ...state,
        ...action.payload,
      };
    }
    default:
      return state;
  }
};

export default reducer;
