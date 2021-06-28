import {
  CREATE_PRODUCT_REQUEST,
  CREATE_PRODUCT_RESPONSE,
  CREATE_PRODUCT_ERROR,
  GET_ALL_CATEGORY_CREATED_RESPONSE,
  GET_ALL_CATEGORY_CREATED_REQUEST,
  GET_ALL_CATEGORY_CREATED_ERROR,
} from "./constants";

const initialState = {
  requesting: false,
  successful: false,
  messages: "",
  errors: "",
  listCategories: [],
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case CREATE_PRODUCT_REQUEST:
      return {
        ...state,
        requesting: true,
        successful: false,
        messages: "",
        errors: "",
      };

    case CREATE_PRODUCT_RESPONSE:
      return {
        ...state,
        requesting: false,
        successful: true,
        messages: action.json.createdProductId,
        errors: "",
      };

    case CREATE_PRODUCT_ERROR:
      return {
        ...state,
        requesting: false,
        successful: false,
        messages: "",
        errors: "",
      };

    case GET_ALL_CATEGORY_CREATED_REQUEST:
      return {
        ...state,
        requesting: true,
        successful: false,
        messages: "",
        errors: "",
        listCategories: [],
      };

    case GET_ALL_CATEGORY_CREATED_RESPONSE:
      return {
        ...state,
        requesting: false,
        successful: true,
        messages: "",
        errors: "",
        listCategories: action.json.categories,
      };

    case GET_ALL_CATEGORY_CREATED_ERROR:
      return {
        ...state,
        requesting: false,
        successful: false,
        messages: "",
        errors: "",
        listCategories: [],
      };

    default:
      return state;
  }
}
