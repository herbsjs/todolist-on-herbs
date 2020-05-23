import { takeLatest, put } from 'redux-saga/effects';
import { TodoActionsType } from '../actions/Index';
import { removeTodoList } from '../../services/TodoService'

function* asyncRemoveTodoList({ payload }) {
  try{
    const { data: { deleteList }} = yield removeTodoList(payload.id);
    console.log(deleteList)
    yield put({ type: TodoActionsType.REMOVE_TODO_LIST.REDUX, payload });
  }
  catch (e){
    console.log(e)
  }
}

export default function* root() {
    yield takeLatest(TodoActionsType.REMOVE_TODO_LIST.SAGA, asyncRemoveTodoList);
}
