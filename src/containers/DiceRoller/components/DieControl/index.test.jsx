import React from 'react';
import { shallow } from 'enzyme';

import { Image } from '@edx/paragon';

import {
  diceSides,
  diceTypes,
  diceURIs,
} from 'constants/dice';

import selectors from 'data/selectors';
import actions from 'data/actions';

import { DieControl, mapStateToProps, mapDispatchToProps } from '.';

jest.mock('data/selectors', () => ({
  __esModule: true,
  default: {
    app: {
      lastRollByType: jest.fn((...args) => ({ lastRollByType: args })),
    },
  },
}));
jest.mock('@edx/paragon', () => ({
  Button: () => 'Button',
  Image: () => 'Image',
}));

let el;

describe('DieControl component', () => {
  const props = {
    lastRoll: 2,
    type: diceTypes.d4,
    addRoll: jest.fn().mockName('this.props.addRoll'),
  };
  const newRoll = 0.7824;
  test('snapshot', () => {
    el = shallow(<DieControl {...props} />);
    el.instance().roll = jest.fn().mockName('this.roll');
    expect(el.instance().render()).toMatchSnapshot();
  });
  describe('component', () => {
    beforeEach(() => {
      el = shallow(<DieControl {...props} />);
    });
    test('loads image src from diceURIs based on type', () => {
      expect(el.find(Image).props().src).toEqual(diceURIs[props.type]);
    });
    describe('roll callback', () => {
      beforeEach(() => {
        jest.spyOn(global.Math, 'random').mockReturnValue(newRoll);
      });
      afterEach(() => {
        jest.spyOn(global.Math, 'random').mockRestore();
      });
      it('calls addRoll prop with type and a new roll based on number of sides', () => {
        el.instance().roll();
        expect(props.addRoll).toHaveBeenCalledWith({
          type: props.type,
          value: Math.floor(newRoll * diceSides[props.type] + 1),
        });
      });
    });
  });

  describe('mapStateToProps', () => {
    const testState = { a: 'fake state' };
    let mapped;
    beforeEach(() => {
      mapped = mapStateToProps(testState, { type: props.type });
    });
    test('lastRoll is loaded from selectors.app.lastRollByType, with ownProps.type', () => {
      expect(mapped.lastRoll).toEqual(
        selectors.app.lastRollByType(testState, { type: props.type }),
      );
    });
  });

  describe('mapDispatchToProps', () => {
    test('maps actions.app.addRoll to addRoll prop', () => {
      expect(mapDispatchToProps.addRoll).toEqual(actions.app.addRoll);
    });
  });
});
