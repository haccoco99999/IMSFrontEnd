import {GET_PRICE_QUOTE_REQUESTING, GET_DETAIL_QUOTE_PRODUCT_SUCCESS,SEARCH_PURCHASE_ORDER_ERROR,SEARCH_PURCHASE_ORDER} from './contants'
export   function searchPurchaseOrder({filter, token}){
       
    return {
        type: SEARCH_PURCHASE_ORDER,
        filter,
        token,
    }
}
export   function getListPurchseOrder({searchQuery,status, currentPage, sizePerPage}){
    
    return {
        type: SEARCH_PURCHASE_ORDER,
        searchQuery,
        status, 
        currentPage, 
        sizePerPage,
    }
}

export  function getListQuote(){
    
    return {
        type: GET_PRICE_QUOTE_REQUESTING,

 }
}