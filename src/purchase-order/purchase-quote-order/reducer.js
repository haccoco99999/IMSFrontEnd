import {
    GET_PRICE_QUOTE_REQUESTING, GET_PRICE_QUOTE_SUCCESS, GET_PRICE_QUOTE_ERROR,
    SEARCH_PURCHASE_ORDER_SEARCH, SEARCH_PURCHASE_ORDER_ERROR, SEARCH_PURCHASE_ORDER,
    GET_LIST_PURCHASE_ORDER_ERROR, GET_LIST_PURCHASE_ORDER_REQUESTING, GET_LIST_PURCHASE_ORDER_SUCCESS,

} from './contants'
import moment from "moment";

const initalState = {
    requestingPO: false,
    successfulPO: false,
    messagesPO: "",
    errorsPO: "",

    requestingPQ: false,
    successfulPQ: false,
    messagesPQ: "",
    errorsPQ: "",
    
    listPurchaseOrder: [],
    listQuote: [],
  
    infoTablePage:{
        currentPage: 0,
        pageCount: 0,
        sizePerPage: 0,
        rowCountTotal: 0,
    }
 
}
const reducer = function searchPurchaseOrderReducer(state = initalState, action) {
    console.log(action)
    switch (action.type) {
        
        case SEARCH_PURCHASE_ORDER:
            return {
                ...state,
                requestingPO: true,
                successfulPO: false,
                messagesPO: "",
                errorsPO: false,
                listPurchaseOrder: [],
                purchaserOrderFilter : action.filter
            }
        case SEARCH_PURCHASE_ORDER_SEARCH:
            let listPurchaseOrder = action.json.paging.resultList.map(item => {
                return {
                    ...item,
                    deadline:  moment(item.deadline).add(7, "h").format("DD-MM-YYYY"),
                    deliveryDate:  moment(item.deliveryDate).add(7, "h").format("DD-MM-YYYY"),
                    confirmedDate:moment(item.confirmedDate).add(7, "h").format("DD-MM-YYYY"),
                    createdDate: moment(item.createdDate).add(7, "h").format("DD-MM-YYYY "),
                    modifiedDate: moment(item.modifiedDate).add(7, "h").format("DD-MM-YYYY"),
                }
             })
            return {
                ...state,
                requestingPO: false,
                successfulPO: true,
                messagesPO: "",
                errorsPO: false,
                listPurchaseOrder: listPurchaseOrder,
                infoTablePage:{
                currentPage: action.json.paging.currentPage,
                pageCount: action.json.paging.pageCount,
                sizePerPage: action.json.paging.sizePerPage,
                rowCountTotal: action.json.paging.rowCountTotal
                },
                // purchaserOrderFilter : action.json.purchaserOrderFilter
            }
        case SEARCH_PURCHASE_ORDER_ERROR:
            return {
                ...state,
                requestingPO: false,
                successfulPO: false,
                messagesPO: "",
                errorsPO: true,
                listPurchaseOrder: []
            }
        case GET_PRICE_QUOTE_REQUESTING:

            return {
                ...state,
                requestingPQ: true,
                successfulPQ: false,
                messagesPQ: "",
                errorsPQ: false,
                listQuote: []
            }
        case GET_PRICE_QUOTE_SUCCESS:
            console.log(action.json.paging.resultList)
            return {
                ...state,
                requestingPQ: false,
                successfulPQ: true,
                messagesPQ: "",
                errorsPQ: false,
                listQuote: action.json.paging.resultList
            }
        case GET_PRICE_QUOTE_ERROR:
            return {
                ...state,
                requestingPQ: false,
                successfulPQ: false,
                messagesPQ: "",
                errorsPQ: true,
                listQuote: []
            }

        default:
            return state
    }
}
export default reducer

