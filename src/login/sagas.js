import { take, fork, cancel, call, put, cancelled, takeEvery } from 'redux-saga/effects'

import handleApiErrors from '../auth/api-errors'
import {history}from '../history'




// Our login constants
import {  
  LOGIN_REQUESTING,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  LOGIN_BANNED,
  LOGOUT_REQUESTING,
} from './constants'


import {  
  setClient,
  unsetClient,
} from '../user/actions'

import {  
  CLIENT_UNSET,
} from '../user/constants'


 //const loginUrl = `http://localhost:3002/api/Clients/login`
  const loginUrl = `https://imspublicapi.herokuapp.com/api/authentication`

function loginApi (email, password) {  
  return fetch(loginUrl, {
    
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
      'Origin': '',
  },
    
    credentials: "include",
    
    body: JSON.stringify({ email, password }),
  })
    .then(response => handleApiErrors(response))
    .then(response =>  response.json())
    .then(json => json)
    .catch((error) => { throw error })
}

function* logout () {  
 
  yield put({type: "CLEAN_ALL_STORE"})

  
  localStorage.removeItem('token')
  history.replace('/login')
}

function* loginFlow (action) {  
  let json
  try {
   

    json = yield call(loginApi, action.email, action.password)

   
      yield put(setClient(json))


      yield put({ type: LOGIN_SUCCESS })

    
      
      localStorage.setItem('token', JSON.stringify(json))
      history.push('/homepage/dashboard')
    
  
  
  } catch (error) {
    let messages
    messages=  yield call (() => error.then(json =>  json.verbose))
      // console.log(messages)
    // error.response.then(response => response.json).then(json => console.log(json))
    yield put({ type: LOGIN_ERROR, messages })
  } finally {
    if (yield cancelled()) {
      history.push('/login')
    }
  }

  // return the token for health and wealth
  return json
}


function* loginWatcher () {  
 
  yield takeEvery(LOGIN_REQUESTING,loginFlow )
 yield takeEvery(LOGOUT_REQUESTING, logout)
  // while (true) {
   
  //   const { email, password } = yield take(LOGIN_REQUESTING)

  //   const task = yield fork (loginFlow,email, password)
    
    
  //   const action = yield take([CLIENT_UNSET, LOGIN_ERROR])
  //   alert(action.type === CLIENT_UNSET)
  
  //   if (action.type === CLIENT_UNSET) yield cancel(task)
  
  //   yield call(logout)
  // }
}

export default loginWatcher  