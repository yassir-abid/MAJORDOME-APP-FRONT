import axios from 'axios';
import { ADD_DOCUMENT, resetDocumentFieldValue } from '../actions/document';
import baseUrl from '../utils';

const addDocument = (store) => (next) => (action) => {
  switch (action.type) {
    case ADD_DOCUMENT: {
      const state = store.getState();

      const document = async () => {
        const token = localStorage.getItem('token');
        const formData = new FormData();
        formData.append('title', state.document.title);
        formData.append('description', state.document.description);
        formData.append('file', action.file);
        if (state.document.clientID !== '') {
          formData.append('client_id', state.document.clientID);
        }
        if (state.document.projectID !== '') {
          formData.append('project_id', state.document.projectID);
        }
        if (state.document.interventionID !== '') {
          formData.append('intervention_id', state.document.interventionID);
        }
        try {
          const response = await axios({
            method: 'post',
            url: `${baseUrl}/documents`,
            data: formData,
            headers: {
              authorization: `Bearer ${token}`,
              'Content-Type': 'multipart/form-data',
            },
          });
          action.saveDocumentToState(response.data);
          store.dispatch(resetDocumentFieldValue());
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
