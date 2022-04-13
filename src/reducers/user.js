import {
  CHANGE_USER_LOGIN_FIELD,
  SAVE_USER,
  LOGOUT,
  USER_ERROR_MESSAGE,
} from '../actions/user';

export const initialState = {
  email: '',
  password: '',
  logged: false,
  pseudo: '',
  token: null,
  errorMessage: '',
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
      // clean localStorage to logout
      localStorage.clear();
      // spread of initialState for logout
      return {
        ...initialState,
      };
    }
    case USER_ERROR_MESSAGE: {
      return {
        ...state,
        errorMessage: action.errorMessage,
      };
    }
    default:
      return state;
  }
};

export default reducer;
