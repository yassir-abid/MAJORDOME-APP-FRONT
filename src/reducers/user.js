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
  avatar: '',
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
        ...action.payload,
      };
    }
    case LOGOUT: {
      localStorage.clear();
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
