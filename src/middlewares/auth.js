import axios from 'axios';
import { LOGIN, saveUser } from '../actions/user';

const auth = (store) => (next) => (action) => {
  switch (action.type) {
    case LOGIN: {
      // current state
      const state = store.getState();

      const login = async () => {
        try {
          const response = await axios.post('http:localhost:3001/login', {
            email: state.user.email,
            password: state.user.password,
          });

          store.dispatch(saveUser(response.data));
        } catch (error) {
          console.log(error);
        }
      };

      login();

      break;
    }
    default:
      next(action);
  }
};

export default auth;
