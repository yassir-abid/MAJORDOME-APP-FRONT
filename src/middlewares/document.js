import axios from 'axios';
import { ADD_DOCUMENT, CHECK_USER, saveUser } from '../actions/document';

const addDocument = (store) => (next) => (action) => {
  switch (action.type) {
    case ADD_DOCUMENT: {
      // current state
      const state = store.getState();

      const document = async () => {
        const token = localStorage.getItem('token');
        try {
          const response = await axios.post('https://majordome-api.herokuapp.com/api/documents', {
            title: state.document.title,
            description: state.document.description,
            path: state.document.path,
            client: state.document.client,
            project_id: state.document.project_id,
            intervention_id: state.document.intervention_id,
          }, {
            headers: {
              authorization: `Bearer ${token}`,
            },
          });

          store.dispatch(saveUser(response.data));
        } catch (error) {
          console.log(error);
        }
      };

      document();

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

export default addDocument;
