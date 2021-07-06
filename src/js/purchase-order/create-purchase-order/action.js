import {GET_DETAIL_PURCHASE_ORDER, 
    SEND_CONFIRM_PURCHASE_ORDER, 
    CONFIRM_PURCHASE_ORDER_BY_MAMAGER,
    SAVE_PRODUCTS_PURCHASE_ORDER, GET_PRODUCT_PURCHASE_ORDER,SET_DEFAULT_PRODUCT_PURCHASE_ORDER, INGORE_PURCHASE_ORDER_CONFIRM
 } from './contants'
export  function getDetailPurchaseOrder(orderID){
   
    return {
        type: GET_DETAIL_PURCHASE_ORDER,
        orderID,
    }
}
export function confirmDetailPurchaseOrder(orderID){
    return {
        type: SEND_CONFIRM_PURCHASE_ORDER,
        orderID,
    }
}
export function saveProductsPurchaseOrder(orderID){
    return {
        type: SAVE_PRODUCTS_PURCHASE_ORDER,
        orderID,
    }
}
export function confirmPurchaseORderByManager(orderID){
    return {
        type: CONFIRM_PURCHASE_ORDER_BY_MAMAGER,
        orderID,
    }
}
export function getProductPurchaseOrder(productId){
    return {
        type: GET_PRODUCT_PURCHASE_ORDER,
        productId,
    }
}
export function setDefailtProductPurchaseOrder(){
    return {
        type: SET_DEFAULT_PRODUCT_PURCHASE_ORDER,
      
    }
}
export function ignorePurchaseOrderConfirm(orderID){
    
    return {
        type: INGORE_PURCHASE_ORDER_CONFIRM,
        orderID,
      
    }
}