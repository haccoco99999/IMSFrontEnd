import { call, put, takeEvery } from "@redux-saga/core/effects"
import {
    GET_DETAIL_PURCHASE_ORDER,
    GET_DETAIL_PURCHASE_ORDER_SUCCESS,
    GET_DETAIL_PURCHASE_ORDER_ERROR,

    SUBMIT_PURCHASE_ORDER_REQUEST,
    SUBMIT_PURCHASE_ORDER_SUCCESS,
    SUBMIT_PURCHASE_ORDER_ERROR,


    SAVE_PRODUCTS_PURCHASE_ORDER_REQUEST,
    SAVE_PRODUCTS_PURCHASE_ORDER_SUCCESS,
    SAVE_PRODUCTS_PURCHASE_ORDER_ERROR,

    CONFIRM_PURCHASE_ORDER_REQUEST,
    CONFIRM_PURCHASE_ORDER_SUCCESS,
    CONFIRM_PURCHASE_ORDER_ERROR,


    // GET_PRODUCT_PURCHASE_ORDER_ERROR,
    // GET_PRODUCT_PURCHASE_ORDER_SUCCESS,
    // GET_PRODUCT_PURCHASE_ORDER,
    REJECT_PURCHASE_ORDER_CONFIRM_REQUEST,
    REJECT_PURCHASE_ORDER_CONFIRM_SUCCESS,
    REJECT_PURCHASE_ORDER_CONFIRM_ERROR,


    EDIT_PRICE_QUOTE_REQUEST,
    EDIT_PRICE_QUOTE_SUCCESS,
    EDIT_PRICE_QUOTE_ERROR,

    SEND_MAIL_SERVICE_REQUEST,
    SEND_MAIL_SERVICE_SUCCESS,
    SEND_MAIL_SERVICE_ERROR,

    CREATE_PRICE_QUOTE_SUCCESS,
    CREATE_PRICE_QUOTE_ERROR,
    CREATE_PRICE_QUOTE_REQUEST,
    CREATE_PURCHASE_ORDER_REQUEST,
    CREATE_PURCHASE_ORDER_ERROR,
    CREATE_PURCHASE_ORDER_SUCCESS,
    GET_DETAIL_PURCHASE_ORDER_RESET,
} from './contants'

import handleApiErrors from '../../auth/api-errors'
import action from "../../good-receipt/details/action"
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
function createPriceQuoteAPI(action) {
    const updateUrl = "https://imspublicapi.herokuapp.com/api/pricequote/create"

    return fetch(updateUrl , {
        method: 'POST',
        headers: {
            "Authorization": "Bearer " + action.token,
            "Content-Type": "application/json",
            "Origin": ""
        },
        credentials: "include",
        body: JSON.stringify(action.data)

    })
        .then(response => handleApiErrors(response))
        .then(response => response.json())
        .then(json => json)
        .catch((error) => { throw error })
}
// function getProductPurchaser(productId) {
//     const updateUrl = `https://imspublicapi.herokuapp.com/api/product/search/${productId}&page=1&size=10`
//    return fetch(updateUrl, {
//         method: 'GET',
//         headers: {
//             "Authorization": "Bearer " + token,
//             "Content-Type": "application/json",
//             "Origin": ""
//         },
//         credentials: "include",

//     })

//         .then(response => response.json())
//         .then(json => json)
//         .catch((error) => { throw error })
// }

