import { takeLatest, put, all } from 'redux-saga/effects';
import { TodoActionType } from '../actions/Index';
import { addTodoList, updateTodoList } from '../../services/TodoService';

function* asyncSetTodoList(object) {
  const {
    data: { createList },
  } = yield addTodoList(object);
  yield put({ type: TodoActionType.ADD_TODO_LIST.redux, text: createList.name, id: createList.id });
}

function* asyncUpdateTodoList(object) {
  const {
    data: { updateList },
  } = yield updateTodoList(object);
  yield put({ type: TodoActionType.UPDATE_TODO_LIST.redux, name: updateList.name, id: updateList.id });
}

export default function* root() {
  yield all([
    yield takeLatest(TodoActionType.ADD_TODO_LIST.saga, asyncSetTodoList),
    yield takeLatest(TodoActionType.UPDATE_TODO_LIST.saga, asyncUpdateTodoList),
  ]);
}
