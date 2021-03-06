import { GET_SP_REQUEST, GET_SP_RESPONSE, GET_SP_ERROR } from "./constants";

const initialState = {
  requesting: false,
  successful: false,
  messages: "",
  errors: false,
  currentPage: 0,
  pageCount: 0,
  sizePerPage: 0,
  rowCountTotal: 0,
  listSuppliers: [],
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_SP_REQUEST:
      return {
        ...state,
        requesting: true,
        successful: false,
        messages: "",
        errors: false,
      };

    case GET_SP_RESPONSE:
      return {
        ...state,
        requesting: false,
        successful: true,
        messages: "",
        errors: false,
        listSuppliers: action.json.paging.resultList,
        currentPage: action.json.paging.currentPage,
        pageCount: action.json.paging.pageCount,
        sizePerPage: action.json.paging.sizePerPage,
        rowCountTotal: action.json.paging.rowCountTotal,
      };

    case GET_SP_ERROR:
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
