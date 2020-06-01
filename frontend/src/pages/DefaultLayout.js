import PropTypes from 'prop-types';
import React from 'react';

import Header from '../components/Header/Header';

const DefaultLayout = ({ children }) => {
  return (
    <div className="App">
      <Header />
      {children}
    </div>
  );
};

DefaultLayout.propTypes = {
  children: PropTypes.element.isRequired,
};

export default DefaultLayout;
