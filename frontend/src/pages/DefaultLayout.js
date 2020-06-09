import PropTypes from 'prop-types';
import React from 'react';
import NavDrawer from '../components/NavDrawer/NavDrawer';
import style  from '../components/Styles/Styles';

const DefaultLayout = ({ children }) => {
  const classes = style();
  return (
    <div className={classes.root}>
      <NavDrawer />
      {children}
    </div>
  );
};

DefaultLayout.propTypes = {
  children: PropTypes.element.isRequired,
};

export default DefaultLayout;
