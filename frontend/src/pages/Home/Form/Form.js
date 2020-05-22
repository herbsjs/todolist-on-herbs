import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { addTodo } from '../../../core/redux/actions/Index'

const Form = ({ dispatch,client }) => {
  let input

  return (
    <div>
      <form
        onSubmit={e => {
          e.preventDefault()
          if (!input.value.trim()) return
          dispatch(addTodo(input.value))
          input.value = ''
        }}>

        <input ref={node => (input = node)} />
        <button type="submit">Add Todo</button>
      </form>
    </div>
  )
}

export default connect(state => ({ client: state.client  }))(Form)