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
 
  yield put(unsetClient())

  
  localStorage.removeItem('token')
  history.push('/login')
}

function* loginFlow (action) {  
  let json
  try {
   

    json = yield call(loginApi, action.email, action.password)

    if(json.result){
      yield put(setClient(json))


      yield put({ type: LOGIN_SUCCESS })

    
      
      localStorage.setItem('token', JSON.stringify(json))
      history.push('/homepage/dashboard')
    }
    else{
      yield put({type: LOGIN_BANNED})
    }
  
  } catch (error) {
    
    yield put({ type: LOGIN_ERROR, error })
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
//  yield takeEvery(LOGOUT_REQUESTING, logout)
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