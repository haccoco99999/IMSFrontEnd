import {GET_DETAIL_PURCHASE_ORDER,GET_DETAIL_PURCHASE_ORDER_SUCCESS,GET_DETAIL_PURCHASE_ORDER_ERROR} from './contants'
export default function getDetailPurchaseOrder(orderID){
    return {
        type: GET_DETAIL_PURCHASE_ORDER,
        orderID,
    }
}