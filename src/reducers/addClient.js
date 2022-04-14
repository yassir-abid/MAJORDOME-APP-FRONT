import { CHANGE_VALUE } from '../actions/addClient';

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
    case CHANGE_VALUE: {
      return {
        ...state,
        [action.key]: action.value,
      };
    }
    default:
      return state;
  }
};

export default reducer;
