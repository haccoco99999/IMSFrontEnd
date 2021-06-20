import purchaseOrder from '../purchase-order'
import {GET_DETAIL_PURCHASE_ORDER,GET_DETAIL_PURCHASE_ORDER_SUCCESS,GET_DETAIL_PURCHASE_ORDER_ERROR,
    SEND_CONFIRM_PURCHASE_ORDER, SAVE_PRODUCTS_PURCHASE_ORDER,CONFIRM_PURCHASE_ORDER_BY_MAMAGER} from './contants'


const initalState = {
    requesting: false,
    successful: false,
    messages: "",
    errors: "",
    detailPurchaseOrder:{
        
        supplier:{},
        transaction:{
            createdBy:{}
        },
        purchaseOrderProduct:null
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
           let clearJson = {...action.json.purchaseOrder}
         
           action.json.purchaseOrder.purchaseOrderProduct=  clearJson.purchaseOrderProduct.map(product => {
              
               product.name = product.productVariant.name
                product.productVariant.variantValues.map(variant=>  product.name+=" " +variant.attribute)
                delete product["productVariant"]
               return product
           })
          
            return{
                ...state,
                requesting: false,
                successful: true,
                messages: "",
                errors: "",
                detailPurchaseOrder: action.json.purchaseOrder,
               
            }
        case GET_DETAIL_PURCHASE_ORDER_ERROR:
            return{
                ...state,
                requesting: false,
                successful: false,
                messages: "",
                errors: "error",
               
            }
        case SEND_CONFIRM_PURCHASE_ORDER:
            return{
                ...state,
                requesting: true,
                successful: false,
                messages: "",
                errors: "",
               
            }
        case CONFIRM_PURCHASE_ORDER_BY_MAMAGER:
            return{
                ...state,
                requesting: true,
                successful: false,
                messages: "",
                errors: "",
               
            }
        case SAVE_PRODUCTS_PURCHASE_ORDER:
            return{
                ...state,
                requesting: true,
                successful: false,
                messages: "",
                errors: "",
               
            }
        default: 
            return state
    }
}
export default reducer
