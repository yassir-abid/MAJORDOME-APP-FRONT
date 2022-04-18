import axios from 'axios';
import { ADD_INTERVENTION, CHECK_USER, saveUser } from '../actions/intervention';

const addIntervention = (store) => (next) => (action) => {
  switch (action.type) {
    case ADD_INTERVENTION: {
      // current state
      const state = store.getState();

      const intervention = async () => {
        const token = localStorage.getItem('token');
        try {
          const response = await axios.post('https://majordome-api.herokuapp.com/api/interventions', {
            title: state.intervention.title,
            description: state.intervention.description,
            date: state.intervention.date,
            end_date: state.intervention.end_date,
            status: state.intervention.status,
            comments: state.intervention.comments,
            project_id: state.intervention.project_id,
            address_id: state.intervention.address_id,
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

      intervention();

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

export default addIntervention;
