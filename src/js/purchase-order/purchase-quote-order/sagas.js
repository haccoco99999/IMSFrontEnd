import { call, put, takeEvery } from "@redux-saga/core/effects"
import {SEARCH_PURCHASE_ORDER_SEARCH,SEARCH_PURCHASE_ORDER_ERROR,SEARCH_PURCHASE_ORDER} from './contants'
import handleApiErrors from '../../auth/api-errors'
const updateUrl="https://imspublicapi.herokuapp.com/api/purchaseorder/"
function searchPurchaseOrder(keySearch){
    
    return fetch(updateUrl+keySearch, {
        
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
function* searchPurchaseOrderFlow(action){
    
    try{
      let  json= yield call(searchPurchaseOrder,action.keySearch)
      
        yield put({type:SEARCH_PURCHASE_ORDER_SEARCH, json})
    }catch(error){
       console.log(error)
        yield put({type:SEARCH_PURCHASE_ORDER_ERROR})
    }

}
function* updateWatcher(){
    yield takeEvery (SEARCH_PURCHASE_ORDER, searchPurchaseOrderFlow)
} 

export default updateWatcher