import axios from 'axios';
import { ADD_CLIENT, resetClientFieldValue } from '../actions/client';
import baseUrl from '../utils';

const addClient = (store) => (next) => (action) => {
  switch (action.type) {
    case ADD_CLIENT: {
      const state = store.getState();

      const client = async () => {
        const token = localStorage.getItem('token');
        try {
          const response = await axios.post(`${baseUrl}/clients`, {
            client: {
              firstname: state.client.firstname,
              lastname: state.client.lastname,
              email: state.client.email,
              phone: state.client.phone,
              comments: state.client.comments,
            },
            addresses: [
              {
                number: state.client.number,
                street: state.client.street,
                postal_code: state.client.postal_code,
                city: state.client.city,
                comments: state.client.comments,
              },
            ],

          }, {
            headers: {
              authorization: `Bearer ${token}`,
            },
          });

          action.saveClientToState(response.data.client);
          store.dispatch(resetClientFieldValue());
        } catch (error) {
          console.log(error);
        }
      };

      client();

      break;
    }
    default:
      next(action);
  }
};

export default addClient;
