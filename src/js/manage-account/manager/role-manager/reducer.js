import {
  GET_ALL_ROLE_REQUEST,
  GET_ALL_ROLE_RESPONSE,
  GET_ALL_ROLE_ERROR,
} from "../../constants";

const initalState = {
  requesting: false,
  success: false,
  messages: "",
  errors: "",
  currentPage: 0,
  pageCount: 0,
  sizePerPage: 0,
  rowCountTotal: 0,
  listRoles: [],
};

const reducer = function RoleManagerReducer(state = initalState, action) {
  switch (action.type) {
    case GET_ALL_ROLE_REQUEST:
      return {
        requesting: true,
        successful: false,
        messages: "",
        errors: "",
        listRoles: [],
      };
    case GET_ALL_ROLE_RESPONSE:
      return {
        requesting: false,
        successful: true,
        messages: "",
        errors: "",
        currentPage: action.json.paging.currentPage,
        pageCount: action.json.paging.pageCount,
        sizePerPage: action.json.paging.sizePerPage,
        rowCountTotal: action.json.paging.rowCountTotal,
        listRoles: action.json.paging.resultList,
      };
    case GET_ALL_ROLE_ERROR:
      return {
        requesting: false,
        successful: false,
        messages: "",
        errors: "error",
        listRoles: [],
      };
    default:
      return state;
  }
};

export default reducer;
