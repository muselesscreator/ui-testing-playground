import { createSelector } from 'reselect';

import { StrictDict } from 'utils';

import * as module from './app';

export const appSelector = (state) => state.app;

export const simpleSelectors = {
  rolls: createSelector([module.appSelector], (app) => app.rolls),
  lastRollsByType: createSelector(
    [module.appSelector],
    (app) => app.lastRollsByType,
  ),
};

export const rollSummaries = createSelector(
  [module.simpleSelectors.rolls],
  (rolls) => rolls.map(
    ({ rollIndex, type, value }) => ({
      rollIndex,
      summary: `You rolled ${value} on a ${type}`,
    }),
  ),
);

export const lastRollByType = (state, { type }) => (
  module.simpleSelectors.lastRollsByType(state)[type]
);

export default StrictDict({
  ...simpleSelectors,
  lastRollByType,
  rollSummaries,
});
