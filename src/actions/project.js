// ACTION TYPES
export const CHANGE_PROJECT_FIELD_VALUE = 'CHANGE_PROJECT_FIELD_VALUE';
export const ADD_PROJECT = 'ADD_PROJECT';
export const RESET_PROJECT_FIELD_VALUE = 'RESET_PROJECT_FIELD_VALUE';

// ACTION CREATORS
export const changeProjectFieldValue = (value, key) => ({
  type: CHANGE_PROJECT_FIELD_VALUE,
  value,
  key,
});

export const addProject = (saveProjectToState) => ({
  type: ADD_PROJECT,
  saveProjectToState,
});

export const resetProjectFieldValue = () => ({
  type: RESET_PROJECT_FIELD_VALUE,
});
