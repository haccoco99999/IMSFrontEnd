import {
  GET_ALL_ACCOUNT_REQUEST,
  GET_ALL_ACCOUNT_RESPONSE,
  GET_ALL_ACCOUNT_ERROR,
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
  listAccounts: [],
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_ACCOUNT_REQUEST:
      return {
        requesting: true,
        successful: false,
        messages: "",
        errors: "",
        listAccounts: [],
      };
    case GET_ALL_ACCOUNT_RESPONSE:
      let clearJson = [...action.json.paging.resultList];
      action.json.paging.resultList = clearJson.map((item) => {
        item.id = item.imsUser.id;
        item.email = item.imsUser.email;
        item.phoneNumber = item.imsUser.phoneNumber;
        item.fullname = item.imsUser.fullname;
        item.isActive = "";
        if (item.imsUser.isActive) item.isActive = "Active";
        else item.isActive = "Deactive";
        delete item["imsUser"];
        return item;
      });
      return {
        requesting: false,
        successful: true,
        messages: "",
        errors: "",
        currentPage: action.json.paging.currentPage,
        pageCount: action.json.paging.pageCount,
        sizePerPage: action.json.paging.sizePerPage,
        rowCountTotal: action.json.paging.rowCountTotal,
        listAccounts: action.json.paging.resultList,
      };
    case GET_ALL_ACCOUNT_ERROR:
      return {
        requesting: false,
        successful: false,
        messages: "",
        errors: "",
        listAccounts: [],
      };
    default:
      return state;
  }
}
