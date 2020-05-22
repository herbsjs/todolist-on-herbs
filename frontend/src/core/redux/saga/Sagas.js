import { takeLatest, put } from'redux-saga/effects';
import { TodoActionType } from'../actions/Index';
import { addTodoList } from '../../services/TodoService';

function* asyncSetTodoList(object) {
    const { data: {createList} } = yield addTodoList(object);
    yield put({ type: TodoActionType.ADD_TODO_LIST.redux, text: createList.name, id: createList.id });
}
 
export default function* root() {
    yield takeLatest(TodoActionType.ADD_TODO_LIST.saga, asyncSetTodoList);
}