function sendEmailQuote(action){
  
    return fetch("https://imspublicapi.herokuapp.com/api/mailservice", {
        method: 'POST',
        headers:{
            
            "Authorization": "Bearer " + action.token,
            // "Content-Type": "multipart/form-data; boundary=------WebKitFormBoundaryVrJDc11fejgsDoAs",
            
        },
        body: action.data,
        credentials: "include",
        
    })
    .then(response => handleApiErrors(response))
    .then(response => response.json())
    .then(json => json)
    .catch((error) => {throw error})
}
function submitPurchaseOrderAPI(action) {
    const updateUrl = "https://imspublicapi.herokuapp.com/api/purchaseorder/submit"
    return fetch(updateUrl, {
        method: 'POST',
        headers: {
            "Authorization": "Bearer " + action.token,
            "Content-Type": "application/json",
            "Origin": ""
        },
        body: JSON.stringify(action.data),
        credentials: "include",

    })
        .then(response => handleApiErrors(response))
        .then(response => response.json())
        .then(json => json)
        .catch((error) => { throw error })
}
function editPriceQuoteAPI(action) {
    const updateUrl = "https://imspublicapi.herokuapp.com/api/pricequote/edit"
    return fetch(updateUrl, {
        method: 'PUT',
        headers: {
            "Authorization": "Bearer " + action.token,
            "Content-Type": "application/json",
            "Origin": ""
        },
        credentials: "include",
        body: JSON.stringify(action.data)
    })
        .then(response => handleApiErrors(response))
        .then(response => response.json())
        .then(json => json)
        .catch((error) => { throw error })
}

