import {
  GET_ALL_GOOD_ISSUE_REQUEST,
  GET_ALL_GOOD_ISSUE_RESPONSE,
  GET_ALL_GOOD_ISSUE_ERROR,
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
  listGoodIssues: [],
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_GOOD_ISSUE_REQUEST:
      return {
        ...state,
        requesting: true,
        successful: false,
        messages: "",
        errors: "",
      };

    case GET_ALL_GOOD_ISSUE_RESPONSE:
      return {
          ...state,
          requesting: false,
          successful: true,
          messages: "",
          errors: "",
          listGoodIssues: action.json.paging.resultList,
          currentPage: action.json.paging.currentPage,
          pageCount: action.json.paging.pageCount,
          sizePerPage: action.json.paging.sizePerPage,
          rowCountTotal: action.json.paging.rowCountTotal,
      };

    case GET_ALL_GOOD_ISSUE_ERROR:
      return {
        ...state,
        requesting: false,
        successful: false,
        messages: "",
        errors: "",
        listGoodIssues: [],
      };
    default:
      return state;
  }
}
