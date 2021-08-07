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
  errors: false,
  // listSuppliers: [],
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case CREATE_PR_REQUEST:
      return {
        ...state,
        requesting: true,
        successful: false,
        messages: "",
        errors: false,
      };

    case CREATE_PR_RESPONSE:
      console.log(action.json);
      return {
        ...state,
        requesting: false,
        successful: true,
        messages: action.json.createdRequisitionId,
        errors: false,
      };

    case CREATE_PR_ERROR:
      return {
        ...state,
        requesting: false,
        successful: false,
        messages: "",
        errors: true,
      };

    case CLEAR_MESSAGE:
      return initialState;

    default:
      return state;
  }
}
