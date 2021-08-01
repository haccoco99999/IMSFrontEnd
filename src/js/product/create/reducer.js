import {
  CREATE_PRODUCT_REQUEST,
  CREATE_PRODUCT_RESPONSE,
  CREATE_PRODUCT_ERROR,
  GET_ALL_CATEGORY_CREATED_RESPONSE,
  GET_ALL_CATEGORY_CREATED_REQUEST,
  GET_ALL_CATEGORY_CREATED_ERROR,
  RESET,
} from "./constants";

const initialState = {
  requesting: false,
  successful: false,
  messages: "",
  errors: false,
  listCategories: [],
};

export function createProductReducer(state = initialState, action) {
  switch (action.type) {
    case CREATE_PRODUCT_REQUEST:
      return {
        ...state,
        requesting: true,
        successful: false,
        messages: "",
        errors: false,
      };

    case CREATE_PRODUCT_RESPONSE:
      return {
        ...state,
        requesting: false,
        successful: true,
        messages: action.json.createdProductId,
        errors: false,
      };

    case CREATE_PRODUCT_ERROR:
      return {
        ...state,
        requesting: false,
        successful: false,
        messages: "",
        errors: true,
      };

    case RESET:
      return initialState;
    default:
      return state;
  }
}

const categoriesState = {
  requesting: false,
  successful: false,
  messages: "",
  errors: false,
  listCategories: [],
};

export function getCategoriesCreateProductReducer(
  state = categoriesState,
  action
) {
  switch (action.type) {
    case GET_ALL_CATEGORY_CREATED_REQUEST:
      return {
        ...state,
        requesting: true,
        successful: false,
        messages: "",
        errors: false,
      };

    case GET_ALL_CATEGORY_CREATED_RESPONSE:
      return {
        ...state,
        requesting: false,
        successful: true,
        messages: "",
        errors: false,
        listCategories: action.json.paging.resultList,
      };

    case GET_ALL_CATEGORY_CREATED_ERROR:
      return {
        ...state,
        requesting: false,
        successful: false,
        messages: "",
        errors: true,
        listCategories: [],
      };

    default:
      return state;
  }
}
