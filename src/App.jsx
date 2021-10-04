import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

import Footer from '@edx/frontend-component-footer';

import DiceRoller from 'containers/DiceRoller';
import './App.scss';

export const App = ({ courseMetadata }) => (
  <Router>
    <div>
      <main>
        <DiceRoller />
      </main>
      <Footer logo={process.env.LOGO_POWERED_BY_OPEN_EDX_URL_SVG} />
    </div>
  </Router>
);
App.defaultProps = {
};
App.propTypes = {
};

export default App;
