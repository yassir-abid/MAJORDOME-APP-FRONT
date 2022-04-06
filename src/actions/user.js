// ACTION TYPE
export const CHANGE_USER_LOGIN_FIELD = 'CHANGE_USER_LOGIN_FIELD';
export const LOGIN = 'LOGIN';
export const SAVE_USER = 'SAVE_USER';

// ACTION CREATOR
export const changeUserLoginField = (value, name) => ({
  type: CHANGE_USER_LOGIN_FIELD,
  value,
  name,
});

export const login = () => ({
  type: LOGIN,
});

export const saveUser = (payload) => ({
  type: SAVE_USER,
  payload,
});
