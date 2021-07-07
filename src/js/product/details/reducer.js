import {
  GET_DETAILS_PRODUCT_REQUEST,
  GET_DETAILS_PRODUCT_RESPONSE,
  GET_DETAILS_PRODUCT_ERROR,
  UPDATE_PRODUCT_REQUEST,
  UPDATE_PRODUCT_RESPONSE,
  UPDATE_PRODUCT_ERROR,
} from "./constants";

const initialState = {
  requesting: false,
  successful: false,
  messages: "",
  errors: "",
  productDetails: {},
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_DETAILS_PRODUCT_REQUEST:
      return {
        ...state,
        requesting: true,
        successful: false,
        messages: "",
        errors: "",
        productDetails: {},
      };
    case GET_DETAILS_PRODUCT_RESPONSE:
      console.log(action.json);
      return {
        ...state,
        requesting: false,
        successful: true,
        messages: "",
        errors: "",
        productDetails: action.json.product,
      };
    case GET_DETAILS_PRODUCT_ERROR:
      return {
        ...state,
        requesting: false,
        successful: false,
        messages: "",
        errors: "",
        productDetails: {},
      };
    case UPDATE_PRODUCT_REQUEST:
      return {
        requesting: true,
        successful: false,
        messages: "",
        errors: "",
      };
    case UPDATE_PRODUCT_RESPONSE:
      return {
        ...state,
        requesting: false,
        successful: true,
        messages: "Update Success",
        errors: "",
      };
    case UPDATE_PRODUCT_ERROR:
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
