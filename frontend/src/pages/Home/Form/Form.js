import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

const Form = ({ dispatch }) => {
  let input

  return (
    <div>
      <form>
        <input ref={node => (input = node)} />
        <button type="submit">Add Todo</button>
      </form>
    </div>
  )
}

export default connect()(Form)
