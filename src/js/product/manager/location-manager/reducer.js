import {
  GET_ALL_LOCATIONS_REQUEST,
  GET_ALL_LOCATIONS_RESPONSE,
  GET_ALL_LOCATIONS_ERROR,
  CREATE_LOCATION_REQUEST,
  CREATE_LOCATION_ERROR,
  CREATE_LOCATION_RESPONSE,
  UPDATE_LOCATION_REQUEST,
  UPDATE_LOCATION_ERROR,
  UPDATE_LOCATION_RESPONSE,
} from "../constants";

const initialState = {
  requesting: false,
  successful: false,
  messages: "",
  errors: "",
  currentPage: 0,
  pageCount: 0,
  sizePerPage: 0,
  rowCountTotal: 0,
  listLocations: [],
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_LOCATIONS_REQUEST:
      return {
        ...state,
        requesting: true,
        successful: false,
        messages: "",
        errors: "",
      };
    case GET_ALL_LOCATIONS_RESPONSE:
      return {
        ...state,
        requesting: false,
        successful: true,
        messages: "",
        errors: "",
        currentPage: action.json.paging.currentPage,
        pageCount: action.json.paging.pageCount,
        sizePerPage: action.json.paging.sizePerPage,
        rowCountTotal: action.json.paging.rowCountTotal,
        listLocations: action.json.paging.resultList,
      };
    case GET_ALL_LOCATIONS_ERROR:
      return {
        ...state,
        requesting: false,
        successful: false,
        messages: "",
        errors: "",
        listLocations: [],
      };
    case CREATE_LOCATION_REQUEST:
      return {
        ...state,
        requesting: true,
        successful: false,
        messages: "",
        errors: "",
      };
    case CREATE_LOCATION_RESPONSE:
      return {
        ...state,
        requesting: false,
        successful: true,
        messages: "Create Success",
        errors: "",
      };
    case CREATE_LOCATION_ERROR:
      return {
        ...state,
        requesting: false,
        successful: false,
        messages: "",
        errors: "",
      };
    case UPDATE_LOCATION_REQUEST:
      return {
        ...state,
        requesting: true,
        successful: false,
        messages: "",
        errors: "",
      };
    case UPDATE_LOCATION_RESPONSE:
      return {
        ...state,
        requesting: false,
        successful: true,
        messages: "Update Success",
        errors: "",
      };
    case UPDATE_LOCATION_ERROR:
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
