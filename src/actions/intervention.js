// ACTION TYPES
export const CHANGE_INTERVENTION_FIELD_VALUE = 'CHANGE_INTERVENTION_FIELD_VALUE';
export const ADD_INTERVENTION = 'ADD_INTERVENTION';
export const RESET_INTERVENTION_FIELD_VALUE = 'RESET_INTERVENTION_FIELD_VALUE';

// ACTION CREATORS
export const changeInterventionFieldValue = (value, key) => ({
  type: CHANGE_INTERVENTION_FIELD_VALUE,
  value,
  key,
});

export const addIntervention = (saveInterventionToState) => ({
  type: ADD_INTERVENTION,
  saveInterventionToState,
});

export const resetInterventionFieldValue = () => ({
  type: RESET_INTERVENTION_FIELD_VALUE,
});
