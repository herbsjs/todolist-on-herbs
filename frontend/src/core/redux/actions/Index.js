export const TodoActionsType =  {
    REMOVE_TODO_LIST: {
        SAGA: "ASYNC_REMOVE_TODO_LIST",
        REDUX: "REMOVE_TODO_LIST"
    }
}

export const removeTodoList = id => ({
  type: TodoActionsType.REMOVE_TODO_LIST.SAGA,
  payload: {
    id,
  },
})
