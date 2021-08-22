import { take, fork, cancel, call, put, cancelled, takeEvery } from 'redux-saga/effects'
import handleApiErrors from '../auth/api-errors'
import{
    UPDATE_PROFILE_REQUESTING,
    UPDATE_PROFILE_SUCCESS,
    UPDATE_PROFILE_ERROR
} from './contants'
import {updateClient} from '../user/actions'
const updateUrl=`${process.env.REACT_APP_API}/accountedit`

function updateApi(dataUpdate,token){
    // console.log(JSON.stringify(dataUpdate))
    // console.log(token)
    return fetch(updateUrl, {
        method: 'PUT',
        headers:{
            "Authorization": "Bearer " + token,
            "Content-Type": "application/json",
            "Origin": ""
        },
        credentials: "include",
        body: JSON.stringify(dataUpdate)
    })
    .then(response => handleApiErrors(response))
    .then(response =>  response.json())
    .then(json => json)
    .catch((error) => { throw error })
}
function* updateFlow(action){
    var { token,  dataUpdate} = action
   console.log(token)
    let json
    try{
        
        json = yield call(updateApi,dataUpdate,token)
      
        yield put(updateClient(json))
        
        yield put({type: UPDATE_PROFILE_SUCCESS})
    
    
    }catch(error){
        console.log(error)
        yield put({type:UPDATE_PROFILE_ERROR, error})
    }
}

function* updateWatcher(){
  
    yield takeEvery(UPDATE_PROFILE_REQUESTING, updateFlow);
    
}
export default updateWatcher



