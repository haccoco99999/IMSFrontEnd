import { take, fork, cancel, call, put, cancelled } from 'redux-saga/effects'

import handleApiErrors from '../auth/api-errors'




// Our login constants
import {  
  LOGIN_REQUESTING,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  LOGIN_BANNED,
} from './constants'


import {  
  setClient,
  unsetClient,
} from '../user/actions'

import {  
  CLIENT_UNSET,
} from '../user/constants'


 //const loginUrl = `http://localhost:3002/api/Clients/login`
 const loginUrl = `https://imspublicapi.conveyor.cloud/api/authentication`

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
  
  yield put(unsetClient())

  
  localStorage.removeItem('token')

}

function* loginFlow (email, password) {  
  let token
  try {
    
    token = yield call(loginApi, email, password)
    if(token.result){
      yield put(setClient(token))

    
      yield put({ type: LOGIN_SUCCESS })
      
      
      localStorage.setItem('token', JSON.stringify(token))
    }
    else{
      yield put({type: LOGIN_BANNED})
    }


   
    
    
  } catch (error) {
    
    yield put({ type: LOGIN_ERROR, error })
  } finally {
   
    if (yield cancelled()) {
   
    }
  }

  // return the token for health and wealth
  return token
}


function* loginWatcher () {  

  while (true) {
 
    const { email, password } = yield take(LOGIN_REQUESTING)

    const task = yield fork(loginFlow, email, password)
    
    
    const action = yield take([CLIENT_UNSET, LOGIN_ERROR, LOGIN_BANNED])
   
   
    if (action.type === CLIENT_UNSET) yield cancel(task)

    yield call(logout)
  }
}

export default loginWatcher  