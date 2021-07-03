import {
  GET_DETAILS_SUPPLIER_REQUEST,
  GET_DETAILS_SUPPLIER_RESPONSE,
  GET_DETAILS_SUPPLIER_ERROR,
  UPDATE_SUPPLIER_REQUEST,
  UPDATE_SUPPLIER_RESPONSE,
  UPDATE_SUPPLIER_ERROR,
  DELETE_SUPPLIER_REQUEST,
  DELETE_SUPPLIER_RESPONSE,
  DELETE_SUPPLIER_ERROR,
  CLEAR_MESSAGE,
} from "./constants";

const initialState = {
  requesting: false,
  successful: false,
  messages: "",
  errors: "",
  supplierDetails: {},
};

const reducer = function GoodsReceiptReducer(state = initialState, action) {
  switch (action.type) {
    case GET_DETAILS_SUPPLIER_REQUEST:
      return {
        ...state,
        requesting: true,
        successful: false,
        messages: "",
        errors: "",
        supplierDetails: {},
      };
    case GET_DETAILS_SUPPLIER_RESPONSE:
      return {
        ...state,
        requesting: false,
        successful: true,
        messages: "",
        errors: "",
        supplierDetails: action.json.paging.resultList[0],
      };
    case GET_DETAILS_SUPPLIER_ERROR:
      return {
        ...state,
        requesting: false,
        successful: false,
        messages: "",
        errors: "error",
        supplierDetails: {},
      };
    case UPDATE_SUPPLIER_REQUEST:
      return {
        ...state,
        requesting: true,
        successful: false,
        messages: "",
        errors: "",
      };
    case UPDATE_SUPPLIER_RESPONSE:
      return {
        ...state,
        requesting: false,
        successful: true,
        messages: action.json.modifiedSupplierId,
        errors: "",
      };
    case UPDATE_SUPPLIER_ERROR:
      return {
        ...state,
        requesting: false,
        successful: false,
        messages: "",
        errors: "error",
      };
    case DELETE_SUPPLIER_REQUEST:
      return {
        ...state,
        requesting: true,
        successful: false,
        messages: "",
        errors: "",
      };
    case DELETE_SUPPLIER_RESPONSE:
      return {
        ...state,
        requesting: false,
        successful: true,
        messages: "Delete Success",
        errors: "",
      };
    case DELETE_SUPPLIER_ERROR:
      return {
        ...state,
        requesting: false,
        successful: false,
        messages: "",
        errors: "error",
      };
    case CLEAR_MESSAGE:
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
};

export default reducer;
