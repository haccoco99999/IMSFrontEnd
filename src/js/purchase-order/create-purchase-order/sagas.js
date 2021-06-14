import { call, put, takeEvery } from "@redux-saga/core/effects"
import {GET_DETAIL_PURCHASE_ORDER,GET_DETAIL_PURCHASE_ORDER_SUCCESS,GET_DETAIL_PURCHASE_ORDER_ERROR, CONFIRM_PURCHASE_ORDER} from './contants'

import handleApiErrors from '../../auth/api-errors'
const updateUrl="https://imspublicapi.herokuapp.com/api/purchaseorder/number/05136"
function getPurchaseOderAPI(orderId){
    
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
function sendConfirmAPI(orderId){
    
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
function* getDetailPurchaseOrderFlow(action){
    
    try{
      let  json= yield call(getPurchaseOderAPI,action.orderID)
        console.log(json)
        yield put({type:GET_DETAIL_PURCHASE_ORDER_SUCCESS, json})
    }catch(error){
       console.log(error)
        yield put({type:GET_DETAIL_PURCHASE_ORDER_ERROR})
    }

}
function* confirmPurchaseOrder(action){
    
    try{
        console.log("ok da confirm")
    //   let  json= yield call(getPurchaseOderAPI,action.orderID)
    //     console.log(json)
    //     yield put({type:GET_DETAIL_PURCHASE_ORDER_SUCCESS, json})
    }catch(error){
       console.log(error)
        yield put({type:GET_DETAIL_PURCHASE_ORDER_ERROR})
    }

}
function* updateWatcher(){
    
    yield takeEvery (GET_DETAIL_PURCHASE_ORDER, getDetailPurchaseOrderFlow)
    yield takeEvery (CONFIRM_PURCHASE_ORDER, confirmPurchaseOrder)
   

} 

export default updateWatcher