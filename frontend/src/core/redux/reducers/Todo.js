import { TodoActionsType } from '../actions/Index'

const INITIAL_STATE = {
  data: [],
}

export const todos = (state = INITIAL_STATE, action) => {
    switch (action.type) {
      case TodoActionsType.REMOVE_TODO_LIST.REDUX:
        return {
          ...state,
          data: state.data.filter(todo => todo.id !== action.payload.id)
        }
      default:
        return state
    }
}
