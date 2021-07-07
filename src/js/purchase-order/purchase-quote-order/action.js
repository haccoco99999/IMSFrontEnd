import {GET_DETAIL_QUOTE_PRODUCT_SUCCESS,SEARCH_PURCHASE_ORDER_ERROR,SEARCH_PURCHASE_ORDER} from './contants'
export default function searchPurchaseOrder(keySearch){
    
    return {
        type: SEARCH_PURCHASE_ORDER,
        keySearch,
    }
}