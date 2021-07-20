
import {
    GET_DETAIL_PURCHASE_ORDER, GET_DETAIL_PURCHASE_ORDER_SUCCESS, GET_DETAIL_PURCHASE_ORDER_ERROR,

    SEND_CONFIRM_PURCHASE_ORDER_REQUEST,
    SEND_CONFIRM_PURCHASE_ORDER_SUCCESS,
    SEND_CONFIRM_PURCHASE_ORDER_ERROR,

    CONFIRM_PURCHASE_ORDER_REQUEST,
    CONFIRM_PURCHASE_ORDER_SUCCESS,
    CONFIRM_PURCHASE_ORDER_ERROR,

    SAVE_PRODUCTS_PURCHASE_ORDER_REQUEST,
    SAVE_PRODUCTS_PURCHASE_ORDER_SUCCESS,
    SAVE_PRODUCTS_PURCHASE_ORDER_ERROR,


    // GET_PRODUCT_PURCHASE_ORDER, 
    // GET_PRODUCT_PURCHASE_ORDER_SUCCESS,
    //  GET_PRODUCT_PURCHASE_ORDER_ERROR,



    REJECT_PURCHASE_ORDER_CONFIRM_REQUEST,
    REJECT_PURCHASE_ORDER_CONFIRM_SUCCESS,
    REJECT_PURCHASE_ORDER_CONFIRM_ERROR,

    SEND_MAIL_SERVICE_REQUEST,
    SEND_MAIL_SERVICE_SUCCESS,
    SEND_MAIL_SERVICE_ERROR,

    EDIT_PRICE_QUOTE_REQUEST,
    EDIT_PRICE_QUOTE_SUCCESS,
    EDIT_PRICE_QUOTE_ERROR,
    CREATE_PRICE_QUOTE_REQUEST,
    CREATE_PRICE_QUOTE_SUCCESS,
    CREATE_PRICE_QUOTE_ERROR,
    CREATE_PURCHASE_ORDER_REQUEST,
    CREATE_PURCHASE_ORDER_SUCCESS,
    CREATE_PURCHASE_ORDER_ERROR
} from './contants'


