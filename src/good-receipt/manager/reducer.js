import {
  SEARCH_GOODS_RECEIPT,
  SEARCH_GOODS_RECEIPT_ERROR,
  SEARCH_GOODS_RECEIPT_SUCCESS,
} from "./constant";

const initialState = {
  requesting: false,
  successful: false,
  messages: "",
  errors: "",
  currentPage: 0,
  pageCount: 0,
  sizePerPage: 0,
  rowCountTotal: 0,
  listGoodsReceipt: [],
};

const reducer = function GoodsReceiptReducer(state = initialState, action) {
  switch (action.type) {
    case SEARCH_GOODS_RECEIPT:
      return {
        ...state,
        requesting: true,
        successful: false,
        messages: "",
        errors: "",
        listGoodsReceipt: [],
      };
    case SEARCH_GOODS_RECEIPT_SUCCESS:
      return {
        ...state,
        requesting: false,
        successful: true,
        messages: "",
        errors: "",
        listGoodsReceipt: action.json.paging.resultList,
        currentPage: action.json.paging.currentPage,
        pageCount: action.json.paging.pageCount,
        sizePerPage: action.json.paging.sizePerPage,
        rowCountTotal: action.json.paging.rowCountTotal,
      };
    case SEARCH_GOODS_RECEIPT_ERROR:
      return {
        ...state,
        requesting: false,
        successful: false,
        messages: "",
        errors: "error",
        listGoodsReceipt: [],
      };
    default:
      return state;
  }
};

export default reducer;