function createPurchaseOrderAPI(action) {
    const updateUrl = "https://imspublicapi.herokuapp.com/api/pricequote/submit"
    return fetch(updateUrl, {
        method: 'POST',
        headers: {
            "Authorization": "Bearer " + action.token,
            "Content-Type": "application/json",
            "Origin": ""
        },
        credentials: "include",
        body: JSON.stringify(action.data)
    })
        .then(response => handleApiErrors(response))
        .then(response => response.json())
        .then(json => json)
        .catch((error) => { throw error })
}
function rejectPurchaseOrderConfirmAPI(action) {
    const updateUrl = "https://imspublicapi.herokuapp.com/api/purchaseorder/reject"
    return fetch(updateUrl, {
        method: 'PUT',
        headers: {
            "Authorization": "Bearer " + action.token,
            "Content-Type": "application/json",
            "Origin": ""
        },
        credentials: "include",
        body:JSON.stringify(action.data)
    })
        .then(response => handleApiErrors(response))
        .then(response => response.json())
        .then(json => json)
        .catch((error) => { throw error })
}
function confirmByManagerAPI(action) {
    const updateUrl = "https://imspublicapi.herokuapp.com/api/po/confirm"
    return fetch(updateUrl, {
        method: 'POST',
        headers: {
            "Authorization": "Bearer " + action.token,
            "Content-Type": "application/json",
            "Origin": ""
        },
        
        credentials: "include",
        body: JSON.stringify(action.data)
    })
        .then(response => handleApiErrors(response))
        .then(response => response.json())
        .then(json => json)
        .catch((error) => { throw error })
}
function updateProductPurchaseOrderAPI(action) {
    
    const updateUrl = "https://imspublicapi.herokuapp.com/api/purchaseorder/update"
    return fetch(updateUrl, {
        method: 'PUT',
        headers: {
            "Authorization": "Bearer " + action.token,
            "Content-Type": "application/json-patch+json",
            "Origin": ""
        },
        body: JSON.stringify(action.data),
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
function* createPriceQuoteFlow(action) {
    
    try {
        let json = yield call(createPriceQuoteAPI, action)
        yield put({ type: CREATE_PRICE_QUOTE_SUCCESS })
        yield put({type:GET_DETAIL_PURCHASE_ORDER_SUCCESS, json})
    } catch (error) {
      
        yield put({ type: CREATE_PRICE_QUOTE_ERROR })
    }

}
function* editPriceQuoteFlow(action) {
    
    try {
        let json = yield call(editPriceQuoteAPI, action)
        yield put({ type: EDIT_PRICE_QUOTE_SUCCESS })
        yield put({ type: GET_DETAIL_PURCHASE_ORDER_SUCCESS, json })
    } catch (error) {
      
        yield put({ type: EDIT_PRICE_QUOTE_ERROR })
    }

}
function* submitPurchaseOrderFlow(action) {

    try {

       
          let  json= yield call(submitPurchaseOrderAPI,action)
         
            yield put({type:SUBMIT_PURCHASE_ORDER_SUCCESS})
            yield put({type:GET_DETAIL_PURCHASE_ORDER_SUCCESS, json})
    } catch (error) {
        
        yield put({ type: SUBMIT_PURCHASE_ORDER_ERROR })
    }

}
// function* getProductPurchaseOrderFlow(action) {

//     try {

       
//           let  json= yield call(getProductPurchaser,action.productId)
          
       
//             yield put({type:GET_PRODUCT_PURCHASE_ORDER_SUCCESS, json})
//     } catch (error) {
        
//         yield put({ type: GET_PRODUCT_PURCHASE_ORDER_ERROR })
//     }

// }
function* saveProductsPurchaseOrderFlow(action) {

    try {

       
          let  json= yield call(updateProductPurchaseOrderAPI,action)
            
            yield put({type:SAVE_PRODUCTS_PURCHASE_ORDER_SUCCESS})
            yield put({type:GET_DETAIL_PURCHASE_ORDER_SUCCESS, json})
    } catch (error) {
    
        yield put({ type: SAVE_PRODUCTS_PURCHASE_ORDER_ERROR })
    }

}
function* confirmPurchaseOrderFlow(action) {

    try {

       
          let  json= yield call(confirmByManagerAPI,action)
          
            yield put({type:CONFIRM_PURCHASE_ORDER_SUCCESS})
            console.log(json)
            yield put({type:GET_DETAIL_PURCHASE_ORDER_SUCCESS, json})
    } catch (error) {
     
        yield put({ type: CONFIRM_PURCHASE_ORDER_ERROR })
    }

}
function* rejectPurchaseOrderConfirmFlow(action) {

    try {

      
          let  json= yield call(rejectPurchaseOrderConfirmAPI,action)
            yield put({type:REJECT_PURCHASE_ORDER_CONFIRM_SUCCESS})
            yield put({type:GET_DETAIL_PURCHASE_ORDER_SUCCESS, json})
    } catch (error) {
     
        yield put({ type: REJECT_PURCHASE_ORDER_CONFIRM_ERROR })
    }

}
function* sendMailPriceQuoteFlow(action){
    
    try{
      let  json= yield call(sendEmailQuote,action)
        yield put({type:SEND_MAIL_SERVICE_SUCCESS})
        yield put({type:GET_DETAIL_PURCHASE_ORDER_SUCCESS, json})
    }catch(error){
        yield put({type:SEND_MAIL_SERVICE_ERROR})
    }

}
function* createPurchaseOrderFlow(action){
    
    try{
       
      let  json= yield call(createPurchaseOrderAPI,action)
        yield put({type:CREATE_PURCHASE_ORDER_SUCCESS, json})
        yield put({type: GET_DETAIL_PURCHASE_ORDER_SUCCESS, json})
    }catch(error){
      
        yield put({type:CREATE_PURCHASE_ORDER_ERROR})
    }

}

function* updateWatcher() {

    yield takeEvery(GET_DETAIL_PURCHASE_ORDER, getDetailPurchaseOrderFlow)
    yield takeEvery(SUBMIT_PURCHASE_ORDER_REQUEST, submitPurchaseOrderFlow)
    yield takeEvery(SAVE_PRODUCTS_PURCHASE_ORDER_REQUEST, saveProductsPurchaseOrderFlow)
    yield takeEvery(CONFIRM_PURCHASE_ORDER_REQUEST, confirmPurchaseOrderFlow)
    // yield takeEvery(GET_PRODUCT_PURCHASE_ORDER, getProductPurchaseOrderFlow)
    yield takeEvery(REJECT_PURCHASE_ORDER_CONFIRM_REQUEST, rejectPurchaseOrderConfirmFlow)
    yield takeEvery(EDIT_PRICE_QUOTE_REQUEST, editPriceQuoteFlow)
    yield takeEvery (SEND_MAIL_SERVICE_REQUEST, sendMailPriceQuoteFlow)
    yield takeEvery (CREATE_PRICE_QUOTE_REQUEST, createPriceQuoteFlow)
    yield takeEvery (CREATE_PURCHASE_ORDER_REQUEST, createPurchaseOrderFlow)
    
    

}

export default updateWatcher