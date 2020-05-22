import React from 'react';
import { connect } from 'react-redux';

const FormList = ({todos}) => (
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
              </tr>
            )
          )}
        </tbody>
      </table>
    </center>
  </aside>
);

export default connect(state => ({ todos: state.todos  })) (FormList);