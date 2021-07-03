import {
  CREAT_SUPPLIER_REQUEST,
  CREAT_SUPPLIER_RESPONSE,
  CREAT_SUPPLIER_ERROR,
} from "./constants";

const initialState = {
  requesting: false,
  successful: false,
  messages: "",
  errors: "",
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case CREAT_SUPPLIER_REQUEST:
      return {
        ...state,
        requesting: true,
        successful: false,
        messages: "",
        errors: "",
      };
    case CREAT_SUPPLIER_RESPONSE:
      return {
        ...state,
        requesting: false,
        successful: true,
        messages: "Created Success",
        errors: "",
      };
    case CREAT_SUPPLIER_ERROR:
      return {
        ...state,
        requesting: true,
        successful: false,
        messages: "",
        errors: "",
      };
    default:
      return state;
  }
}
