import { take, fork, cancel, call, put, cancelled, takeEvery } from 'redux-saga/effects'
import handleApiErrors from '../auth/api-errors'
import {
    GET_PRICE_QUOTE_REQUESTING,
    GET_PRICE_QUOTE_SUCCESS,
    GET_PRICE_QUOTE_ERROR,
} from './contants'

 const updateUrl="https://imspublicapi.herokuapp.com/api/pricequote/all"
// const updateUrl=`${process.env.REACT_APP_API_URL}/api/pricequote/all`

function getListPriceQuoteAPI(){
    console.log("run api")
    return fetch(updateUrl, {
        method: 'GET',
        headers:{
            "Authorization": "Bearer " + "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImM3ODY3NmY2LTc1NTUtNGU3ZS05OWQ5LWE4OTcxZGI4NWU5MiIsIm5iZiI6MTYyMzI4NzExMSwiZXhwIjoxNjIzODkxOTExLCJpYXQiOjE2MjMyODcxMTF9.vJFm2zhnE5JHwVXIRuU0_MHrZAwlvHttaTUDKksT4Wc",
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
function* getListPriceQuoteFlow(action){
    
    let json 
    
    try{
        json = yield call(getListPriceQuoteAPI)
       
        yield put({ type: GET_PRICE_QUOTE_SUCCESS, json })
    }catch(error){
        yield put({type:GET_PRICE_QUOTE_ERROR, error})
    }
}
function* updateWatcher(){
    
      yield takeEvery (GET_PRICE_QUOTE_REQUESTING, getListPriceQuoteFlow);
}

export default updateWatcher