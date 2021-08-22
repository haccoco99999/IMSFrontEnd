import { take, fork, cancel, call, put, cancelled, takeEvery } from 'redux-saga/effects'
import handleApiErrors from '../auth/api-errors'
import action from '../good-receipt/details/action'
import { GET_VALUE_DASHBOARD_ERROR, GET_VALUE_DASHBOARD_REQUESTING, GET_VALUE_DASHBOARD_SUCCESS } from './constant'


// const updateUrl=`${process.env.REACT_APP_API_URL}/api/pricequote/all`

function getDataDashboadAPI(action){
    return fetch(`${process.env.REACT_APP_API}/report/dashboarddata`, {
        method: 'GET',
        headers:{
            "Authorization": "Bearer " + action.token,
            "Content-Type": "application/json",
            "Origin": ""
        },
        credentials: "include",
        
    })
    .then(response => handleApiErrors(response))
    .then(response => response.json())
    .then(json => json)
    .catch((error) => {throw error})
}

function* getDataDashboard(action){
    
    let json 
    
    try{
     let   json = yield call(getDataDashboadAPI,action)
    
            
        yield put({ type: GET_VALUE_DASHBOARD_SUCCESS, json })
    }catch(error){
        yield put({type:GET_VALUE_DASHBOARD_ERROR, error})
    }
}
function* updateWatcher(){
    
      yield takeEvery (GET_VALUE_DASHBOARD_REQUESTING, getDataDashboard);
}

export default updateWatcher