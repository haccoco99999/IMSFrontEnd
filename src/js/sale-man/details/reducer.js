import {
  GET_DETAILS_PR_REQUEST,
  GET_DETAILS_PR_RESPONSE,
  GET_DETAILS_PR_ERROR,
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

    default:
      return state;
  }
}
