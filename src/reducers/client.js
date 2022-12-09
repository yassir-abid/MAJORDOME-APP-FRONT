import { CHANGE_CLIENT_FIELD_VALUE, RESET_CLIENT_FIELD_VALUE } from '../actions/client';

const initialState = {
  firstname: '',
  lastname: '',
  email: '',
  phone: '',
  clientComments: '',
  clientId: '',
  number: '',
  street: '',
  postal_code: '',
  city: '',
  addressComments: '',
};

const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case CHANGE_CLIENT_FIELD_VALUE: {
      return {
        ...state,
        [action.key]: action.value,
      };
    }
    case RESET_CLIENT_FIELD_VALUE: {
      return initialState;
    }
    default:
      return state;
  }
};

export default reducer;
