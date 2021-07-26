import { GET_SP_REQUEST, GET_SP_RESPONSE, GET_SP_ERROR } from "./constants";

const initialState = {
  requesting: false,
  successful: false,
  messages: "",
  errors: "",
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
        errors: "",
      };

    case GET_SP_RESPONSE:
      return {
        ...state,
        requesting: false,
        successful: true,
        messages: "",
        errors: "",
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
        errors: "",
        
      };

    default:
      return state;
  }
}
