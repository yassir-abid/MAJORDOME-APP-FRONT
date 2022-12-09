import { CHANGE_INTERVENTION_FIELD_VALUE, RESET_INTERVENTION_FIELD_VALUE } from '../actions/intervention';

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
    case CHANGE_INTERVENTION_FIELD_VALUE: {
      return {
        ...state,
        [action.key]: action.value,
      };
    }
    case RESET_INTERVENTION_FIELD_VALUE: {
      return initialState;
    }
    default:
      return state;
  }
};

export default reducer;
