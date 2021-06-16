import {GET_DETAIL_PURCHASE_ORDER, 
    SEND_CONFIRM_PURCHASE_ORDER, 
    CONFIRM_PURCHASE_ORDER_BY_MAMAGER,
    SAVE_PRODUCTS_PURCHASE_ORDER} from './contants'
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