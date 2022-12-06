import axios from 'axios';
import { ADD_CLIENT, CHECK_USER, saveUser } from '../actions/addClient';
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
    default:
      next(action);
  }
};

export default addClient;
