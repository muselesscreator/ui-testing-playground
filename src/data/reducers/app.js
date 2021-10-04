import { createReducer } from '@reduxjs/toolkit';

import actions from 'data/actions';

const initialState = {
  lastRollsByType: {},
  rolls: [],
  rollIndex: 0,
};

// eslint-disable-next-line no-unused-vars
const app = createReducer(initialState, {
  [actions.app.addRoll]: (state, { payload }) => ({
    ...state,
    rolls: [...state.rolls, { rollIndex: state.rollIndex, ...payload }],
    lastRollsByType: { ...state.lastRollsByType, [payload.type]: payload.value },
    rollIndex: state.rollIndex + 1,
  }),
  [actions.app.clearRolls]: (state) => ({
    ...state,
    rolls: [],
    lastRollsByType: {},
    rollIndex: 0,
  }),
});

export { initialState };

export default app;
