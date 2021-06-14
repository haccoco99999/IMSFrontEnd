import {GET_DETAIL_PURCHASE_ORDER,GET_DETAIL_PURCHASE_ORDER_SUCCESS,GET_DETAIL_PURCHASE_ORDER_ERROR, CONFIRM_PURCHASE_ORDER} from './contants'
export  function getDetailPurchaseOrder(orderID){
    return {
        type: GET_DETAIL_PURCHASE_ORDER,
        orderID,
    }
}
export function confirmDetailPurchaseOrder(orderID){
    return {
        type: CONFIRM_PURCHASE_ORDER,
        orderID,
    }
}