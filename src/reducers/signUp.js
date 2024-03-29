import {
  CHANGE_USER_SIGNUP_FIELD,
  SAVE_USER,
  LOGOUT,
  SIGNUP_ERROR_MESSAGE,
} from '../actions/signUp';

export const initialState = {
  firstname: '',
  lastname: '',
  email: '',
  password: '',
  passwordConfirm: '',
  logged: false,
  pseudo: '',
  token: null,
  signUperrorMessage: '',
};

const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case CHANGE_USER_SIGNUP_FIELD: {
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
    case SIGNUP_ERROR_MESSAGE: {
      return {
        ...state,
        signUperrorMessage: action.signUperrorMessage,
      };
    }
    default:
      return state;
  }
};

export default reducer;
