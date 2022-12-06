import axios from 'axios';
import { ADD_DOCUMENT, CHECK_USER, saveUser } from '../actions/document';
import baseUrl from '../utils';

const addDocument = (store) => (next) => (action) => {
  switch (action.type) {
    case ADD_DOCUMENT: {
      const state = store.getState();

      const document = async () => {
        const token = localStorage.getItem('token');
        try {
          const response = await axios.post(`${baseUrl}/documents`, {
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
    default:
      next(action);
  }
};

export default addDocument;
