import { persistStore } from 'redux-persist';
import createSagaMiddleware from 'redux-saga';
import createStore from './CreateStore';
import persistReducers from './PersistReducers';
import { rootReducer } from '../reducers/Index';
import rootSaga from '../saga/Sagas';

const sagaMonitor =
  process.env.NODE_ENV === 'development'
    ? console.tron.createSagaMonitor()
    : null;

const sagaMiddleware = createSagaMiddleware({ sagaMonitor });
const middlewares = [sagaMiddleware];
const store = createStore(persistReducers(rootReducer), middlewares);
const persistor = persistStore(store);

sagaMiddleware.run(rootSaga);

export { store, persistor };