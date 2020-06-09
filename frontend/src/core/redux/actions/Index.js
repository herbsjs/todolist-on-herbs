export const TodoActionType = {
  ADD_TODO_LIST: {
    saga: 'ASYNC_ADD_TODO_LIST',
    redux: 'ADD_TODO_LIST',
  },
  UPDATE_TODO_LIST: {
    saga: 'ASYNC_UPDATE_TODO_LIST',
    redux: 'UPDATE_TODO_LIST',
  },
};

export const addTodo = (text) => ({
  type: TodoActionType.ADD_TODO_LIST.saga,
  text,
});

export function updateTodo(item) {
  return {
    type: TodoActionType.UPDATE_TODO_LIST.saga,
    name: item.name,
    id: item.id,
  };
}
