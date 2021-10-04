import { StrictDict } from 'utils';
import { createActionFactory } from './utils';

export const dataKey = 'app';
const createAction = createActionFactory(dataKey);

/**
 * Add a new roll string to the rolls list
 * @param {string} roll - new roll string
 */
export const addRoll = createAction('add_roll');

/**
 * Clears all rolls from the rolls list
 */
export const clearRolls = createAction('clear_rolls');

export default StrictDict({
  addRoll,
  clearRolls,
});
