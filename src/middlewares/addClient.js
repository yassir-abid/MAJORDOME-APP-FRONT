import axios from 'axios';
import { ADD_CLIENT, CHECK_USER, saveUser } from '../actions/addClient';

const addClient = (store) => (next) => (action) => {
  switch (action.type) {
    case ADD_CLIENT: {
      // current state
      const state = store.getState();

      const client = async () => {
        const token = localStorage.getItem('token');
        try {
          const response = await axios.post('https://majordome-api.herokuapp.com/api/clients', {
            client: {
              firstname: state.addClient.firstname,
              lastname: state.addClient.lastname,
              email: state.addClient.email,
              phone: state.addClient.phone,
              comments: state.addClient.comments,
            },
            addresses: [
              {
                number: state.addClient.number,
                street: state.addClient.street,
                postal_code: state.addClient.postal_code,
                city: state.addClient.city,
                comments: state.addClient.comments,
              },
            ],

          }, {
            headers: {
              authorization: `Bearer ${token}`,
            },
          });

          action.saveClientToState(response.data.client);
          store.dispatch(saveUser(response.data));
        } catch (error) {
          console.log(error);
        }
      };

      client();

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

export default addClient;
