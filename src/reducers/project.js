import { CHANGE_PROJECT_FIELD_VALUE, RESET_PROJECT_FIELD_VALUE } from '../actions/project';

const initialState = {
  title: '',
  description: '',
  comments: '',
  client_id: '',
};

const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case CHANGE_PROJECT_FIELD_VALUE: {
      return {
        ...state,
        [action.key]: action.value,
      };
    }
    case RESET_PROJECT_FIELD_VALUE: {
      return initialState;
    }
    default:
      return state;
  }
};

export default reducer;
