import {
  GET_ALL_VARIANTS_REQUEST,
  GET_ALL_VARIANTS_ERROR,
  GET_ALL_VARIANTS_RESPONSE,
} from "../constants";

const initialState = {
  requesting: false,
  successful: false,
  messages: "",
  errors: "",
  listVariants: [],
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_VARIANTS_REQUEST:
      return {
        ...state,
        requesting: true,
        successful: false,
        messages: "",
        errors: "",
      };
    case GET_ALL_VARIANTS_RESPONSE:
      return {
        ...state,
        requesting: false,
        successful: true,
        messages: "",
        errors: "",
        listVariants: action.json.paging.resultList,
      };
    case GET_ALL_VARIANTS_ERROR:
      return {
        ...state,
        requesting: false,
        successful: false,
        messages: "",
        errors: "",
        listVariants: [],
      };
    default:
      return state;
  }
}
