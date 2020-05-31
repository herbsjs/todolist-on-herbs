import React, { useState, useEffect } from 'react';
import Header from '../Header/Header';
import { connect } from 'react-redux';
import { removeTodoList } from '../../core/redux/actions/Index';

import { List as ListIcon, Delete as DeleteIcon, Add } from '@material-ui/icons';
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

function NavDrawer({ todos, dispatch }) {
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
          {
            todos.map(todo => (
            <ListItem button key={todo.id}>
              <ListItemIcon>
                <ListIcon />
              </ListItemIcon>
              <ListItemText primary={todo.name} />
              <DeleteIcon onClick={() => { dispatch(removeTodoList(todo.id)) }}/>
            </ListItem>
            )
          )}
          </List>
        </div>
      </Drawer>
    </>
  );
}

export default connect(state => ({ todos: state.todos.data })) (NavDrawer);
