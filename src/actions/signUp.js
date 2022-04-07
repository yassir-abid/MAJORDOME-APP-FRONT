// ACTION TYPE
export const CHANGE_USER_LOGIN_FIELD = 'CHANGE_USER_LOGIN_FIELD';
export const SIGNUP = 'SIGNUP';
export const LOGOUT = 'LOGOUT';
export const SAVE_USER = 'SAVE_USER';
export const CHECK_USER = 'CHECK_USER';

// ACTION CREATOR
export const changeUserLoginField = (value, name) => ({
  type: CHANGE_USER_LOGIN_FIELD,
  value,
  name,
});

export const signUp = () => ({
  type: SIGNUP,
});

export const logout = () => ({
  type: LOGOUT,
});

export const saveUser = (payload) => ({
  type: SAVE_USER,
  payload,
});

export const checkUser = () => ({
  type: CHECK_USER,
});
