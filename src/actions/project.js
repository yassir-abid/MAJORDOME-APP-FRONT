// ACTION TYPES
export const CHANGE_VALUE = 'CHANGE_VALUE';
export const ADD_PROJECT = 'ADD_PROJECT';
export const SAVE_USER = 'SAVE_USER';
export const CHECK_USER = 'CHECK_USER';

// ACTION CREATORS
export const changeValue = (value, key) => ({
  type: CHANGE_VALUE,
  value,
  key,
});

export const addProject = (saveProjectToState) => ({
  type: ADD_PROJECT,
  saveProjectToState,
});

export const saveUser = (payload) => ({
  type: SAVE_USER,
  payload,
});

export const checkUser = () => ({
  type: CHECK_USER,
});
