import actions from 'data/actions';
import app, { initialState } from './app';

const testState = {
  ...initialState,
  rolls: [{ a: 'fake roll' }],
  lastRollsByType: { some: 'fake rolls' },
  rollIndex: 21,
  arbitraryField: 'yup',
};

describe('app reducer', () => {
  it('has initial state', () => {
    expect(app(undefined, {})).toEqual(initialState);
  });
  let newState;
  describe('handling actions.app.addRoll', () => {
    const roll = {
      type: 'aType',
      value: 2,
    };
    beforeEach(() => {
      newState = app(testState, actions.app.addRoll(roll));
    });
    it('adds roll to rolls list by with rollIndex', () => {
      expect(newState.rolls).toEqual([
        ...testState.rolls,
        { rollIndex: testState.rollIndex, ...roll },
      ]);
    });
    it('udpates lastRollsByType with the new value and type', () => {
      expect(newState.lastRollsByType).toEqual({
        ...testState.lastRollsByType,
        [roll.type]: roll.value,
      });
    });
    it('increments rollIndex', () => {
      expect(newState.rollIndex).toEqual(testState.rollIndex + 1);
    });
  });
  describe('handling actions.app.clearRolls', () => {
    beforeEach(() => {
      newState = app(testState, actions.app.clearRolls());
    });
    it('resets rolls', () => {
      expect(newState.rolls).toEqual([]);
    });
    it('resets rollsByType', () => {
      expect(newState.lastRollsByType).toEqual({});
    });
    it('resets rollIndex', () => {
      expect(newState.rollIndex).toEqual(0);
    });
  });
});
