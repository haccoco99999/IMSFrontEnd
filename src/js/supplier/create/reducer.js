import {
  CREAT_SUPPLIER_REQUEST,
  CREAT_SUPPLIER_RESPONSE,
  CREAT_SUPPLIER_ERROR,
} from "./constants";

const initialState = {
  requesting: false,
  successful: false,
  messages: "",
  errors: "",
};

const reducer = function createSupplierReducer(state = initialState, action) {
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
    default:
      return state;
  }
}
export default reducer;