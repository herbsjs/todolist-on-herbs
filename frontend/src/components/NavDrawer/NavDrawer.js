import React, { useState, useEffect } from 'react';
import Header from '../Header/Header';

import { List as ListIcon, } from '@material-ui/icons';
import {
  Drawer,
  CssBaseline,
  Toolbar,
  List,
  Divider,
  ListItem,
  ListItemIcon,
  ListItemText,
  Input
} from '@material-ui/core';

import style from '../Styles/Styles';

import { addTodo } from '../../core/redux/actions/Index'
import { connect } from 'react-redux';

import { useTranslation } from 'react-i18next';

function NavDrawer({todos, dispatch}) {
  const classes = style();
  const { t } = useTranslation();
  let input = ""

  return (
    <>
      <CssBaseline />
      <Header />
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}>

        <Toolbar />
        <div className={classes.drawerContainer}>
          <List>
            <form noValidate autoComplete="off" 
                onSubmit={e => {
                  e.preventDefault()
                  if (input.value.length < 3) return
                  dispatch(addTodo(input.value))
                  input.value = ''
                }}>
                <Input inputRef={node => (input = node)} id="standard-basic" placeholder={t('typeTodoList')} /> 
            </form>
          </List>
          <Divider />
          <List>
          {
            todos.map(todo => (
              <ListItem button key={todo.id}>
                <ListItemIcon>
                  <ListIcon />
                </ListItemIcon>
                <ListItemText primary={todo.id} />
                <ListItemText primary={todo.name} />
              </ListItem>
            )
          )}
          </List>
        </div>
      </Drawer>
    </>
  );
}

export default connect(state => ({ todos: state.todos  })) (NavDrawer);