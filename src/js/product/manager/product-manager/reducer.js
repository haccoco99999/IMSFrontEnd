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
  currentPage: 0,
  pageCount: 0,
  sizePerPage: 0,
  rowCountTotal: 0,
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
      let clearJson = [...action.json.paging.resultList];
      console.log(clearJson);
      action.json.paging.resultList = clearJson.map((product) => {
        delete product["suggest"];
        delete product["variantIds"];
        return product;
      });
      console.log(action.json.paging.resultList);

      return {
        ...state,
        requesting: false,
        successful: true,
        messages: "",
        errors: "",
        listProducts: action.json.paging.resultList,
        currentPage: action.json.paging.currentPage,
        pageCount: action.json.paging.pageCount,
        sizePerPage: action.json.paging.sizePerPage,
        rowCountTotal: action.json.paging.rowCountTotal,
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
