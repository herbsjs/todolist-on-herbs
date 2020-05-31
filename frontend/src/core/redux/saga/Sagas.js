import { takeLatest, put } from 'redux-saga/effects';
import { TodoActionsType } from '../actions/Index';
import { removeTodoList } from '../../services/TodoService'

function* asyncRemoveTodoList({ payload }) {
  yield removeTodoList(payload.id);
  yield put({ type: TodoActionsType.REMOVE_TODO_LIST.REDUX, payload })
}

export default function* root() {
  yield takeLatest(TodoActionsType.REMOVE_TODO_LIST.SAGA, asyncRemoveTodoList);
}
