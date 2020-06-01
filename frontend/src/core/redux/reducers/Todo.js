import { TodoActionType } from '../actions/Index';

const todos = (state = [], action) => {
  switch (action.type) {
    case TodoActionType.ADD_TODO_LIST.redux:
      return [
        ...state,
        {
          name: action.text,
          id: action.id,
        },
      ];
    case TodoActionType.UPDATE_TODO_LIST.redux:
      return state.map((todo) => (todo.id === action.id ? { ...todo, name: todo.name } : todo));
    default:
      return state;
  }
};

export default todos;
