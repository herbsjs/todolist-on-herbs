import React from 'react';
import { connect } from 'react-redux';
import { removeTodoList } from '../../../core/redux/actions/Index';

const FormList = ({todos, dispatch }) => (
  <aside>
    <center>
      <table>
        <thead>
          <tr>
            <td>Id</td>
            <td>Lista</td>
          </tr>
        </thead>
        <tbody>
          {
            todos.map(todo => (
              <tr key={todo.id}>
                  <td>{todo.id}</td>
                  <td>{todo.name}</td>
                  <td><button onClick={() => { dispatch(removeTodoList(todo.id)) }}>Delete me!</button></td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </center>
  </aside>
);

export default connect(state => ({ todos: state.todos.data })) (FormList);
