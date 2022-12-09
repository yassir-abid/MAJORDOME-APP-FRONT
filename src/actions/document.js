// ACTION TYPES
export const CHANGE_DOCUMENT_FIELD_VALUE = 'CHANGE_DOCUMENT_FIELD_VALUE';
export const ADD_DOCUMENT = 'ADD_DOCUMENT';
export const RESET_DOCUMENT_FIELD_VALUE = 'RESET_DOCUMENT_FIELD_VALUE';

// ACTION CREATORS
export const changeDocumentFieldValue = (value, key) => ({
  type: CHANGE_DOCUMENT_FIELD_VALUE,
  value,
  key,
});

export const addDocument = (saveDocumentToState, file) => ({
  type: ADD_DOCUMENT,
  saveDocumentToState,
  file,
});

export const resetDocumentFieldValue = () => ({
  type: RESET_DOCUMENT_FIELD_VALUE,
});
