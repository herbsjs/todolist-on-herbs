import { TodoActionsType } from '../actions/Index'

const INITIAL_STATE = {
  data: [
    { id: 69008, name: "teste" }
  ]
}

export const todos = (state = INITIAL_STATE, action) => {
    switch (action.type) {
      case TodoActionsType.REMOVE_TODO_LIST.REDUX:
        console.log("from reducer: ")
        console.log(action.payload)
        return {
          ...state,
          data: state.data.filter(todo => todo.id !== action.payload.id)
        }
      default:
        return state
    }
}
