import axios from 'axios';
import { SIGNUP, saveUser, CHECK_USER } from '../actions/signUp';

const signUp = (store) => (next) => (action) => {
  switch (action.type) {
    case SIGNUP: {
      // current state
      const state = store.getState();

      const signup = async () => {
        try {
          const response = await axios.post('http://localhost:3001/signup', {
            lastName: state.signUp.lastName,
            firstName: state.signUp.firstName,
            email: state.signUp.email,
            password: state.signUp.password,
          });

          // stock token to localStorage
          localStorage.setItem('token', response.data.token);

          store.dispatch(saveUser(response.data));
        } catch (error) {
          console.log(error);
        }
      };

      signup();

      break;
    }
    case CHECK_USER: {
      const check = async () => {
        const token = localStorage.getItem('token');

        const response = await axios.get('http://localhost:3001/checkUser', {
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

export default signUp;
