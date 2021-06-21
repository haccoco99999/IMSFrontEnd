import {
  GET_ALL_PR_REQUEST,
  GET_ALL_PR_RESPONSE,
  GET_ALL_PR_ERROR,
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
  listPurchaseRequisition: []
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_PR_REQUEST:
      return {
        ...state,
        requesting: true,
        successful: false,
        messages: "",
        errors: "",
        listPurchaseRequisition: [],

      };

    case GET_ALL_PR_RESPONSE:
        let listPurchaseOrder = action.json.paging.resultList.map(item => {
            return {
                ...item, deliveryDate: item.deliveryDate.split("T")[0],
                createdDate:item.createdDate.split("T")[0],
                modifiedDate:item.modifiedDate.split("T")[0],
            }
         })
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
        listPurchaseRequisition: listPurchaseOrder
      };

    case GET_ALL_PR_ERROR:
      return {
        ...state,
        requesting: false,
        successful: false,
        messages: "",
        errors: "",
        listPurchaseRequisition: [],
      };

    default:
      return state;
  }
}
