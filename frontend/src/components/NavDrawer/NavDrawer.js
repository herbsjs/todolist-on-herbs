import React, { useState, useEffect } from 'react';
import Header from '../Header/Header';

import { List as ListIcon, Add } from '@material-ui/icons';
import {
  Drawer,
  CssBaseline,
  Toolbar,
  List,
  Divider,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@material-ui/core';

import style from '../Styles/Styles';

function NavDrawer() {
  const classes = style();
  return (
    <>
      <CssBaseline />
      <Header />
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <Toolbar />
        <div className={classes.drawerContainer}>
          <List>
            <ListItem button key={'add'}>
              <ListItemIcon>
                <Add />
              </ListItemIcon>
              <ListItemText primary={'Add List'} />
            </ListItem>
          </List>
          <Divider />
          <List>
            <ListItem button key={'list1'}>
              <ListItemIcon>
                <ListIcon />
              </ListItemIcon>
              <ListItemText primary={'List 1'} />
            </ListItem>
          </List>
        </div>
      </Drawer>
    </>
  );
}

export default NavDrawer;
