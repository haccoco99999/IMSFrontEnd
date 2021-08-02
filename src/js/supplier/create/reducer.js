import {
  CREAT_SUPPLIER_REQUEST,
  CREAT_SUPPLIER_RESPONSE,
  CREAT_SUPPLIER_ERROR,
  RESET,
} from "./constants";

const initialState = {
  requesting: false,
  successful: false,
  messages: "",
  errors: "",
};

export function createSupplierReducer(state = initialState, action) {
  switch (action.type) {
    case CREAT_SUPPLIER_REQUEST:
      return {
        ...state,
        requesting: true,
        successful: false,
        messages: "",
        errors: "",
      };
    case CREAT_SUPPLIER_RESPONSE:
      if (action.json === undefined)
        return {
          ...state,
          requesting: false,
          successful: true,
          messages: "Duplicate",
          errors: true,
        };
      else
        return {
          ...state,
          requesting: false,
          successful: true,
          messages: action.json.modifiedSupplierId,
          errors: "",
        };
    case CREAT_SUPPLIER_ERROR:
      return {
        ...state,
        requesting: false,
        successful: false,
        messages: "",
        errors: "",
      };

    case RESET:
      return initialState;
    default:
      return state;
  }
}
