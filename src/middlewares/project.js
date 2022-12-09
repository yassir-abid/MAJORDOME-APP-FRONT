import axios from 'axios';
import { ADD_PROJECT, resetProjectFieldValue } from '../actions/project';
import baseUrl from '../utils';

const addProject = (store) => (next) => (action) => {
  switch (action.type) {
    case ADD_PROJECT: {
      const state = store.getState();

      const project = async () => {
        const token = localStorage.getItem('token');
        try {
          const response = await axios.post(`${baseUrl}/projects`, {

            title: state.project.title,
            description: state.project.description,
            comments: state.project.comments,
            client_id: state.project.client_id,
          }, {
            headers: {
              authorization: `Bearer ${token}`,
            },
          });

          action.saveProjectToState(response.data);
          store.dispatch(resetProjectFieldValue());
        } catch (error) {
          console.log(error);
        }
      };

      project();

      break;
    }
    default:
      next(action);
  }
};

export default addProject;
