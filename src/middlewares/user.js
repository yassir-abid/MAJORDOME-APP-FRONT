import axios from 'axios';
import {
  LOGIN, saveUser, CHECK_USER, userErrorMessage,
} from '../actions/user';
import baseUrl from '../utils';

const user = (store) => (next) => (action) => {
  switch (action.type) {
    case LOGIN: {
      const state = store.getState();

      const login = async () => {
        try {
          const response = await axios.post(`${baseUrl}/login`, {
            email: state.user.email,
            password: state.user.password,
          });
          localStorage.setItem('token', response.data.token);
          localStorage.setItem('pseudo', response.data.pseudo);
          if (response.data.picture) {
            localStorage.setItem('avatar', response.data.picture);
          }
          store.dispatch(saveUser(response.data));
        } catch (error) {
          store.dispatch(userErrorMessage(error.response.data.message || 'connexion impossible'));
          console.error(error.response.data.message
             || error.response.data || error.response || error);
        }
      };

      login();

      break;
    }
    case CHECK_USER: {
      const check = async () => {
        const token = localStorage.getItem('token');

        const response = await axios.get(`${baseUrl}/login/checkuser`, {
          headers: {
            authorization: `Bearer ${token}`,
          },
        });

        store.dispatch(saveUser({ ...response.data, token }));
      };

      check();
      break;
    }
    default:
      next(action);
  }
};

export default user;
