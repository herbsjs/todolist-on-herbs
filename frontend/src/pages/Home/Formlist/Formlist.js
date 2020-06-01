import { Field, FieldArray, Form, Formik } from 'formik';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import * as Yup from 'yup';
import { updateTodo } from '../../../core/redux/actions/Index';

const validation = Yup.object().shape({
  todos: Yup.array().of(Yup.object().shape({ id: Yup.string(), name: Yup.string() })),
});

const Name = styled.input`
  & {
    padding: 4px;
    box-sizing: border-box;
    border: none;
  }
  &:hover,
  &:focus {
    border: 1px solid gray;
    border-radius: 6px;
  }
`;

const List = styled.div`
  & {
    display: flex;
    flex-direction: column;
  }
`;

const Row = styled.div`
  & {
    display: flex;
    width: 100%;
    justify-content: center;
  }
`;

const Update = styled.button`
  & {
    visibility: hidden;
  }
`;

const FormList = ({ todos, dispatch }) => {
  const onSubmit = ({ todos: values }) => {
    document.querySelector('div.App > div > form > input').focus();
    const [modifiedRow] = values.filter((row, idx) => row.name !== todos[idx].name);
    dispatch(updateTodo(modifiedRow));
  };

  return (
    <Formik initialValues={{ todos }} onSubmit={onSubmit} validationSchema={validation} enableReinitialize>
      {({ values }) => (
        <>
          <div>Id Lista</div>
          <Form>
            <FieldArray
              name="todos"
              render={() => (
                <List>
                  {values.todos.map((todo, idx) => (
                    <Row key={todo.id}>
                      <div>{todo.id}</div>
                      <Field name={`todos.${idx}.name`}>{({ field }) => <Name {...field} />}</Field>
                    </Row>
                  ))}
                </List>
              )}
            />
            <Update type="submit">Submit</Update>
          </Form>
        </>
      )}
    </Formik>
  );
};

FormList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.shape({ id: PropTypes.string, name: PropTypes.string })).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect((state) => ({ todos: state.todos }))(FormList);
