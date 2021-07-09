import {
  GET_DETAILS_STOCKTAKE_REQUEST,
  GET_DETAILS_STOCKTAKE_RESPONSE,
  GET_DETAILS_STOCKTAKE_ERROR,
  REJECT_STOCKTAKE_REQUEST,
  REJECT_STOCKTAKE_RESPONSE,
  REJECT_STOCKTAKE_ERROR,
  SUBMIT_REQUEST,
  SUBMIT_ERROR,
  SUBMIT_RESPONSE,
  ADJUST_REQUEST,
  ADJUST_RESPONSE,
  ADJUST_ERROR,
  UPDATE_STOCKTAKE_REQUEST,
  UPDATE_STOCKTAKE_RESPONSE,
  UPDATE_STOCKTAKE_ERROR,
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
    case REJECT_STOCKTAKE_REQUEST:
      return {
        ...state,
        requesting: false,
        successful: true,
        messages: "",
        errors: "",
    
      };
    case REJECT_STOCKTAKE_RESPONSE:
      return {
        ...state,
        requesting: false,
        successful: true,
        messages: "",
        errors: "",

      };
    case REJECT_STOCKTAKE_ERROR:
      return {
        ...state,
        requesting: false,
        successful: true,
        messages: "",
        errors: "",

      };
    case SUBMIT_REQUEST:
      return {
        ...state,
        requesting: false,
        successful: true,
        messages: "",
        errors: "",

      };
    case SUBMIT_RESPONSE:
      return {
        ...state,
        requesting: false,
        successful: true,
        messages: "",
        errors: "",

      };
    case SUBMIT_ERROR:
      return {
        ...state,
        requesting: false,
        successful: true,
        messages: "",
        errors: "",

      };
    case ADJUST_REQUEST:
      return {
        ...state,
        requesting: false,
        successful: true,
        messages: "",
        errors: "",

      };
    case ADJUST_RESPONSE:
      return {
        ...state,
        requesting: false,
        successful: true,
        messages: "",
        errors: "",
   
      };
    case ADJUST_ERROR:
      return {
        ...state,
        requesting: false,
        successful: true,
        messages: "",
        errors: "",

      };
    case UPDATE_STOCKTAKE_REQUEST:
      return {
        ...state,
        requesting: false,
        successful: true,
        messages: "",
        errors: "",

      };
    case UPDATE_STOCKTAKE_RESPONSE:
      return {
        ...state,
        requesting: false,
        successful: true,
        messages: "",
        errors: "",

      };
    case UPDATE_STOCKTAKE_ERROR:
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
