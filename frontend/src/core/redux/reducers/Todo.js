import { TodoActionType } from '../actions/Index'

export const todos = (state = [], action) => {
    switch (action.type) {
      case TodoActionType.ADD_TODO_LIST.redux:
        return [
          ...state,
          {
            name: action.text,
            id: action.id
          }
        ]
      default:
        return state
    }
}