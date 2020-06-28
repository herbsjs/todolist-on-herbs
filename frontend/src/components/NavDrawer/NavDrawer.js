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
  InputBase,
} from '@material-ui/core';

import style from '../Styles/Styles';

function NavDrawer() {
  const classes = style();

  const [addListLabel, setAddListLabel] = useState('Add List');
  const [toDoLists, setToDoLists] = useState([]);

  function addList(listName) {
    const listConcat = [...toDoLists, { name: listName }];
    setToDoLists(listConcat);
  }

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
              <InputBase
                value={addListLabel}
                placeholder="New list name"
                onChange={(event) => setAddListLabel(event.currentTarget.value)}
                onFocusCapture={() => setAddListLabel('')}
                onBlur={(event) => {
                  addList(event.currentTarget.value);
                  setAddListLabel('Add List');
                }}
                onKeyDown={(event) => {
                  const enterKey = 13;

                  if (event.keyCode === enterKey) {
                    event.target.blur();
                  }
                }}
              />
            </ListItem>
          </List>
          <Divider />
          <List>
            {toDoLists.map((list, index) => {
              return (
                <ListItem button key={index}>
                  <ListItemIcon>
                    <ListIcon />
                  </ListItemIcon>
                  <ListItemText primary={list.name} />
                </ListItem>
              );
            })}
          </List>
        </div>
      </Drawer>
    </>
  );
}

export default NavDrawer;
