import axios from 'axios';
import {
  SIGNUP, saveUser, CHECK_USER, signUpErrorMessage,
} from '../actions/signUp';

const signUp = (store) => (next) => (action) => {
  switch (action.type) {
    case SIGNUP: {
      const state = store.getState();

      const signup = async () => {
        try {
          const response = await axios.post('https://majordome-api.herokuapp.com/api/signup', {
            firstname: state.signUp.firstname,
            lastname: state.signUp.lastname,
            email: state.signUp.email,
            password: state.signUp.password,
            passwordConfirm: state.signUp.passwordConfirm,
          });

          localStorage.setItem('token', response.data.token);
          localStorage.setItem('pseudo', `${response.data.firstname} ${response.data.lastname}`);

          store.dispatch(saveUser(response.data));
        } catch (error) {
          store.dispatch(signUpErrorMessage(error.response.data.message || 'connexion impossible'));
          console.error(error.response.data.message
             || error.response.data || error.response || error);
        }
      };

      signup();

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

export default signUp;
