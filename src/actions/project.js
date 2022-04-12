// ACTION TYPES
export const CHANGE_VALUE = 'CHANGE_INPUT_VALUE';
export const ADD_PROJECT = 'ADD_PROJECT';
export const SAVE_PROJECT = 'SAVE_PROJECT';
export const CHECK_USER = 'CHECK_USER';

// ACTION CREATORS
export const changeValue = (value, key) => ({
  type: CHANGE_VALUE,
  value,
  key,
});

export const addProject = () => ({
  type: ADD_PROJECT,
});

export const saveProject = (payload) => ({
  type: SAVE_PROJECT,
  payload,
});

export const checkUser = () => ({
  type: CHECK_USER,
});
