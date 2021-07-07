import {
  GET_ALL_LOCATIONS_REQUEST,
  GET_ALL_LOCATIONS_RESPONSE,
  GET_ALL_LOCATIONS_ERROR,
} from "../constants";

const initialState = {
    requesting: false,
    successful: false,
    messages: "",
    errors: "",
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
      default:
        return state;
    }
  }
  