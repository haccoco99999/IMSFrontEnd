import {GET_PRICE_QUOTE_REQUESTING , GET_PRICE_QUOTE_SUCCESS, GET_PRICE_QUOTE_ERROR,
    SEARCH_PURCHASE_ORDER_SEARCH,SEARCH_PURCHASE_ORDER_ERROR,SEARCH_PURCHASE_ORDER} from './contants'


const initalState = {
    requesting: false,
    successful: false,
    messages: "",
    errors: "",
    listPurchaseOrder: [],
    listQuote:[]
}
const reducer = function searchPurchaseOrderReducer(state = initalState, action){
    switch(action.type){
        case SEARCH_PURCHASE_ORDER:
            return{
                ...state,
                requesting: true,
                successful: false,
                messages: "",
                errors: "",
                listPurchaseOrder: []
            }
        case SEARCH_PURCHASE_ORDER_SEARCH:
            return{
                ...state,
                requesting: false,
                successful: true,
                messages: "",
                errors: "",
                listPurchaseOrder: action.json.paging.resultList
            }
        case SEARCH_PURCHASE_ORDER_ERROR:
            return{
                ...state,
                requesting: false,
                successful: false,
                messages: "",
                errors: "error",
                listPurchaseOrder: []
            }
            case GET_PRICE_QUOTE_REQUESTING:
             
                return{
                    ...state,
                    requesting: true,
                    successful: false,
                    messages: "",
                    errors: "",
                    listQuote: []
                }
            case GET_PRICE_QUOTE_SUCCESS:
                
                return{
                    ...state,
                    requesting: false,
                    successful: true,
                    messages: "",
                    errors: "",
                    listQuote: action.json.paging.resultList
                }
            case GET_PRICE_QUOTE_ERROR:
                return{
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
