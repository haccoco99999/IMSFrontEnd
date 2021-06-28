import { call, put, takeEvery } from "@redux-saga/core/effects"
import {
    GET_DETAIL_PURCHASE_ORDER,
    GET_DETAIL_PURCHASE_ORDER_SUCCESS,
    GET_DETAIL_PURCHASE_ORDER_ERROR,
    SEND_CONFIRM_PURCHASE_ORDER,
    SAVE_PRODUCTS_PURCHASE_ORDER,
    CONFIRM_PURCHASE_ORDER_BY_MAMAGER,
    GET_PRODUCT_PURCHASE_ORDER_ERROR,
    GET_PRODUCT_PURCHASE_ORDER_SUCCESS,
    GET_PRODUCT_PURCHASE_ORDER,
    INGORE_PURCHASE_ORDER_CONFIRM,
    INGORE_PURCHASE_ORDER_CONFIRM_ERROR,
} from './contants'

import handleApiErrors from '../../auth/api-errors'
let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImU5ZjUxNWNjLTcyZjQtNDI3Ni1iOWE5LThhM2EzMTA0MTUwMiIsIm5iZiI6MTYyNDE3NDUzNywiZXhwIjoxNjI0MzQ3MzM3LCJpYXQiOjE2MjQxNzQ1Mzd9.rKQllv-JADJYAYcBoIkGxRnSwgMKknKk1xlZTJwxXmc"
function getPurchaseOderAPI(orderId) {
    const updateUrl = "https://imspublicapi.herokuapp.com/api/purchaseorder/number/"
    return fetch(updateUrl + orderId, {
        method: 'GET',
        headers: {
            "Authorization": "Bearer " + token,
            "Content-Type": "application/json",
            "Origin": ""
        },
        credentials: "include",

    })
        .then(response => handleApiErrors(response))
        .then(response => response.json())
        .then(json => json)
        .catch((error) => { throw error })
}
function getProductPurchaser(productId) {
    const updateUrl = `https://imspublicapi.herokuapp.com/api/product/search/${productId}&page=1&size=10`
   return fetch(updateUrl, {
        method: 'GET',
        headers: {
            "Authorization": "Bearer " + token,
            "Content-Type": "application/json",
            "Origin": ""
        },
        credentials: "include",

    })

        .then(response => response.json())
        .then(json => json)
        .catch((error) => { throw error })
}
function sendConfirmForManagerAPI(orderId) {
    const updateUrl = "https://imspublicapi.herokuapp.com/api/purchaseorder/create/"+ orderId
    return fetch(updateUrl, {
        method: 'POST',
        headers: {
            "Authorization": "Bearer " + token,
            "Content-Type": "application/json",
            "Origin": ""
        },
        credentials: "include",

    })
        .then(response => handleApiErrors(response))
        .then(response => response.json())
        .then(json => json)
        .catch((error) => { throw error })
}
function ignorePurchaseOrderConfirmAPI(orderId) {
    const updateUrl = "https://imspublicapi.herokuapp.com/api/purchaseorder/cancel/"+ orderId
    return fetch(updateUrl, {
        method: 'PUT',
        headers: {
            "Authorization": "Bearer " + token,
            "Content-Type": "application/json",
            "Origin": ""
        },
        credentials: "include",

    })
        .then(response => handleApiErrors(response))
        .then(response => response.json())
        .then(json => json)
        .catch((error) => { throw error })
}
function confirmByManagerAPI(orderId) {
    
    const updateUrl = "https://imspublicapi.herokuapp.com/api/po/confirm/"+ orderId
    return fetch(updateUrl, {
        method: 'POST',
        headers: {
            "Authorization": "Bearer " + token,
            "Content-Type": "application/json",
            "Origin": ""
        },
        credentials: "include",

    })
        .then(response => handleApiErrors(response))
        .then(response => response)
        
        .catch((error) => { throw error })
}
function updateProductPurchaseOrderAPI(orderId) {
       
    const updateUrl = "https://imspublicapi.herokuapp.com/api/purchaseorder/update"
    return fetch(updateUrl, {
        method: 'PUT',
        headers: {
            "Authorization": "Bearer " + token,
            "Content-Type": "application/json-patch+json",
            "Origin": ""
        },
        body: JSON.stringify(orderId),
        credentials: "include",

    })
        .then(response => handleApiErrors(response))
        .then(response => response.json())
        .then(json => json)
        .catch((error) => { throw error })
}
function* getDetailPurchaseOrderFlow(action) {

    try {
        let json = yield call(getPurchaseOderAPI, action.orderID)
       
        yield put({ type: GET_DETAIL_PURCHASE_ORDER_SUCCESS, json })
    } catch (error) {
      
        yield put({ type: GET_DETAIL_PURCHASE_ORDER_ERROR })
    }

}
function* confirmPurchaseOrderFlow(action) {

    try {

       
          let  json= yield call(sendConfirmForManagerAPI,action.orderID)
         
        //     console.log(json)
        //     yield put({type:GET_DETAIL_PURCHASE_ORDER_SUCCESS, json})
    } catch (error) {
        
        yield put({ type: GET_DETAIL_PURCHASE_ORDER_ERROR })
    }

}
function* getProductPurchaseOrderFlow(action) {

    try {

       
          let  json= yield call(getProductPurchaser,action.productId)
            console.log(json)
       
            yield put({type:GET_PRODUCT_PURCHASE_ORDER_SUCCESS, json})
    } catch (error) {
        
        yield put({ type: GET_PRODUCT_PURCHASE_ORDER_ERROR })
    }

}
function* saveProductsPurchaseOrderFlow(action) {

    try {

       
          let  json= yield call(updateProductPurchaseOrderAPI,action.orderID)
            
            yield put({type:GET_DETAIL_PURCHASE_ORDER_SUCCESS, json})
    } catch (error) {
    
        yield put({ type: GET_DETAIL_PURCHASE_ORDER_ERROR })
    }

}
function* sendConfirmByManager(action) {

    try {

       
          let  json= yield call(confirmByManagerAPI,action.orderID)
          
        //     yield put({type:GET_DETAIL_PURCHASE_ORDER_SUCCESS, json})
    } catch (error) {
     
        yield put({ type: GET_DETAIL_PURCHASE_ORDER_ERROR })
    }

}
function* ignorePurchaseOrderConfirmFlow(action) {

    try {

      
          let  json= yield call(ignorePurchaseOrderConfirmAPI,action.orderID)
          console.log(json)
        //     yield put({type:GET_DETAIL_PURCHASE_ORDER_SUCCESS, json})
    } catch (error) {
     
        yield put({ type: GET_DETAIL_PURCHASE_ORDER_ERROR })
    }

}
function* updateWatcher() {

    yield takeEvery(GET_DETAIL_PURCHASE_ORDER, getDetailPurchaseOrderFlow)
    yield takeEvery(SEND_CONFIRM_PURCHASE_ORDER, confirmPurchaseOrderFlow)
    yield takeEvery(SAVE_PRODUCTS_PURCHASE_ORDER, saveProductsPurchaseOrderFlow)
    yield takeEvery(CONFIRM_PURCHASE_ORDER_BY_MAMAGER, sendConfirmByManager)
    yield takeEvery(GET_PRODUCT_PURCHASE_ORDER, getProductPurchaseOrderFlow)
    yield takeEvery(INGORE_PURCHASE_ORDER_CONFIRM, ignorePurchaseOrderConfirmFlow)


}

export default updateWatcher