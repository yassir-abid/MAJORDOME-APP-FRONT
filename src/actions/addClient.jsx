// ACTION TYPES
export const CHANGE_VALUE = 'CHANGE_VALUE';
export const ADD_CLIENT = 'ADD_CLIENT';
export const SAVE_USER = 'SAVE_USER';
export const CHECK_USER = 'CHECK_USER';

// ACTION CREATORS
export const changeValue = (value, key) => ({
  type: CHANGE_VALUE,
  value,
  key,
});

export const addClient = () => ({
  type: ADD_CLIENT,
});

export const saveUser = (payload) => ({
  type: SAVE_USER,
  payload,
});

export const checkUser = () => ({
  type: CHECK_USER,
});
