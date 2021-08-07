import {GET_PRICE_QUOTE_REQUESTING, GET_DETAIL_QUOTE_PRODUCT_SUCCESS,SEARCH_PURCHASE_ORDER_ERROR,SEARCH_PURCHASE_ORDER} from './contants'
export   function searchPurchaseOrder({filter, token}){
       
    return {
        type: SEARCH_PURCHASE_ORDER,
        filter,
        token,
    }
}

export  function getListQuote({token}){
    
    return {
        type: GET_PRICE_QUOTE_REQUESTING,
        token,
 }
}