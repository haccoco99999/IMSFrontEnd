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
  errors: false,
  supplierDetails: {},
};

export function getDetailsSupplierReducer(state = initialState, action) {
  switch (action.type) {
    case GET_DETAILS_SUPPLIER_REQUEST:
      return {
        ...state,
        requesting: true,
        successful: false,
        messages: "",
        errors: false,
      };
    case GET_DETAILS_SUPPLIER_RESPONSE:
      return {
        ...state,
        requesting: false,
        successful: true,
        messages: "",
        errors: false,
        supplierDetails: action.json.paging.resultList[0],
      };
    case GET_DETAILS_SUPPLIER_ERROR:
      return {
        ...state,
        requesting: false,
        successful: false,
        messages: "",
        errors: true,
      };

    case CLEAR_MESSAGE:
      return initialState;
    default:
      return state;
  }
}

const updateState = {
  requesting: false,
  successful: false,
  messages: "",
  errors: false,
};
export function updateSupplierReducer(state = updateState, action) {
  switch (action.type) {
    case UPDATE_SUPPLIER_REQUEST:
      return {
        ...state,
        requesting: true,
        successful: false,
        messages: "",
        errors: false,
      };
    case UPDATE_SUPPLIER_RESPONSE:
      if (action.json === undefined)
        return {
          ...state,
          requesting: false,
          successful: true,
          messages: action.errorMsg,
          errors: true,
        };
      else
        return {
          ...state,
          requesting: false,
          successful: true,
          messages: "Update Success",
          errors: false,
        };
    case UPDATE_SUPPLIER_ERROR:
      return {
        ...state,
        requesting: false,
        successful: false,
        messages: "",
        errors: true,
      };
    case CLEAR_MESSAGE:
      return updateState;
    default:
      return state;
  }
}
const deleteState = {
  requesting: false,
  successful: false,
  messages: "",
  errors: false,
};

export function deleteSupplierReducer(state = deleteState, action) {
  switch (action.type) {
    case DELETE_SUPPLIER_REQUEST:
      return {
        ...state,
        requesting: true,
        successful: false,
        messages: "",
        errors: false,
      };
    case DELETE_SUPPLIER_RESPONSE:
      return {
        ...state,
        requesting: false,
        successful: true,
        messages: "Delete Success",
        errors: false,
      };
    case DELETE_SUPPLIER_ERROR:
      return {
        ...state,
        requesting: false,
        successful: false,
        messages: "",
        errors: true,
      };
    case CLEAR_MESSAGE:
      return deleteState;
    default:
      return state;
  }
}
