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
  RESET,
} from "../constants";

const initialState = {
  requesting: false,
  successful: false,
  messages: "",
  errors: false,
  currentPage: 0,
  pageCount: 0,
  sizePerPage: 0,
  rowCountTotal: 0,
  listLocations: [],
};

export function locationManagerReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_LOCATIONS_REQUEST:
      return {
        ...state,
        requesting: true,
        successful: false,
        messages: "",
        errors: false,
      };
    case GET_ALL_LOCATIONS_RESPONSE:
      return {
        ...state,
        requesting: false,
        successful: true,
        messages: "",
        errors: false,
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
        errors: true,
      };

    default:
      return state;
  }
}

const createLocationState = {
  requesting: false,
  successful: false,
  messages: "",
  errors: false,
};

export function createLocationReducer(state = createLocationState, action) {
  switch (action.type) {
    case CREATE_LOCATION_REQUEST:
      return {
        ...state,
        requesting: true,
        successful: false,
        messages: "",
        errors: false,
      };
    case CREATE_LOCATION_RESPONSE:
      if (action.json === undefined)
        return {
          ...state,
          requesting: false,
          successful: true,
          messages: "Duplicate",
          errors: true,
        };
      else
        return {
          ...state,
          requesting: false,
          successful: true,
          messages: "Create Success",
          errors: false,
        };
    case CREATE_LOCATION_ERROR:
      return {
        ...state,
        requesting: false,
        successful: false,
        messages: "",
        errors: true,
      };
    case RESET:
      return createLocationState;
    default:
      return state;
  }
}

const updateLocationState = {
  requesting: false,
  successful: false,
  messages: "",
  errors: false,
};

export function updateLocationReducer(state = updateLocationState, action) {
  switch (action.type) {
    case UPDATE_LOCATION_REQUEST:
      return {
        ...state,
        requesting: true,
        successful: false,
        messages: "",
        errors: false,
      };
    case UPDATE_LOCATION_RESPONSE:
      if (action.json === undefined)
        return {
          ...state,
          requesting: false,
          successful: true,
          messages: "Duplicate",
          errors: true,
        };
      else
        return {
          ...state,
          requesting: false,
          successful: true,
          messages: "Update Success",
          errors: false,
        };
    case UPDATE_LOCATION_ERROR:
      return {
        ...state,
        requesting: false,
        successful: false,
        messages: "",
        errors: true,
      };
    case RESET:
      return updateLocationState;
    default:
      return state;
  }
}
