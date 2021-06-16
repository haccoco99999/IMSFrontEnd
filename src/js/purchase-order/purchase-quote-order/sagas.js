import { call, put, takeEvery } from "@redux-saga/core/effects"
import { GET_PRICE_QUOTE_ERROR,GET_PRICE_QUOTE_SUCCESS,GET_PRICE_QUOTE_REQUESTING,SEARCH_PURCHASE_ORDER_SEARCH,SEARCH_PURCHASE_ORDER_ERROR,SEARCH_PURCHASE_ORDER} from './contants'
import handleApiErrors from '../../auth/api-errors'
function searchPurchaseOrder(keySearch){
    const updateUrl="https://imspublicapi.herokuapp.com/api/purchaseorder/all&status=2&page=1&size=5"

    return fetch(updateUrl, {
        
        method: 'GET',
        headers:{
            "Authorization": "Bearer " + "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImM3ODY3NmY2LTc1NTUtNGU3ZS05OWQ5LWE4OTcxZGI4NWU5MiIsIm5iZiI6MTYyMzU0NjI4MSwiZXhwIjoxNjI0MTUxMDgxLCJpYXQiOjE2MjM1NDYyODF9.m13k9zu5PBwB92rbqUdOBl7Mlb4jnmzPucrBPXUMafU",
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
function getListPriceQuoteAPI(){
    const updateUrl="https://imspublicapi.herokuapp.com/api/purchaseorder/all&status=1&page=1&size=5"

    return fetch(updateUrl, {
        
        method: 'GET',
        headers:{
            "Authorization": "Bearer " + "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImM3ODY3NmY2LTc1NTUtNGU3ZS05OWQ5LWE4OTcxZGI4NWU5MiIsIm5iZiI6MTYyMzU0NjI4MSwiZXhwIjoxNjI0MTUxMDgxLCJpYXQiOjE2MjM1NDYyODF9.m13k9zu5PBwB92rbqUdOBl7Mlb4jnmzPucrBPXUMafU",
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
function* searchPurchaseOrderFlow(action){
    
    try{
      let  json= yield call(searchPurchaseOrder,action.keySearch)
      
        yield put({type:SEARCH_PURCHASE_ORDER_SEARCH, json})
    }catch(error){
       console.log(error)
        yield put({type:SEARCH_PURCHASE_ORDER_ERROR})
    }

}
function* getListPriceQuoteFlow(action){
    
    let json 
    
    try{
        json = yield call(getListPriceQuoteAPI)
       console.log(json)
        yield put({ type: GET_PRICE_QUOTE_SUCCESS, json })
    }catch(error){
        yield put({type:GET_PRICE_QUOTE_ERROR, error})
    }
}
function* updateWatcher(){
    yield takeEvery (SEARCH_PURCHASE_ORDER, searchPurchaseOrderFlow)
    yield takeEvery (GET_PRICE_QUOTE_REQUESTING, getListPriceQuoteFlow)
} 

export default updateWatcher