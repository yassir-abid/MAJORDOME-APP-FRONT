import { CHANGE_VALUE } from '../actions/intervention';

const initialState = {
  title: '',
  description: '',
  date: '',
  end_date: '',
  status: '',
  comments: '',
  client_id: '',
  project_id: '',
  address_id: '',
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
