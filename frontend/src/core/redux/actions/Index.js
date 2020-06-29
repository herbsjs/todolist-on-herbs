export const addTodo = text => ({
    type: TodoActionType.ADD_TODO_LIST.saga,
    text
})

export function setTodoList(text) {
    return {
        type: TodoActionType.SET_TODO_LIST.SAGA,
        text
    };
}

export const TodoActionType =  {
    ADD_TODO_LIST: {
        saga: "ASYNC_ADD_TODO_LIST",
        redux: "ADD_TODOLIST"
    }
}