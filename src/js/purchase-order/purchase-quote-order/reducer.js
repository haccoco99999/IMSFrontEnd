import {SEARCH_PURCHASE_ORDER_SEARCH,SEARCH_PURCHASE_ORDER_ERROR,SEARCH_PURCHASE_ORDER} from './contants'


const initalState = {
    requesting: false,
    successful: false,
    messages: "",
    errors: "",
    listPurchaseOrder: []
}
const reducer = function searchPurchaseOrderReducer(state = initalState, action){
    switch(action.type){
        case SEARCH_PURCHASE_ORDER:
            return{
                requesting: true,
                successful: false,
                messages: "",
                errors: "",
                listPurchaseOrder: []
            }
        case SEARCH_PURCHASE_ORDER_SEARCH:
           console.log(action.json.paging.resultList)
            return{
                requesting: false,
                successful: true,
                messages: "",
                errors: "",
                listPurchaseOrder: action.json.paging.resultList
            }
        case SEARCH_PURCHASE_ORDER_ERROR:
            return{
                requesting: false,
                successful: false,
                messages: "",
                errors: "error",
                listPurchaseOrder: []
            }
        
        default: 
            return state
    }
}
export default reducer
