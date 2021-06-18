import {
  GET_ALL_CATEGORY_REQUEST,
  GET_ALL_CATEGORY_RESPONSE,
  GET_ALL_CATEGORY_ERROR,
  GET_ALL_CATEGORY_CREATE_PAGE_REQUEST,
  GET_ALL_CATEGORY_CREATE_PAGE_RESPONSE,
} from "../../constants";

const initialState = {
  requesting: false,
  successful: false,
  messages: "",
  errors: "",
  listCategories: [],
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_CATEGORY_REQUEST:
      return {
        ...state,
        requesting: true,
        successful: false,
        messages: "",
        errors: "",
        listCategories: [],
      };

    case GET_ALL_CATEGORY_RESPONSE:
      return {
        ...state,
        requesting: false,
        successful: true,
        messages: "",
        errors: "",
        listCategories: action.json.categories,
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

    case GET_ALL_CATEGORY_CREATE_PAGE_REQUEST:
      return {
        ...state,
        requesting: true,
        successful: false,
        messages: "",
        errors: "",
        listCategories: [],
      };
    case GET_ALL_CATEGORY_CREATE_PAGE_RESPONSE:
      return {
        ...state,
        requesting: false,
        successful: true,
        messages: "",
        errors: "",
        listCategories: action.json.categories,
      };

    default:
      return state;
  }
}
