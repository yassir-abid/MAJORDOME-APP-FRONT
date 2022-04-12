import { CHANGE_VALUE } from '../actions/project';

const initialState = {
  title: '',
  description: '',
  comments: '',
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
