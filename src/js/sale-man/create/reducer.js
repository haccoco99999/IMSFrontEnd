import {
  CREATE_PR_REQUEST,
  CREATE_PR_RESPONSE,
  CREATE_PR_ERROR,
  CLEAR_MESSAGE,
  GET_ALL_SUPPLIER_REQUEST,
  GET_ALL_SUPPLIER_RESPONSE,
  GET_ALL_SUPPLIER_ERROR,
} from "./constants";

const initialState = {
  requesting: false,
  successful: false,
  messages: "",
  errors: "",
  listSuppliers: [],
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case CREATE_PR_REQUEST:
      return {
        ...state,
        requesting: true,
        successful: false,
        messages: "",
        errors: "",
      };

    case CREATE_PR_RESPONSE:
      console.log(action.json);
      return {
        ...state,
        requesting: false,
        successful: true,
        messages: action.json.createdRequisitionId,
        errors: "",
      };
    case CLEAR_MESSAGE:
      return {
        ...state,
        requesting: false,
        successful: true,
        messages: "",
        errors: "",
      };

    case CREATE_PR_ERROR:
      return {
        ...state,
        requesting: false,
        successful: false,
        messages: "",
        errors: "",
      };
    case GET_ALL_SUPPLIER_REQUEST:
      return {
        ...state,
        requesting: true,
        successful: false,
        messages: "",
        errors: "",
        listSuppliers: [],
      };
    case GET_ALL_SUPPLIER_RESPONSE:
      let clearJson = [...action.json.paging.resultList];
      console.log(clearJson);
      action.json.paging.resultList = clearJson.map((item) => {
        delete item["modifiedBy"];
        delete item["confirmedBy"];
        delete item["transaction"];
        return item;
      });
      return {
        ...state,
        requesting: false,
        successful: true,
        messages: "",
        errors: "",
        listSuppliers: action.json.paging.resultList,
      };
    case GET_ALL_SUPPLIER_ERROR:
      return {
        ...state,
        requesting: false,
        successful: false,
        messages: "",
        errors: "",
        listSuppliers: [],
      };
    default:
      return state;
  }
}
