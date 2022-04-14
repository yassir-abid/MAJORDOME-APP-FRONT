import axios from 'axios';
import { ADD_PROJECT, CHECK_USER, saveUser } from '../actions/project';

const addProject = (store) => (next) => (action) => {
  switch (action.type) {
    case ADD_PROJECT: {
      // current state
      const state = store.getState();

      const project = async () => {
        const token = localStorage.getItem('token');
        try {
          const response = await axios.post('https://majordome-api.herokuapp.com/api/projects', {

            title: state.project.title,
            description: state.project.description,
            comments: state.project.comments,
            client_id: state.project.client_id,
          }, {
            headers: {
              authorization: `Bearer ${token}`,
            },
          });

          // stock token to localStorage
          // localStorage.setItem('token', response.data.token);

          store.dispatch(saveUser(response.data));
        } catch (error) {
          console.log(error);
        }
      };

      project();

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

export default addProject;
