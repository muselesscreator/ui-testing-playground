import actions, { dataKey } from './app';
import { testAction, testActionTypes } from './testUtils';

describe('actions', () => {
  describe('action types', () => {
    const actionTypes = [
      actions.addRoll,
      actions.clearRolls,
    ].map(action => action.toString());
    testActionTypes(actionTypes, dataKey);
  });
  describe('actions provided', () => {
    test('addRoll action', () => testAction(actions.addRoll));
    test('clearRolls action', () => testAction(actions.clearRolls));
  });
});
