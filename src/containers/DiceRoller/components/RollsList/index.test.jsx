import React from 'react';
import { shallow } from 'enzyme';

import { diceTypes } from 'constants/dice';

import selectors from 'data/selectors';
import actions from 'data/actions';

import { RollsList, mapStateToProps, mapDispatchToProps } from '.';

jest.mock('data/selectors', () => ({
  __esModule: true,
  default: {
    app: {
      rollSummaries: jest.fn((...args) => ({ rolls: args })),
    },
  },
}));
jest.mock('@edx/paragon', () => ({
  Button: () => 'Button',
  Image: () => 'Image',
}));

let el;

describe('RollsList component', () => {
  const props = {
    rolls: [
      {
        summary: `You rolled 2 on a ${diceTypes.d4}`,
        rollIndex: 0,
      },
      {
        summary: `You rolled 5 on a ${diceTypes.d10}`,
        rollIndex: 1,
      },
      {
        summary: `You rolled 18 on a ${diceTypes.d20}`,
        rollIndex: 2,
      },
    ],
    clearRolls: jest.fn().mockName('this.props.clearRolls'),
  };
  test('snapshot', () => {
    expect(shallow(<RollsList {...props} />)).toMatchSnapshot();
  });
  describe('component', () => {
    beforeEach(() => {
      el = shallow(<RollsList {...props} />);
    });
    test('a roll summary for each roll', () => {
      const rolls = el.find('.roll-entry');
      expect(rolls.at(0).text()).toEqual(props.rolls[0].summary);
      expect(rolls.at(1).text()).toEqual(props.rolls[1].summary);
      expect(rolls.at(2).text()).toEqual(props.rolls[2].summary);
      expect(rolls.length).toEqual(3);
    });
  });

  describe('mapStateToProps', () => {
    const testState = { a: 'fake state' };
    let mapped;
    beforeEach(() => {
      mapped = mapStateToProps(testState);
    });
    test('rolls is loaded from selectors.app.rolls', () => {
      expect(mapped.rolls).toEqual(selectors.app.rollSummaries(testState));
    });
  });

  describe('mapDispatchToProps', () => {
    test('maps actions.app.clearRolls to clearRolls prop', () => {
      expect(mapDispatchToProps.clearRolls).toEqual(actions.app.clearRolls);
    });
  });
});
