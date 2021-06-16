import { call, put, takeEvery } from "@redux-saga/core/effects"
import {
    GET_DETAIL_PURCHASE_ORDER,
    GET_DETAIL_PURCHASE_ORDER_SUCCESS,
    GET_DETAIL_PURCHASE_ORDER_ERROR,
    SEND_CONFIRM_PURCHASE_ORDER,
    SAVE_PRODUCTS_PURCHASE_ORDER,
    CONFIRM_PURCHASE_ORDER_BY_MAMAGER
} from './contants'

import handleApiErrors from '../../auth/api-errors'

function getPurchaseOderAPI(orderId) {
    const updateUrl = "https://imspublicapi.herokuapp.com/api/purchaseorder/number/"
    return fetch(updateUrl + orderId, {
        method: 'GET',
        headers: {
            "Authorization": "Bearer " + "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImM3ODY3NmY2LTc1NTUtNGU3ZS05OWQ5LWE4OTcxZGI4NWU5MiIsIm5iZiI6MTYyMzU0NjI4MSwiZXhwIjoxNjI0MTUxMDgxLCJpYXQiOjE2MjM1NDYyODF9.m13k9zu5PBwB92rbqUdOBl7Mlb4jnmzPucrBPXUMafU",
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
function sendConfirmForManagerAPI(orderId) {
    const updateUrl = "https://imspublicapi.herokuapp.com/api/purchaseorder/create/"+ orderId
    return fetch(updateUrl, {
        method: 'POST',
        headers: {
            "Authorization": "Bearer " + "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImM3ODY3NmY2LTc1NTUtNGU3ZS05OWQ5LWE4OTcxZGI4NWU5MiIsIm5iZiI6MTYyMzc1MTU3MCwiZXhwIjoxNjI0MzU2MzcwLCJpYXQiOjE2MjM3NTE1NzB9.Nytx8CZvhohyk5meCGUvcOah2qjopsJNTlU1sm_KK18",
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
    console.log("API " + orderId )
    const updateUrl = "https://imspublicapi.herokuapp.com/api/po/confirm/"+ orderId
    return fetch(updateUrl, {
        method: 'POST',
        headers: {
            "Authorization": "Bearer " + "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImM3ODY3NmY2LTc1NTUtNGU3ZS05OWQ5LWE4OTcxZGI4NWU5MiIsIm5iZiI6MTYyMzc1MTU3MCwiZXhwIjoxNjI0MzU2MzcwLCJpYXQiOjE2MjM3NTE1NzB9.Nytx8CZvhohyk5meCGUvcOah2qjopsJNTlU1sm_KK18",
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
        console.log()
    const updateUrl = "https://imspublicapi.herokuapp.com/api/purchaseorder/update"
    return fetch(updateUrl, {
        method: 'PUT',
        headers: {
            "Authorization": "Bearer " + "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImM3ODY3NmY2LTc1NTUtNGU3ZS05OWQ5LWE4OTcxZGI4NWU5MiIsIm5iZiI6MTYyMzc1MTU3MCwiZXhwIjoxNjI0MzU2MzcwLCJpYXQiOjE2MjM3NTE1NzB9.Nytx8CZvhohyk5meCGUvcOah2qjopsJNTlU1sm_KK18",
            "Content-Type": "application/json-patch+json",
            "Origin": ""
        },
        body: JSON.stringify(orderId),
        credentials: "include",

    })
        .then(response => handleApiErrors(response))
        .then(response => response)
        
        .catch((error) => { throw error })
}
function* getDetailPurchaseOrderFlow(action) {

    try {
        let json = yield call(getPurchaseOderAPI, action.orderID)
        console.log(json)
        yield put({ type: GET_DETAIL_PURCHASE_ORDER_SUCCESS, json })
    } catch (error) {
        console.log(error)
        yield put({ type: GET_DETAIL_PURCHASE_ORDER_ERROR })
    }

}
function* confirmPurchaseOrderFlow(action) {

    try {

        console.log("ok da confirm" + action.orderID)
          let  json= yield call(sendConfirmForManagerAPI,action.orderID)
          console.log(json)
        //     console.log(json)
        //     yield put({type:GET_DETAIL_PURCHASE_ORDER_SUCCESS, json})
    } catch (error) {
        console.log(error)
        yield put({ type: GET_DETAIL_PURCHASE_ORDER_ERROR })
    }

}
function* saveProductsPurchaseOrderFlow(action) {

    try {

        console.log("ok da confirm" + JSON.stringify(action.orderID))
          let  json= yield call(updateProductPurchaseOrderAPI,action.orderID)
            console.log(json)
        //     yield put({type:GET_DETAIL_PURCHASE_ORDER_SUCCESS, json})
    } catch (error) {
        console.log(error)
        yield put({ type: GET_DETAIL_PURCHASE_ORDER_ERROR })
    }

}
function* sendConfirmByManager(action) {

    try {

        console.log("ok da confirm" + action.orderID)
          let  json= yield call(confirmByManagerAPI,action.orderID)
            console.log(json)
        //     yield put({type:GET_DETAIL_PURCHASE_ORDER_SUCCESS, json})
    } catch (error) {
        console.log(error)
        yield put({ type: GET_DETAIL_PURCHASE_ORDER_ERROR })
    }

}
function* updateWatcher() {

    yield takeEvery(GET_DETAIL_PURCHASE_ORDER, getDetailPurchaseOrderFlow)
    yield takeEvery(SEND_CONFIRM_PURCHASE_ORDER, confirmPurchaseOrderFlow)
    yield takeEvery(SAVE_PRODUCTS_PURCHASE_ORDER, saveProductsPurchaseOrderFlow)
    yield takeEvery(CONFIRM_PURCHASE_ORDER_BY_MAMAGER, sendConfirmByManager)


}

export default updateWatcher