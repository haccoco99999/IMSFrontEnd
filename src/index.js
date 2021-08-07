import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import 'bootstrap/dist/css/bootstrap.css'
import "bootstrap-icons/font/bootstrap-icons.css";


// import {
//   Collapse,
//   Popover,
//   Toast,
//   Tooltip,
//   Alert,
//   Modal,
//   Dropdown,
// } from "bootstrap";
import sages  from './about-account/sagas'
import Login from './login/login'
import createSagaMiddleware from 'redux-saga'
import IndexReducer from './index-reducer'
import IndexSagas from './index-sagas'
import { applyMiddleware, createStore, compose } from 'redux'
import { Provider } from 'react-redux'
import LoginSaga from './login/sagas'
import {  Router, Route, Redirect } from 'react-router-dom'
import {checkHomePageAuthorization} from './auth/check-auth'
// import store from './store';
import {history} from  './history'
 const sagaMiddleware = createSagaMiddleware();


const composeSetup = process.env.NODE_ENV !== 'production' && typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : compose

  const rootReducer = (state, action) => {
    if (action.type === 'LOGOUT_REQUESTING') {
      const { login } = state
      state = { login } 
      history.push("/login")
    }
  
    return IndexReducer(state, action);
  };

const store = createStore(
  rootReducer,
  composeSetup(applyMiddleware(sagaMiddleware)), // allows redux devtools to watch sagas
)
 
sagaMiddleware.run(IndexSagas);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router history={history}>
        
      <Route exact path="/login" component={Login}></Route>
        {checkHomePageAuthorization(store) ?<Redirect to="/homepage/dashboard"/>: <Redirect to="/login"/>}
        <Route path="/homepage" component={App}>
          
        </Route>
      </Router>

    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
