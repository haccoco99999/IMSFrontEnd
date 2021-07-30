
import {
    GET_DETAIL_PURCHASE_ORDER, GET_DETAIL_PURCHASE_ORDER_SUCCESS, GET_DETAIL_PURCHASE_ORDER_ERROR,


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
    CREATE_PURCHASE_ORDER_ERROR,

    SUBMIT_PURCHASE_ORDER_REQUEST,
    SUBMIT_PURCHASE_ORDER_SUCCESS,
    SUBMIT_PURCHASE_ORDER_ERROR,
    GET_DETAIL_PURCHASE_ORDER_RESET,
    SEND_MAIL_SERVICE_RESET,
    CREATE_PRICE_QUOTE_RESET,
    REJECT_PURCHASE_ORDER_CONFIRM_RESET,
    CREATE_PURCHASE_ORDER_RESET,
    EDIT_PRICE_QUOTE_RESET,
    SUBMIT_PURCHASE_ORDER_RESET,
    CONFIRM_PURCHASE_ORDER_RESET,
    SAVE_PRODUCTS_PURCHASE_ORDER_RESET
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
        status:"",
        supplier: {
           
        },
        mergedOrderIdLists:[],
        applicationUser: {
     
            createDate: "2019-04-19T09:05:17.641865",
            id: "07241",
            name: "Eileen9",
            orderId: "44424",
            transactionId: "14433",
            email:"da89d8c@gmail.com",
            phoneNumber:"032464564"
        },

        transaction:{
            transactionRecord:[
                {
                applicationUser:{}
                }
            ]
        },

        hasSentMail:"",
        mailDescription: "",
        purchaseOrderProduct: [{

            id: "",
         
            productVariantId: "",
            orderQuantity: 0,
            unit: "",
            price: 0,
            discountAmount: 0,
            totalAmount: 0,
            name: "",
            sku: "",
        }]
       

        
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
            console.log(action.json)
            return {
                ...state,
                requesting: false,
                successful: true,
                messages: "",
                errors: "",
                detailPurchaseOrder: {
                    orderId: action.json.purchaseOrder.id,
                    status: action.json.purchaseOrder.purchaseOrderStatusString,
                    transaction: action.json.purchaseOrder.transaction,
                    mergedOrderIdLists: action.json.mergedOrderIdLists !== undefined? action.json.mergedOrderIdLists: [] ,
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
                    supplier:action.json.purchaseOrder.supplier !== null? {
                        id: action.json.purchaseOrder.supplier.id,
                        address: action.json.purchaseOrder.supplier.address,
                        supplierName: action.json.purchaseOrder.supplier.supplierName,
                        phoneNumber: action.json.purchaseOrder.supplier.phoneNumber,
                        email: action.json.purchaseOrder.supplier.email
                    }:{},
                    hasSentMail: action.json.purchaseOrder.hasSentMail,
                    mailDescription: action.json.purchaseOrder.mailDescription === null? "":action.json.purchaseOrder.mailDescription,
                    purchaseOrderProduct: action.json.purchaseOrder.purchaseOrderProduct.map(product => {

                        return {

                           
                           
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
        case GET_DETAIL_PURCHASE_ORDER_RESET:
            return initalState
          
        default:
            return state
    }
}





const mailDataState = {
    requesting: false,
    successful: false,
    messages: "",
    errors: false,
}
export const mailOrderData = function SendMailReducer(state = mailDataState, action) {
    switch (action.type) {
        case SEND_MAIL_SERVICE_REQUEST:
            return {
                requesting: true,
                successful: false,
                messages: "",
                errors: false,

            }
        case SEND_MAIL_SERVICE_SUCCESS:

            return {
                requesting: false,
                successful: true,
                messages: "",
                errors: false,

            }
        case SEND_MAIL_SERVICE_ERROR:
            return {
                requesting: false,
                successful: false,
                messages: "",
                errors:  true,

            }
        case SEND_MAIL_SERVICE_RESET:
            return mailDataState
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
export const createPriceQuote = function createPriceQuoteReducer(state = priceQuoteCreateState, action) {
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
        case CREATE_PRICE_QUOTE_RESET:
            return priceQuoteCreateState
        default:
            return state
    }
}

const rejectPurchaserOrderState = {
    requesting: false,
    successful: false,
    messages: "",
    errors: false,
}

export const rejectPurchaserOrder = function rejectPurchaserOrder(state = rejectPurchaserOrderState, action) {
    switch (action.type) {
        case REJECT_PURCHASE_ORDER_CONFIRM_REQUEST:
            return {
                requesting: true,
                successful: false,
                messages: "",
                errors: false,

            }
        case REJECT_PURCHASE_ORDER_CONFIRM_SUCCESS:

            return {
                requesting: false,
                successful: true,
                messages: "",
                errors: false,

            }
        case REJECT_PURCHASE_ORDER_CONFIRM_ERROR:
            return {
                requesting: false,
                successful: false,
                messages: "",
                errors: true,

            }
        case REJECT_PURCHASE_ORDER_CONFIRM_RESET:
            return rejectPurchaserOrderState
        default:
            return state
    }
}

const createPurchaserOrderState = {
    requesting: false,
    successful: false,
    messages: "",
    errors: false,
}
export const createPurchaserOrder = function createPurchaserOrderReducer(state = createPurchaserOrderState, action) {
    switch (action.type) {
        case CREATE_PURCHASE_ORDER_REQUEST:
            return {
                requesting: true,
                successful: false,
                messages: "",
                errors: false,

            }
        case CREATE_PURCHASE_ORDER_SUCCESS:

            return {
                requesting: false,
                successful: true,
                messages: "",
                errors: false,

            }
        case CREATE_PURCHASE_ORDER_ERROR:
            return {
                requesting: false,
                successful: false,
                messages: "",
                errors: true,

            }
        case CREATE_PURCHASE_ORDER_RESET:
            return createPurchaserOrderState
        default:
            return state
    }
}
const priceQuoteDataEditState = {
    requesting: false,
    successful: false,
    messages: "",
    errors: false,
}

export const PriceQuoteUpdate = function editPriceQuoteDataReducer(state = priceQuoteDataEditState, action) {
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
                errors: true,

            }
        case EDIT_PRICE_QUOTE_RESET:
            return priceQuoteDataEditState
        default:
            return state
    }
}
const createConfirmState = {
    requesting: false,
    successful: false,
    messages: "",
    errors: false,
}

export const submitPurchaseOrder = function purchaseOrderConfirmSendedReducer(state = createConfirmState, action) {
    switch (action.type) {
        case SUBMIT_PURCHASE_ORDER_REQUEST:
            return {
                requesting: true,
                successful: false,
                messages: "",
                errors: false,

            }
        case SUBMIT_PURCHASE_ORDER_SUCCESS:

            return {
                requesting: false,
                successful: true,
                messages: "",
                errors: false,

            }
        case SUBMIT_PURCHASE_ORDER_ERROR:
            return {
                requesting: false,
                successful: false,
                messages: "",
                errors: true,

            }
        case SUBMIT_PURCHASE_ORDER_RESET:
            return createConfirmState
        default:
            return state
    }
}

const confirmPurchaserOrderOfAdminState = {
    requesting: false,
    successful: false,
    messages: "",
    errors: false,
}

export const confirmPurchaserOrder = function confirmPurchaserOrderOfManagerReducer(state = confirmPurchaserOrderOfAdminState, action) {
    switch (action.type) {
        case CONFIRM_PURCHASE_ORDER_REQUEST:
            return {
                requesting: true,
                successful: false,
                messages: "",
                errors: false,

            }
        case CONFIRM_PURCHASE_ORDER_SUCCESS:

            return {
                requesting: false,
                successful: true,
                messages: "",
                errors: false,

            }
        case CONFIRM_PURCHASE_ORDER_ERROR:
            return {
                requesting: false,
                successful: false,
                messages: "",
                errors: true,

            }
        case CONFIRM_PURCHASE_ORDER_RESET:
            return confirmPurchaserOrderOfAdminState
        default:
            return state
    }
}


const productPurchaseOrderUpdateState = {
    requesting: false,
    successful: false,
    messages: "",
    errors: false,
}

export const updatePurchaseOrder = function productPurchaseOrderUpdateStateRedcer(state = productPurchaseOrderUpdateState, action) {
    switch (action.type) {
        case SAVE_PRODUCTS_PURCHASE_ORDER_REQUEST:
            return {
                requesting: true,
                successful: false,
                messages: "",
                errors: false,

            }
        case SAVE_PRODUCTS_PURCHASE_ORDER_SUCCESS:

            return {
                requesting: false,
                successful: true,
                messages: "Update Success",
                errors: false,

            }
        case SAVE_PRODUCTS_PURCHASE_ORDER_ERROR:
            return {
                requesting: false,
                successful: false,
                messages: "",
                errors: true

            }
        case SAVE_PRODUCTS_PURCHASE_ORDER_RESET:
            return productPurchaseOrderUpdateState
        default:
            return state
    }
}

