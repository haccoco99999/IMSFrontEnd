import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import 'bootstrap/dist/css/bootstrap.css'
import sages  from './about-account/sagas'
import Login from './login/login'
import createSagaMiddleware from 'redux-saga'
import IndexReducer from './index-reducer'
import IndexSagas from './index-sagas'
import { applyMiddleware, createStore, compose } from 'redux'
import { Provider } from 'react-redux'
import LoginSaga from './login/sagas'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import {checkHomePageAuthorization} from './auth/check-auth'

const sagaMiddleware = createSagaMiddleware();


const composeSetup = process.env.NODE_ENV !== 'production' && typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : compose

const store = createStore(
  IndexReducer,
  composeSetup(applyMiddleware(sagaMiddleware)), // allows redux devtools to watch sagas
)

sagaMiddleware.run(IndexSagas);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        
        <Route path="/login" component={Login}></Route>
        {checkHomePageAuthorization(store) ?<Redirect to="/homepage"/>: <Redirect to="/Login"/>}
        <Route path="/homepage" component={App}>
          
        </Route>
      </Router>

    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
