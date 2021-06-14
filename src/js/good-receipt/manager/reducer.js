import { SEARCH_GOODS_RECEIPT, SEARCH_GOODS_RECEIPT_ERROR } from "./constant";

const initialState = {
  requesting: false,
  successful: false,
  messages: "",
  errors: "",
  listGoodsReceipt: [],
};

const reducer = function GoodsReceiptReducer(state = initialState, action) {
  switch (action.type) {
    case SEARCH_GOODS_RECEIPT:
        console.log("Action",action.json)
      return {
        requesting: false,
        successful: true,
        messages: "",
        errors: "",
        listGoodsReceipt: action.json,
      };
    case SEARCH_GOODS_RECEIPT_ERROR:
      return {
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
