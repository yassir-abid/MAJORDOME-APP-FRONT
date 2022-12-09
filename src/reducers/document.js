import { CHANGE_DOCUMENT_FIELD_VALUE, RESET_DOCUMENT_FIELD_VALUE } from '../actions/document';

const initialState = {
  title: '',
  description: '',
  file: '',
  clientID: '',
  projectID: '',
  interventionID: '',
};

const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case CHANGE_DOCUMENT_FIELD_VALUE: {
      return {
        ...state,
        [action.key]: action.value,
      };
    }
    case RESET_DOCUMENT_FIELD_VALUE: {
      return initialState;
    }
    default:
      return state;
  }
};

export default reducer;
