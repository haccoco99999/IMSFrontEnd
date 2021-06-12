import purchaseOrder from '../purchase-order'
import {GET_DETAIL_PURCHASE_ORDER,GET_DETAIL_PURCHASE_ORDER_SUCCESS,GET_DETAIL_PURCHASE_ORDER_ERROR} from './contants'


const initalState = {
    requesting: false,
    successful: false,
    messages: "",
    errors: "",
    detailPurchaseOrder:{
        transaction:{},
        supplier:{},
        transaction:{
            createdBy:{}
        },
        purchaseOrderProduct:{}
    }
}
const reducer = function getDetailPurchaseOrderReducer(state = initalState, action){
    switch(action.type){
        case GET_DETAIL_PURCHASE_ORDER:
            return{
                ...state,
                requesting: true,
                successful: false,
                messages: "",
                errors: "",
                
            }
        case GET_DETAIL_PURCHASE_ORDER_SUCCESS:
           
            return{
                ...state,
                requesting: false,
                successful: true,
                messages: "",
                errors: "",
                detailPurchaseOrder: action.json.purchaseOrder
            }
        case GET_DETAIL_PURCHASE_ORDER_ERROR:
            return{
                ...state,
                requesting: false,
                successful: false,
                messages: "",
                errors: "error",
               
            }
        default: 
            return state
    }
}
export default reducer
