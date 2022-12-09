// ACTION TYPES
export const CHANGE_CLIENT_FIELD_VALUE = 'CHANGE_CLIENT_FIELD_VALUE';
export const RESET_CLIENT_FIELD_VALUE = 'RESET_CLIENT_FIELD_VALUE';
export const ADD_CLIENT = 'ADD_CLIENT';

// ACTION CREATORS
export const changeClientFieldValue = (value, key) => ({
  type: CHANGE_CLIENT_FIELD_VALUE,
  value,
  key,
});

export const addClient = (saveClientToState) => ({
  type: ADD_CLIENT,
  saveClientToState,
});

export const resetClientFieldValue = () => ({
  type: RESET_CLIENT_FIELD_VALUE,
});
