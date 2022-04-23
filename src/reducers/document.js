import { CHANGE_VALUE } from '../actions/document';

const initialState = {
  title: '',
  description: '',
  path: '',
  client_id: '',
  project_id: '',
  intervention_id: '',
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
