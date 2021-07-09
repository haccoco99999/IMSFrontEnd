import {
  CREATE_STOCKTAKE_REQUEST,
  CREATE_STOCKTAKE_RESPONSE,
  CREATE_STOCKTAKE_ERROR,
  GET_LOCATION_REQUEST,
  GET_LOCATION_RESPONSE,
  GET_LOCATION_ERROR,
} from "./constants";

const initalState = {
  requesting: false,
  successful: false,
  messages: "",
  errors: "",
  listLocations: [],
};

export default function reducer(state = initalState, action) {
  switch (action.type) {
    case GET_LOCATION_REQUEST:
      return {
        ...state,
        requesting: true,
        successful: false,
        messages: "",
        errors: "",
      };
    case GET_LOCATION_RESPONSE:
      return {
        ...state,
        requesting: false,
        successful: true,
        messages: "",
        errors: "",
        listLocations: action.json.paging.resultList,
      };
    case GET_LOCATION_ERROR:
      return {
        ...state,
        requesting: false,
        successful: false,
        messages: "",
        errors: "",
        listLocations: [],
      };
    default:
      return state;
  }
}