const initalState = {
    requesting: false,
    successful: false,
    messages: "",
    errors: "",
    detailPurchaseOrder: {
        orderId: "",
        deliveryDate:"",
        deadline:"",
        supplier: {
            id: "",
            address: "",
            supplierName: "",
            phoneNumber: "",
            email: "",
        },
        transaction: {
            createdBy: {}
        },
        applicationUser: {
     
            createDate: "2019-04-19T09:05:17.641865",
            id: "07241",
            name: "Eileen9",
            orderId: "44424",
            transactionId: "14433",
            email:"da89d8c@gmail.com",
            phoneNumber:"032464564"
        },
        mailDescription: "",
        purchaseOrderProduct: [{

            id: "",
            orderId: "",
            productVariantId: "",
            orderQuantity: 0,
            unit: "",
            price: 0,
            discountAmount: 0,
            totalAmount: 0,
            name: "",
            sku: "",
        }

        ]
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
                mailDescription: "",

            }
        case GET_DETAIL_PURCHASE_ORDER_SUCCESS:

            return {
                ...state,
                requesting: false,
                successful: true,
                messages: "",
                errors: "",
                detailPurchaseOrder: {
                    orderId: action.json.purchaseOrder.id,
                    supplier: {
                        id: action.json.purchaseOrder.supplier.id,
                        address: action.json.purchaseOrder.supplier.address,
                        supplierName: action.json.purchaseOrder.supplier.supplierName,
                        phoneNumber: action.json.purchaseOrder.supplier.phoneNumber,
                        email: action.json.purchaseOrder.supplier.email,



                    },
                    transaction: {
                        createdBy: {}
                    },
                    applicationUser: {
     
                        createDate: "2019-04-19T09:05:17.641865",
                        id: "07241",
                        name: "Eileen9",
                        orderId: "44424",
                        transactionId: "14433",
                        email:"da89d8c@gmail.com",
                        phoneNumber:"032464564"
                    },
                    deliveryDate:action.json.purchaseOrder.deliveryDate.split("T")[0],
                    deadline:action.json.purchaseOrder.deadline.split("T")[0],
                    supplier: {
                        id: action.json.purchaseOrder.supplier.id,
                        address: action.json.purchaseOrder.supplier.address,
                        supplierName: action.json.purchaseOrder.supplier.supplierName,
                        phoneNumber: action.json.purchaseOrder.supplier.phoneNumber,
                        email: action.json.purchaseOrder.supplier.email
                    },
                    mailDescription: action.json.purchaseOrder.mailDescription === null? "":action.json.purchaseOrder.mailDescription,
                    purchaseOrderProduct: action.json.purchaseOrder.purchaseOrderProduct.map(product => {

                        return {

                            id: product.id,
                           
                            productVariantId: product.productVariantId,
                            orderQuantity: product.orderQuantity,
                            unit: product.unit,
                            price: product.price,
                            discountAmount: product.discountAmount,
                            totalAmount: product.totalAmount,
                            name: product.productVariant.name,
                            sku: product.productVariant.sku,
                        }
                    })
                }

            }
        case GET_DETAIL_PURCHASE_ORDER_ERROR:
            return {
                ...state,
                requesting: false,
                successful: false,
                messages: "",
                errors: "error",

            }
        // case SEND_CONFIRM_PURCHASE_ORDER:
        //     return {
        //         ...state,
        //         requesting: true,
        //         successful: false,
        //         messages: "",
        //         errors: "",

        //     }
        // case INGORE_PURCHASE_ORDER_CONFIRM:
        //     return {
        //         ...state,
        //         requesting: true,
        //         successful: false,
        //         messages: "",
        //         errors: "",

        //     }
        // case CONFIRM_PURCHASE_ORDER_BY_MAMAGER:
        //     return {
        //         ...state,
        //         requesting: true,
        //         successful: false,
        //         messages: "",
        //         errors: "",

        //     }
        // case SAVE_PRODUCTS_PURCHASE_ORDER_REQUEST:
        //     return {
        //         ...state,
        //         requesting: true,
        //         successful: false,
        //         messages: "",
        //         errors: "",

        //     }
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

// export const productPurchaseOrderReducer = function productPurchaseOrderReducer(state = productState, action) {
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

const mailDataState = {
    requesting: false,
    successful: false,
    messages: "",
    errors: "",
}
export const mailOrderData = function SendMailReducer(state = mailDataState, action) {
    switch (action.type) {
        case SEND_MAIL_SERVICE_REQUEST:
            return {
                requesting: true,
                successful: false,
                messages: "",
                errors: "",

            }
        case SEND_MAIL_SERVICE_SUCCESS:

            return {
                requesting: false,
                successful: true,
                messages: "",
                errors: "",

            }
        case SEND_MAIL_SERVICE_ERROR:
            return {
                requesting: false,
                successful: false,
                messages: "",
                errors: "error",

            }
        default:
            return state
    }
}
const priceQuoteCreateState = {
    requesting: false,
    successful: false,
    messages: "",
    errors: "",
}
export const priceQuoteCreate = function priceQuoteCreateReducer(state = priceQuoteCreateState, action) {
    switch (action.type) {
        case CREATE_PRICE_QUOTE_REQUEST:
            return {
                requesting: true,
                successful: false,
                messages: "",
                errors: "",

            }
        case CREATE_PRICE_QUOTE_SUCCESS:

            return {
                requesting: false,
                successful: true,
                messages: "",
                errors: "",

            }
        case CREATE_PRICE_QUOTE_ERROR:
            return {
                requesting: false,
                successful: false,
                messages: "",
                errors: "error",

            }
        default:
            return state
    }
}

const rejectPurchaserOrderState = {
    requesting: false,
    successful: false,
    messages: "",
    errors: "",
}
export const rejectPurchaserOrder = function rejectPurchaserOrder(state = rejectPurchaserOrderState, action) {
    switch (action.type) {
        case REJECT_PURCHASE_ORDER_CONFIRM_REQUEST:
            return {
                requesting: true,
                successful: false,
                messages: "",
                errors: "",

            }
        case REJECT_PURCHASE_ORDER_CONFIRM_SUCCESS:

            return {
                requesting: false,
                successful: true,
                messages: "",
                errors: "",

            }
        case REJECT_PURCHASE_ORDER_CONFIRM_ERROR:
            return {
                requesting: false,
                successful: false,
                messages: "",
                errors: "error",

            }
        default:
            return state
    }
}

const createPurchaserOrderState = {
    requesting: false,
    successful: false,
    messages: "",
    errors: "",
}
export const createPurchaserOrder = function createPurchaserOrderReducer(state = createPurchaserOrderState, action) {
    switch (action.type) {
        case CREATE_PURCHASE_ORDER_REQUEST:
            return {
                requesting: true,
                successful: false,
                messages: "",
                errors: "",

            }
        case CREATE_PURCHASE_ORDER_SUCCESS:

            return {
                requesting: false,
                successful: true,
                messages: "",
                errors: "",

            }
        case CREATE_PURCHASE_ORDER_ERROR:
            return {
                requesting: false,
                successful: false,
                messages: "",
                errors: "error",

            }
        default:
            return state
    }
}
const priceQuoteDataEditState = {
    requesting: false,
    successful: false,
    messages: "",
    errors: "",
}

export const priceQuoteDataEdit = function editPriceQuoteDataReducer(state = priceQuoteDataEditState, action) {
    switch (action.type) {
        case EDIT_PRICE_QUOTE_REQUEST:
            return {
                requesting: true,
                successful: false,
                messages: "",
                errors: "",

            }
        case EDIT_PRICE_QUOTE_SUCCESS:

            return {
                requesting: false,
                successful: true,
                messages: "",
                errors: "",

            }
        case EDIT_PRICE_QUOTE_ERROR:
            return {
                requesting: false,
                successful: false,
                messages: "",
                errors: "error",

            }
        default:
            return state
    }
}
const createConfirmState = {
    requesting: false,
    successful: false,
    messages: "",
    errors: "",
}

export const purchaseOrderConfirmSended = function purchaseOrderConfirmSendedReducer(state = createConfirmState, action) {
    switch (action.type) {
        case SEND_CONFIRM_PURCHASE_ORDER_REQUEST:
            return {
                requesting: true,
                successful: false,
                messages: "",
                errors: "",

            }
        case SEND_CONFIRM_PURCHASE_ORDER_SUCCESS:

            return {
                requesting: false,
                successful: true,
                messages: "",
                errors: "",

            }
        case SEND_CONFIRM_PURCHASE_ORDER_ERROR:
            return {
                requesting: false,
                successful: false,
                messages: "",
                errors: "error",

            }
        default:
            return state
    }
}

const confirmPurchaserOrderOfAdminState = {
    requesting: false,
    successful: false,
    messages: "",
    errors: "",
}

export const confirmPurchaserOrderOfManager = function confirmPurchaserOrderOfManagerReducer(state = confirmPurchaserOrderOfAdminState, action) {
    switch (action.type) {
        case CONFIRM_PURCHASE_ORDER_REQUEST:
            return {
                requesting: true,
                successful: false,
                messages: "",
                errors: "",

            }
        case CONFIRM_PURCHASE_ORDER_SUCCESS:

            return {
                requesting: false,
                successful: true,
                messages: "",
                errors: "",

            }
        case CONFIRM_PURCHASE_ORDER_ERROR:
            return {
                requesting: false,
                successful: false,
                messages: "",
                errors: "error",

            }
        default:
            return state
    }
}


const productPurchaseOrderUpdateState = {
    requesting: false,
    successful: false,
    messages: "",
    errors: "",
}

export const productPurchaseOrderUpdate = function productPurchaseOrderUpdateStateRedcer(state = productPurchaseOrderUpdateState, action) {
    switch (action.type) {
        case SAVE_PRODUCTS_PURCHASE_ORDER_REQUEST:
            return {
                requesting: true,
                successful: false,
                messages: "",
                errors: "",

            }
        case SAVE_PRODUCTS_PURCHASE_ORDER_SUCCESS:

            return {
                requesting: false,
                successful: true,
                messages: "",
                errors: "",

            }
        case SAVE_PRODUCTS_PURCHASE_ORDER_ERROR:
            return {
                requesting: false,
                successful: false,
                messages: "",
                errors: "error",

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

