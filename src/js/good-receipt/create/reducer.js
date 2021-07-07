// component
import {
  GET_CONFIRMED_PURCHASE_ORDER_REQUEST,
  GET_CONFIRMED_PURCHASE_ORDER_RESPONSE,
  GET_CONFIRMED_PURCHASE_ORDER_ERROR,

  //PO
  GET_DETAILS_PO_REQUEST,
  GET_DETAILS_PO_RESPONSE,
  GET_DETAILS_PO_ERROR,

  //SAVE
  SEND_CREATING_GOODS_RECEIPT_REQUEST,
  SEND_CREATING_GOODS_RECEIPT_RESPONSE,
  SEND_CREATING_GOODS_RECEIPT_ERROR,
} from "./constant";

const initialState = {
  requesting: false,
  successful: false,
  messages: "",
  errors: "",
  listConfirmedPurchaseOrder: [],
  listProducts: {
    purchaseOrderProduct: null,
  },
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_CONFIRMED_PURCHASE_ORDER_REQUEST:
      return {
        ...state,
        requesting: true,
        successful: false,
        messages: "",
        errors: "",
        listConfirmedPurchaseOrder: [],
      };
    case GET_CONFIRMED_PURCHASE_ORDER_RESPONSE:
      return {
        ...state,
        requesting: false,
        successful: true,
        messages: "",
        errors: "",
        listConfirmedPurchaseOrder: action.json.paging.resultList,
      };
    case GET_CONFIRMED_PURCHASE_ORDER_ERROR:
      return {
        ...state,
        requesting: false,
        successful: false,
        messages: "",
        errors: "",
        listConfirmedPurchaseOrder: [],
      };
    //Details
    case GET_DETAILS_PO_REQUEST:
      return {
        ...state,
        requesting: true,
        successful: false,
        messages: "",
        errors: "",
      };

    case GET_DETAILS_PO_RESPONSE:
      let cleanJson = { ...action.json.purchaseOrder };

      action.json.purchaseOrder.purchaseOrderProduct =
        cleanJson.purchaseOrderProduct.map((product) => {
          product.name = product.productVariant.name;
          product.sku = product.productVariant.sku;
          delete product["productVariant"];
          return product;
        });

      return {
        ...state,

        requesting: false,
        successful: true,
        messages: "",
        errors: "",
        listProducts: action.json.purchaseOrder,
      };

    case GET_DETAILS_PO_ERROR:
      return {
        ...state,
        requesting: false,
        successful: false,
        messages: "",
        errors: "",
        listProducts: [],
      };

    case SEND_CREATING_GOODS_RECEIPT_REQUEST:
      return {
        ...state,
        requesting: true,
        successful: false,
        messages: "",
        errors: "",
      };

    case SEND_CREATING_GOODS_RECEIPT_RESPONSE:
      console.log(action.json.createdGoodsReceiptId)
      return {
        ...state,
        requesting: false,
        successful: true,
        messages: action.json.createdGoodsReceiptId,
        errors: "",
      };

    case SEND_CREATING_GOODS_RECEIPT_ERROR:
      return {
        ...state,
        requesting: false,
        successful: false,
        messages: "",
        errors: "",
      };

    default:
      return state;
  }
}
