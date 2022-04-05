import { CHANGE_USER_LOGIN_FIELD } from '../actions/user';

// initialState from user
export const initialState = {
  email: 'test@gmail.com',
  password: 'test',
  logged: false,
  token: null,
};

const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case CHANGE_USER_LOGIN_FIELD: {
      return {
        ...state,
        [action.name]: action.value,
      };
    }
    default:
      return state;
  }
};

export default reducer;
