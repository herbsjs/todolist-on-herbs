import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

import { addTodo } from '../../../core/redux/actions/Index';

const Form = ({ dispatch }) => {
  let input;

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (input.value.length < 3) return;
          dispatch(addTodo(input.value));
          input.value = '';
        }}
      >
        <input
          ref={(node) => {
            input = node;
          }}
        />
        <button type="submit">Add Todo</button>
      </form>
    </div>
  );
};

Form.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

export default connect()(Form);
