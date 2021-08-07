import {
  GET_LOCATION_REQUEST,
  GET_LOCATION_RESPONSE,
  GET_LOCATION_ERROR,
} from "./constants";

const initialState = {
  requesting: false,
  successful: false,
  messages: "",
  errors: false,
  listLocations: [],
};

export function getAllLocationsReducer(state = initialState, action) {
  switch (action.type) {
    case GET_LOCATION_REQUEST:
      return {
        ...state,
        requesting: true,
        successful: false,
        messages: "",
        errors: false,
      };
    case GET_LOCATION_RESPONSE:
      return {
        ...state,
        requesting: false,
        successful: true,
        messages: "",
        errors: false,
        listLocations: action.json.paging.resultList,
      };

    case GET_LOCATION_ERROR:
      return {
        requesting: false,
        successful: false,
        messages: "",
        errors: true,
        listLocations: [],
      };
    default:
      return state;
  }
}
