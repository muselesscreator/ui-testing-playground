import React from 'react';
import { shallow } from 'enzyme';

import { diceTypes } from 'constants/dice';
import { DiceRoller } from '.';
import { DieControl } from './components';

jest.mock('./components', () => ({
  DieControl: () => 'DieControl',
  RollsList: () => 'RollsList',
}));

let el;

describe('DiceRoller component', () => {
  test('snapshot', () => {
    expect(shallow(<DiceRoller />)).toMatchSnapshot();
  });
  describe('component', () => {
    beforeEach(() => {
      el = shallow(<DiceRoller />);
    });
    test('Die control for each diceType', () => {
      const dieControls = el.find(DieControl);
      expect(dieControls.length).toEqual(7);
      expect(dieControls.at(0).props().type).toEqual(diceTypes.d4);
      expect(dieControls.at(1).props().type).toEqual(diceTypes.d6);
      expect(dieControls.at(2).props().type).toEqual(diceTypes.d8);
      expect(dieControls.at(3).props().type).toEqual(diceTypes.d10);
      expect(dieControls.at(4).props().type).toEqual(diceTypes.d12);
      expect(dieControls.at(5).props().type).toEqual(diceTypes.d20);
      expect(dieControls.at(6).props().type).toEqual(diceTypes.d100);
    });
  });
});
