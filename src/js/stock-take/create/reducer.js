import {
  CREATE_STOCKTAKE_REQUEST,
  CREATE_STOCKTAKE_RESPONSE,
  CREATE_STOCKTAKE_ERROR,
  GET_LOCATION_REQUEST,
  GET_LOCATION_RESPONSE,
  GET_LOCATION_ERROR,
  GET_PACKAGE_REQUEST,
  GET_PACKAGE_RESPONSE,
  GET_PACKAGE_ERROR,
} from "./constants";

const initalState = {
  requesting: false,
  successful: false,
  messages: "",
  errors: "",
  listLocations: [],
  listPackages: [],
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
    case GET_PACKAGE_REQUEST:
      return {
        ...state,
        requesting: true,
        successful: false,
        messages: "",
        errors: "",
        listPackages:[]
      };
    case GET_PACKAGE_RESPONSE:
      return {
        ...state,
        requesting: false,
        successful: true,
        messages: "",
        errors: "",
        listPackages: action.json.paging.resultList,
      };
    case GET_PACKAGE_ERROR:
      return {
        ...state,
        requesting: false,
        successful: false,
        messages: "",
        errors: "",listPackages:[]
      };
    default:
      return state;
  }
}
