import {
  GET_GR_DETAILS_REQUEST,
  GET_GR_DETAILS_RESPONSE,
  GET_GR_DETAILS_ERROR,
} from "./constants";

const initialState = {
  requesting: false,
  successful: false,
  messages: "",
  errors: "",
  receivingOrder: {
    supplier: {},
    receivedOrderItems: [],
    transaction: {
     transactionRecord: [{ date: "", applicationUser: {} }],
    },
  },
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_GR_DETAILS_REQUEST:
      return {
        ...state,
        requesting: true,
        successful: false,
        messages: "",
        errors: "",
      };

    case GET_GR_DETAILS_RESPONSE:
      return {
        ...state,
        requesting: false,
        successful: true,
        messages: "",
        errors: "",
        receivingOrder: action.json.receiveingOrder,
      };

    case GET_GR_DETAILS_ERROR:
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
