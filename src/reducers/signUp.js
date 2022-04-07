import {
  CHANGE_USER_LOGIN_FIELD,
  SAVE_USER,
  LOGOUT,
} from '../actions/signUp';

export const initialState = {
  lastName: 'jerome',
  firstName: 'ttesf',
  email: 'test@test',
  password: '123',
  logged: false,
  pseudo: '',
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
    case SAVE_USER: {
      return {
        ...state,
        // logged: action.payload.logged,
        // pseudo: action.payload.pseudo,
        // token: action.payload.token,
        ...action.payload,
      };
    }
    case LOGOUT: {
      // spread of initialState for logout
      return {
        ...initialState,
      };
    }
    default:
      return state;
  }
};

export default reducer;