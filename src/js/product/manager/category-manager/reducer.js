import {
  GET_ALL_CATEGORY_REQUEST,
  GET_ALL_CATEGORY_RESPONSE,
  GET_ALL_CATEGORY_ERROR,
  CREATE_CATEGORY_REQUEST,
  CREATE_CATEGORY_RESPONSE,
  CREATE_CATEGORY_ERROR,
  UPDATE_CATEGORY_REQUEST,
  UPDATE_CATEGORY_RESPONSE,
  UPDATE_CATEGORY_ERROR,
  RESET,
} from "../constants";

const initialState = {
  requesting: false,
  successful: false,
  messages: "",
  errors: false,
  currentPage: 0,
  pageCount: 0,
  sizePerPage: 0,
  rowCountTotal: 0,
  listCategories: [],
};

export function getAllCategoriesReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_CATEGORY_REQUEST:
      return {
        ...state,
        requesting: true,
        successful: false,
        messages: "",
        errors: false,
      };

    case GET_ALL_CATEGORY_RESPONSE:
      // console.log(action.json);
      return {
        ...state,
        requesting: false,
        successful: true,
        messages: "",
        errors: false,
        currentPage: action.json.paging.currentPage,
        pageCount: action.json.paging.pageCount,
        sizePerPage: action.json.paging.sizePerPage,
        rowCountTotal: action.json.paging.rowCountTotal,
        listCategories: action.json.paging.resultList,
      };

    case GET_ALL_CATEGORY_ERROR:
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

const createCategoryState = {
  requesting: false,
  successful: false,
  messages: "",
  errors: false,
};
export function createCategoriesReducer(state = createCategoryState, action) {
  switch (action.type) {
    case CREATE_CATEGORY_REQUEST:
      return {
        ...state,
        requesting: true,
        successful: false,
        messages: "",
        errors: false,
      };
    case CREATE_CATEGORY_RESPONSE:
      return {
        ...state,
        requesting: false,
        successful: true,
        messages: "Create Success",
        errors: false,
      };
    case CREATE_CATEGORY_ERROR:
      return {
        ...state,
        requesting: false,
        successful: false,
        messages: "",
        errors: true,
      };
    case RESET:
      return createCategoryState;
    default:
      return state;
  }
}

const updateCategoryState = {
  requesting: false,
  successful: false,
  messages: "",
  errors: false,
};
export function updateCategoriesReducer(state = updateCategoryState, action) {
  switch (action.type) {
    case UPDATE_CATEGORY_REQUEST:
      return {
        ...state,
        requesting: true,
        successful: false,
        messages: "",
        errors: false,
      };
    case UPDATE_CATEGORY_RESPONSE:
      return {
        ...state,
        requesting: false,
        successful: true,
        messages: "Update Success",
        errors: false,
      };
    case UPDATE_CATEGORY_ERROR:
      return {
        ...state,
        requesting: false,
        successful: false,
        messages: "",
        errors: true,
      };
    case RESET:
      return updateCategoryState;
    default:
      return state;
  }
}
