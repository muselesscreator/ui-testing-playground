/** @module */
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { Button, Image } from '@edx/paragon';

import actions from 'data/actions';
import selectors from 'data/selectors';

import {
  diceSides,
  diceURIs,
} from 'constants/dice';

import './DieControl.scss';

/**
 * Simple Dice-roll control component.
 * Provides a button for rolling the die, a visual display of the die type,
 * and a textual display of the most recent roll of this die.
 *
 * @param {string} type - die type ({ diceTypes } from 'variables/dice')
 */
export class DieControl extends React.Component {
  constructor(props) {
    super(props);
    this.roll = this.roll.bind(this);
  }

  /**
   * Generate a new value based on the die type, update lastRoll,
   * and call addRoll prop with roll string.
   */
  roll() {
    const { type } = this.props;
    const sides = diceSides[type];
    const value = Math.floor(Math.random() * sides + 1);
    this.props.addRoll({ type, value });
  }

  render() {
    const { type } = this.props;
    return (
      <div className="die-control">
        <Image
          className="die-img"
          src={diceURIs[type]}
          alt="dice"
        />
        <br />
        <div className="last-value">
          { this.props.lastRoll && `Last Roll: ${this.props.lastRoll}`}
        </div>
        <Button className="roll-btn" onClick={this.roll}>
          Roll 1{type}
        </Button>
      </div>
    );
  }
}
DieControl.defaultProps = {
  lastRoll: null,
};
DieControl.propTypes = {
  type: PropTypes.string.isRequired,
  // redux
  addRoll: PropTypes.func.isRequired,
  lastRoll: PropTypes.number,
};

export const mapStateToProps = (state, ownProps) => ({
  lastRoll: selectors.app.lastRollByType(state, { type: ownProps.type }),
});

export const mapDispatchToProps = {
  addRoll: actions.app.addRoll,
};

export default connect(mapStateToProps, mapDispatchToProps)(DieControl);
