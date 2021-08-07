import {
  GET_ALL_STOCKTAKE_REQUEST,
  GET_ALL_STOCKTAKE_RESPONSE,
  GET_ALL_STOCKTAKE_ERROR,
} from "./constants";

const initialState = {
  requesting: false,
  successful: false,
  messages: "",
  errors: "",
  currentPage: 0,
  pageCount: 0,
  sizePerPage: 0,
  rowCountTotal: 0,
  listStocktakes: [],
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_STOCKTAKE_REQUEST:
      return {
        ...state,
        listStocktakes: [],
        requesting: true,
        successful: false,
        messages: "",
        errors: false,
      };
    case GET_ALL_STOCKTAKE_RESPONSE:
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
        listStocktakes: action.json.paging.resultList,
      };
    case GET_ALL_STOCKTAKE_ERROR:
      return {
        ...state,
        requesting: false,
        successful: false,
        messages: "",
        errors: true,
      };
    default:
      return state;
  }
}
