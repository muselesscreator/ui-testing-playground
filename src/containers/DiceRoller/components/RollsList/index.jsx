/** @module */
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import actions from 'data/actions';
import selectors from 'data/selectors';

import { Button } from '@edx/paragon';

import './RollsList.scss';

/**
 * Simple display component for the D&D dice rolls list.
 * Provides a formatted list of roll strings, with a button at the bottom
 * allowing the user to clear all registered rolls.
 */
export const RollsList = ({ clearRolls, rolls }) => (
  <div className="rolls-list">
    <div className="rolls-container">
      { rolls.map((roll) => (
        <div className="roll-entry" key={roll.rollIndex}>
          {roll.summary}
        </div>
      )) }
    </div>
    <div className="action-bar">
      <Button className="clear-rolls-btn" onClick={clearRolls}>
        Clear
      </Button>
    </div>
  </div>
);
RollsList.propTypes = {
  // redux
  rolls: PropTypes.arrayOf(PropTypes.shape({
    rollIndex: PropTypes.number,
    summary: PropTypes.string,
  })).isRequired,
  clearRolls: PropTypes.func.isRequired,
};

export const mapStateToProps = (state) => ({
  rolls: selectors.app.rollSummaries(state),
});

export const mapDispatchToProps = {
  clearRolls: actions.app.clearRolls,
};

export default connect(mapStateToProps, mapDispatchToProps)(RollsList);
