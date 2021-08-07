import {GET_DETAIL_PURCHASE_ORDER, 
      
    CONFIRM_PURCHASE_ORDER_REQUEST,
    SAVE_PRODUCTS_PURCHASE_ORDER_REQUEST, REJECT_PURCHASE_ORDER_CONFIRM_REQUEST,
    EDIT_PRICE_QUOTE_REQUEST,SEND_MAIL_SERVICE_REQUEST, CREATE_PRICE_QUOTE_REQUEST, CREATE_PURCHASE_ORDER_REQUEST, SUBMIT_PURCHASE_ORDER_REQUEST
 } from './contants'
export  function getDetailPurchaseOrder({orderID, token}){
   
    return {
        type: GET_DETAIL_PURCHASE_ORDER,
        orderID,
        token
    }
}
export  function createPriceQuote({data, token}){
   
    return {
        type: CREATE_PRICE_QUOTE_REQUEST,
        data,
        token
    }
}

export function createPurchaseOrder({data, token}){
    return {
        type: CREATE_PURCHASE_ORDER_REQUEST,
        data,
        token,
    }
}

export  function sendMailService({data, token}){
    
    return{
        type:SEND_MAIL_SERVICE_REQUEST,
        data,
        token,
    }
}

export function confirmDetailPurchaseOrder({data, token}){
    return {
        type: SUBMIT_PURCHASE_ORDER_REQUEST,
        token,
        data,
    }
}
export function saveProductsPurchaseOrder({data, token}){
    return {
        type: SAVE_PRODUCTS_PURCHASE_ORDER_REQUEST,
        data,
        token
    }
}
export function confirmPurchaseORderByManager({data, token}){
    return {
        type: CONFIRM_PURCHASE_ORDER_REQUEST,
        data,
        token
    }
}
// export function getProductPurchaseOrder(productId){
//     return {
//         type: GET_PRODUCT_PURCHASE_ORDER,
//         productId,
//     }
// }
// export function setDefailtProductPurchaseOrder(){
//     return {
//         type: SET_DEFAULT_PRODUCT_PURCHASE_ORDER,
      
//     }
// }
export function rejectPurchaseOrderConfirm({data, token}){
    
    return {
        type: REJECT_PURCHASE_ORDER_CONFIRM_REQUEST,
        data,
        token
      
    }
}

export function editPriceQuote({data, token}){
    
    return {
        type: EDIT_PRICE_QUOTE_REQUEST,
        data,
        token
      
    }
}