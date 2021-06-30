import {
  GET_DETAILS_PR_REQUEST,
  GET_DETAILS_PR_RESPONSE,
  GET_DETAILS_PR_ERROR,
  SUBMIT_REQUEST,
  SUBMIT_RESPONSE,
  SUBMIT_ERROR,
  UPDATE_PR_REQUEST,
  UPDATE_PR_ERROR,
  UPDATE_PR_RESPONSE,
  DELETE_PR_REQUEST,
  DELETE_PR_RESPONSE,
  DELETE_PR_ERROR,
  CLEAR_MESSAGE,
} from "./constants";

const initialState = {
  requesting: false,
  successful: false,
  messages: "",
  errors: "",

  purchaseRequisitionDetails: {
    supplier: {},
    purchaseOrderProduct: null,
    transaction: {
      createdBy: {},
      createdDate: "",
    },
  },
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_DETAILS_PR_REQUEST:
      return {
        ...state,
        requesting: true,
        successful: false,
        messages: "",
        errors: "",
      };

    case GET_DETAILS_PR_RESPONSE:
      return {
        ...state,
        requesting: false,
        successful: true,
        messages: "",
        errors: "",
        purchaseRequisitionDetails: action.json.purchaseOrder,
      };

    case GET_DETAILS_PR_ERROR:
      return {
        ...state,
        requesting: false,
        successful: false,
        messages: "",
        errors: "",
      };

    case SUBMIT_REQUEST:
      return {
        ...state,
        requesting: true,
        successful: false,
        messages: "",
        errors: "",
      };
    case SUBMIT_RESPONSE:
      return {
        ...state,
        requesting: false,
        successful: true,
        messages: "Submit Success",
        errors: "",
      };
    case SUBMIT_ERROR:
      return {
        ...state,
        requesting: false,
        successful: false,
        messages: "",
        errors: "",
      };

    case UPDATE_PR_REQUEST:
      return {
        ...state,
        requesting: true,
        successful: false,
        messages: "",
        errors: "",
      };
    case UPDATE_PR_RESPONSE:
      return {
        ...state,
        requesting: false,
        successful: true,
        messages: "Update Success",
        errors: "",
      };
    case UPDATE_PR_ERROR:
      return {
        ...state,
        requesting: false,
        successful: false,
        messages: "",
        errors: "",
      }; case DELETE_PR_REQUEST:
      return {
        ...state,
        requesting: true,
        successful: false,
        messages: "",
        errors: "",
      };
    case DELETE_PR_RESPONSE:
      return {
        ...state,
        requesting: false,
        successful: true,
        messages: "Delete Success",
        errors: "",
      };
    case DELETE_PR_ERROR:
      return {
        ...state,
        requesting: false,
        successful: false,
        messages: "",
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
    default:
      return state;
  }
}
