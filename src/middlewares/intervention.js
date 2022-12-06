import axios from 'axios';
import { ADD_INTERVENTION, CHECK_USER, saveUser } from '../actions/intervention';
import baseUrl from '../utils';

const addIntervention = (store) => (next) => (action) => {
  switch (action.type) {
    case ADD_INTERVENTION: {
      const state = store.getState();

      const intervention = async () => {
        const token = localStorage.getItem('token');
        try {
          const response = await axios.post(`${baseUrl}/interventions`, {
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
          action.saveInterventionToState(response.data);
          store.dispatch(saveUser(response.data));
        } catch (error) {
          console.log(error);
        }
      };

      intervention();

      break;
    }
    default:
      next(action);
  }
};

export default addIntervention;
