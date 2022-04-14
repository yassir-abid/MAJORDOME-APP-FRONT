import axios from 'axios';
import { LOGIN, saveUser, CHECK_USER } from '../actions/user';

const auth = (store) => (next) => (action) => {
  switch (action.type) {
    case LOGIN: {
      // current state
      const state = store.getState();

      const login = async () => {
        try {
          const response = await axios.post('https://majordome-api.herokuapp.com/api/login', {
            email: state.user.email,
            password: state.user.password,
          });

          // stock token to localStorage
          localStorage.setItem('token', response.data.token);

          store.dispatch(saveUser(response.data));
        } catch (error) {
          console.log(error);
        }
      };

      login();

      break;
    }
    case CHECK_USER: {
      const check = async () => {
        const token = localStorage.getItem('token');

        const response = await axios.get('https://majordome-api.herokuapp.com/api/login/checkuser', {
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

export default auth;
