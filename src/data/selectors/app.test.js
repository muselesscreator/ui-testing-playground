import * as appSelectors from './app';
import exportedSelectors from './app';

jest.mock('reselect', () => ({
  createSelector: (selectors, cb) => ({ selectors, cb }),
}));

describe('app selectors', () => {
  describe('appSelector', () => {
    it('returns app state', () => {
      const state = { app: { some: 'state' } };
      expect(appSelectors.appSelector(state)).toEqual(state.app);
    });
  });
  describe('simpleSelectors', () => {
    const appState = {
      rolls: { some: 'rolls' },
      lastRollsByType: { some: 'typed rolls' },
    };
    describe('rolls', () => {
      test('returns app.rolls', () => {
        const { selectors, cb } = appSelectors.simpleSelectors.rolls;
        expect(selectors).toEqual([appSelectors.appSelector]);
        expect(cb(appState)).toEqual(appState.rolls);
      });
      test('is exported at top-level', () => {
        expect(exportedSelectors.rolls).toEqual(appSelectors.simpleSelectors.rolls);
      });
    });

    describe('lastRollsByType', () => {
      test('returns app.lastRollsByType', () => {
        const { selectors, cb } = appSelectors.simpleSelectors.lastRollsByType;
        expect(selectors).toEqual([appSelectors.appSelector]);
        expect(cb(appState)).toEqual(appState.lastRollsByType);
      });
      test('is exported at top-level', () => {
        expect(exportedSelectors.lastRollsByType).toEqual(
          appSelectors.simpleSelectors.lastRollsByType,
        );
      });
    });
  });

  describe('rollSummaries', () => {
    const rolls = [
      { rollIndex: 0, type: 'type1', value: 1 },
      { rollIndex: 1, type: 'type3', value: 9 },
      { rollIndex: 2, type: 'type4', value: 12 },
    ];
    let selectors;
    let cb;
    beforeEach(() => {
      ({ selectors, cb } = appSelectors.rollSummaries);
    });
    test('reselect selector based on rolls', () => {
      expect(selectors).toEqual([appSelectors.simpleSelectors.rolls]);
    });
    test('forwards rollIndex and combines type and value', () => {
      const out = cb(rolls);
      expect(out[0]).toEqual({
        rollIndex: 0,
        summary: `You rolled ${rolls[0].value} on a ${rolls[0].type}`,
      });
      expect(out[1]).toEqual({
        rollIndex: 1,
        summary: `You rolled ${rolls[1].value} on a ${rolls[1].type}`,
      });
      expect(out[2]).toEqual({
        rollIndex: 2,
        summary: `You rolled ${rolls[2].value} on a ${rolls[2].type}`,
      });
    });
  });

  describe('lastRollByType', () => {
    it('grabs values from lastRollsByType by passed type', () => {
      const type = 'selected type';
      const rolls = {
        type1: 1,
        type2: 3,
        [type]: 3,
      };
      const testState = { rolls };
      const old = appSelectors.simpleSelectors.lastRollsByType;
      appSelectors.simpleSelectors.lastRollsByType = jest.fn(
        (state) => state.rolls,
      );
      expect(
        appSelectors.lastRollByType(testState, { type }),
      ).toEqual(rolls[type]);
      appSelectors.simpleSelectors.lastRollsByType = old;
    });
  });
});
