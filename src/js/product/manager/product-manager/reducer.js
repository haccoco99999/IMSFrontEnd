import {
  GET_ALL_PRODUCTS_REQUEST,
  GET_ALL_PRODUCTS_RESPONSE,
  GET_ALL_PRODUCTS_ERROR,
} from "../../constants";

const initialState = {
  requesting: false,
  successful: false,
  messages: "",
  errors: "",
  listProducts: [],
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_PRODUCTS_REQUEST:
      return {
        ...state,
        requesting: true,
        successful: false,
        messages: "",
        errors: "",
        listProducts: [],
      };

    case GET_ALL_PRODUCTS_RESPONSE:
      return {
        ...state,
        requesting: false,
        successful: true,
        messages: "",
        errors: "",
        listProducts: action.json.paging.resultList,
      };

    case GET_ALL_PRODUCTS_ERROR:
      return {
        ...state,

        requesting: false,
        successful: false,
        messages: "",
        errors: "",
        listProducts: [],
      };
    default:
      return state;
  }
}
