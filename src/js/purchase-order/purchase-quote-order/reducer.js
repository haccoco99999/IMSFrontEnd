import {
    GET_PRICE_QUOTE_REQUESTING, GET_PRICE_QUOTE_SUCCESS, GET_PRICE_QUOTE_ERROR,
    SEARCH_PURCHASE_ORDER_SEARCH, SEARCH_PURCHASE_ORDER_ERROR, SEARCH_PURCHASE_ORDER,
    GET_LIST_PURCHASE_ORDER_ERROR, GET_LIST_PURCHASE_ORDER_REQUESTING, GET_LIST_PURCHASE_ORDER_SUCCESS,

} from './contants'


const initalState = {
    requesting: false,
    successful: false,
    messages: "",
    errors: "",
    listPurchaseOrder: [],
    listQuote: [],
    currentPage: 0,
    pageCount: 0,
    sizePerPage: 0,
    rowCountTotal: 0,
}
const reducer = function searchPurchaseOrderReducer(state = initalState, action) {
    switch (action.type) {
        case SEARCH_PURCHASE_ORDER:
            return {
                ...state,
                requesting: true,
                successful: false,
                messages: "",
                errors: "",
                listPurchaseOrder: []
            }
        case SEARCH_PURCHASE_ORDER_SEARCH:
            let listPurchaseOrder = action.json.paging.resultList.map(item => {
                return {
                    ...item,
                    deliveryDate: item.deliveryDate.split("T")[0],
                    confirmedDate:item.confirmedDate.split("T")[0],
                    createdDate:item.createdDate.split("T")[0],
                    modifiedDate:item.modifiedDate.split("T")[0],
                }
             })
            return {
                ...state,
                requesting: false,
                successful: true,
                messages: "",
                errors: "",
                listPurchaseOrder: listPurchaseOrder,
                currentPage: action.json.paging.currentPage,
                pageCount: action.json.paging.pageCount,
                sizePerPage: action.json.paging.sizePerPage,
                rowCountTotal: action.json.paging.rowCountTotal,
            }
        case SEARCH_PURCHASE_ORDER_ERROR:
            return {
                ...state,
                requesting: false,
                successful: false,
                messages: "",
                errors: "error",
                listPurchaseOrder: []
            }
        case GET_PRICE_QUOTE_REQUESTING:

            return {
                ...state,
                requesting: true,
                successful: false,
                messages: "",
                errors: "",
                listQuote: []
            }
        case GET_PRICE_QUOTE_SUCCESS:

            return {
                ...state,
                requesting: false,
                successful: true,
                messages: "",
                errors: "",
                listQuote: action.json.paging.resultList
            }
        case GET_PRICE_QUOTE_ERROR:
            return {
                ...state,
                requesting: false,
                successful: false,
                messages: "",
                errors: "",
                listQuote: []
            }

        default:
            return state
    }
}
export default reducer
