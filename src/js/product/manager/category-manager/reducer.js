import {
  GET_ALL_CATEGORY_REQUEST,
  GET_ALL_CATEGORY_RESPONSE,
  GET_ALL_CATEGORY_ERROR,
} from "../../constants";

const initialState = {
  requesting: false,
  successful: false,
  messages: "",
  errors: "",
  currentPage: 0,
  pageCount: 0,
  sizePerPage: 0,
  rowCountTotal: 0,
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
      };

    case GET_ALL_CATEGORY_RESPONSE:
      console.log(action.json)
      return {
        ...state,
        requesting: false,
        successful: true,
        messages: "",
        errors: "",
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
