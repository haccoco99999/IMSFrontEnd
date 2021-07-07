import {
    GET_DETAILS_STOCKTAKE_REQUEST,
    GET_DETAILS_STOCKTAKE_RESPONSE,
    GET_DETAILS_STOCKTAKE_ERROR,
} from "./constants";

const initialState = {
  requesting: false,
  successful: false,
  messages: "",
  errors: "",
  goodIssue: {
    groupLocations: [],
  },
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_DETAILS_STOCKTAKE_REQUEST:
      return {
        ...state,
        requesting: true,
        successful: false,
        messages: "",
        errors: "",
        goodIssue: {}
      };
    case GET_DETAILS_STOCKTAKE_RESPONSE:
      return {
        ...state,
        requesting: false,
        successful: true,
        messages: "",
        errors: "",
        goodIssue: action.json.singleResult,
      };
    case GET_DETAILS_STOCKTAKE_ERROR:
      return {
        ...state,
        requesting: false,
        successful: true,
        messages: "",
        errors: "",
        goodIssue: {},
      };
    default:
      return state;
  }
}
