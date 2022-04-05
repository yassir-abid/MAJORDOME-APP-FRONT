// ACTION TYPE
export const CHANGE_USER_LOGIN_FIELD = 'CHANGE_USER_LOGIN_FIELD';

// ACTION CREATOR
export const changeUserLoginField = (value, name) => ({
  type: CHANGE_USER_LOGIN_FIELD,
  value,
  name,
});
