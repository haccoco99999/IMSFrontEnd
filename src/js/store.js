import { applyMiddleware, createStore, compose } from 'redux'
import IndexReducer from './index-reducer'
import IndexSagas from './index-sagas'
import createSagaMiddleware from 'redux-saga'


const sagaMiddleware = createSagaMiddleware();
const composeSetup = process.env.NODE_ENV !== 'production' && typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : compose
const store = createStore(
    IndexReducer,
    composeSetup(applyMiddleware(sagaMiddleware)), // allows redux devtools to watch sagas
  )
  sagaMiddleware.run(IndexSagas);

export default store;