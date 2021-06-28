
import {
    GET_DETAIL_PURCHASE_ORDER, GET_DETAIL_PURCHASE_ORDER_SUCCESS, GET_DETAIL_PURCHASE_ORDER_ERROR,
    SEND_CONFIRM_PURCHASE_ORDER, SAVE_PRODUCTS_PURCHASE_ORDER, CONFIRM_PURCHASE_ORDER_BY_MAMAGER,
    GET_PRODUCT_PURCHASE_ORDER, GET_PRODUCT_PURCHASE_ORDER_SUCCESS, GET_PRODUCT_PURCHASE_ORDER_ERROR,
    SET_DEFAULT_PRODUCT_PURCHASE_ORDER, 
    INGORE_PURCHASE_ORDER_CONFIRM,INGORE_PURCHASE_ORDER_CONFIRM_ERROR,INGORE_PURCHASE_ORDER_CONFIRM_SUCCESS
} from './contants'


const initalState = {
    requesting: false,
    successful: false,
    messages: "",
    errors: "",
    detailPurchaseOrder: {

        supplier: {},
        transaction: {
            createdBy: {}
        },
        purchaseOrderProduct: null
    }
}
export const getDetailPurchaseReducer = function getDetailPurchaseOrderReducer(state = initalState, action) {
    switch (action.type) {
        case GET_DETAIL_PURCHASE_ORDER:
            return {
                ...state,
                requesting: true,
                successful: false,
                messages: "",
                errors: "",

            }
        case GET_DETAIL_PURCHASE_ORDER_SUCCESS:
            let clearJson = { ...action.json.purchaseOrder }

            action.json.purchaseOrder.purchaseOrderProduct = clearJson.purchaseOrderProduct.map(product => {

                product.name = product.productVariant.name
                product.productVariant.variantValues.map(variant => product.name += " " + variant.attribute)
                delete product["productVariant"]
                return product
            })

            return {
                ...state,
                requesting: false,
                successful: true,
                messages: "",
                errors: "",
                detailPurchaseOrder: action.json.purchaseOrder,

            }
        case GET_DETAIL_PURCHASE_ORDER_ERROR:
            return {
                ...state,
                requesting: false,
                successful: false,
                messages: "",
                errors: "error",

            }
        case SEND_CONFIRM_PURCHASE_ORDER:
            return {
                ...state,
                requesting: true,
                successful: false,
                messages: "",
                errors: "",

            }
        case INGORE_PURCHASE_ORDER_CONFIRM:
            return {
                ...state,
                requesting: true,
                successful: false,
                messages: "",
                errors: "",

            }
        case CONFIRM_PURCHASE_ORDER_BY_MAMAGER:
            return {
                ...state,
                requesting: true,
                successful: false,
                messages: "",
                errors: "",

            }
        case SAVE_PRODUCTS_PURCHASE_ORDER:
            return {
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

const productState = {
    requesting: false,
    successful: false,
    messages: "",
    errors: "",
    product: {}
}

export const productPurchaseOrderReducer = function productPurchaseOrderReducer(state = productState, action) {
    switch (action.type) {
        case GET_PRODUCT_PURCHASE_ORDER:
            return {

                requesting: true,
                successful: false,
                messages: "",
                errors: "",

            }
        case GET_PRODUCT_PURCHASE_ORDER_SUCCESS:
            let product = {
                id: action.json.paging.resultList[0].productId,
                orderId: "",
                productVariantId: action.json.paging.resultList[0].id,
                orderQuantity: 0,
                unit: action.json.paging.resultList[0].unit,
                price: 0,
                discountAmount: 0,
                totalAmount: 0,
                name: action.json.paging.resultList[0].name,
            }

            return {

                requesting: false,
                successful: true,
                messages: "",
                errors: "",
                product: product,

            }
        case GET_PRODUCT_PURCHASE_ORDER_ERROR:
            return {

                requesting: false,
                successful: false,
                messages: "",
                errors: "error",

            }
        case SET_DEFAULT_PRODUCT_PURCHASE_ORDER:
            return {

                requesting: false,
                successful: false,
                messages: "",
                errors: "",
                product: {}
            }

        default:
            return state
    }
}


// const productState = {
//     requesting: false,
//     successful: false,
//     messages: "",
//     errors: "",
//     product: {}
// }
// export const ignorePurchaseOrderConfirmReducer = function ignorePurchaseOrderConfirmReducer(state = productState, action) {
//     switch (action.type) {
//         case GET_PRODUCT_PURCHASE_ORDER:
//             return {

//                 requesting: true,
//                 successful: false,
//                 messages: "",
//                 errors: "",

//             }
//         case GET_PRODUCT_PURCHASE_ORDER_SUCCESS:
//             let product = {
//                 id: action.json.paging.resultList[0].productId,
//                 orderId: "",
//                 productVariantId: action.json.paging.resultList[0].id,
//                 orderQuantity: 0,
//                 unit: action.json.paging.resultList[0].unit,
//                 price: 0,
//                 discountAmount: 0,
//                 totalAmount: 0,
//                 name: action.json.paging.resultList[0].name,
//             }

//             return {

//                 requesting: false,
//                 successful: true,
//                 messages: "",
//                 errors: "",
//                 product: product,

//             }
//         case GET_PRODUCT_PURCHASE_ORDER_ERROR:
//             return {

//                 requesting: false,
//                 successful: false,
//                 messages: "",
//                 errors: "error",

//             }
//         case SET_DEFAULT_PRODUCT_PURCHASE_ORDER:
//             return {

//                 requesting: false,
//                 successful: false,
//                 messages: "",
//                 errors: "",
//                 product: {}
//             }

//         default:
//             return state
//     }
// }

