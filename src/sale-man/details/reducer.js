import {
  GET_DETAILS_PR_REQUEST,
  GET_DETAILS_PR_RESPONSE,
  GET_DETAILS_PR_ERROR,
  SUBMIT_PR_REQUEST,
  SUBMIT_PR_RESPONSE,
  SUBMIT_PR_ERROR,
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
  errors: false,

  purchaseRequisitionDetails: {
    supplier: {},
    purchaseOrderProduct: [
      {
        productVariant: {
          name: "",
        },
      },
    ],
    transaction: {
      transactionRecord: [{ date: "", applicationUser: {} }],
    },
    deadline: "",
  },
};

export function getDetailsPurchaseRequisitionReducer(
  state = initialState,
  action
) {
  switch (action.type) {
    case GET_DETAILS_PR_REQUEST:
      return {
        ...state,
        requesting: true,
        successful: false,
        messages: "",
        errors: false,
      };

    case GET_DETAILS_PR_RESPONSE:
      return {
        ...state,
        requesting: false,
        successful: true,
        messages: "",
        errors: false,
        purchaseRequisitionDetails: action.json.purchaseOrder,
      };

    case GET_DETAILS_PR_ERROR:
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

const submitState = {
  requesting: false,
  successful: false,
  messages: "",
  errors: false,
};
export function submitDraftReducer(state = submitState, action) {
  switch (action.type) {
    case SUBMIT_PR_REQUEST:
      return {
        ...state,
        requesting: true,
        successful: false,
        messages: "",
        errors: false,
      };
    case SUBMIT_PR_RESPONSE:
      return {
        ...state,
        requesting: false,
        successful: true,
        messages: "Submit Success",
        errors: false,
      };
    case SUBMIT_PR_ERROR:
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
const updateState = {
  requesting: false,
  successful: false,
  messages: "",
  errors: false,
};
export function updatePRReducer(state = updateState, action) {
  switch (action.type) {
    case UPDATE_PR_REQUEST:
      return {
        ...state,
        requesting: true,
        successful: false,
        messages: "",
        errors: false,
      };
    case UPDATE_PR_RESPONSE:
      return {
        ...state,
        requesting: false,
        successful: true,
        messages: "Update Success",
        errors: false,
      };
    case UPDATE_PR_ERROR:
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
const deleteState = {
  requesting: false,
  successful: false,
  messages: "",
  errors: false,
};
export function deletePRReducer(state = deleteState, action) {
  switch (action.type) {
    case DELETE_PR_REQUEST:
      return {
        ...state,
        requesting: true,
        successful: false,
        messages: "",
        errors: false,
      };
    case DELETE_PR_RESPONSE:
      return {
        ...state,
        requesting: false,
        successful: true,
        messages: "Delete Success",
        errors: false,
      };
    case DELETE_PR_ERROR:
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
