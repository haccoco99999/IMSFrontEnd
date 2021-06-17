import {} from "../../constants";

import {
  GET_ALL_ACCOUNT_REQUEST,
  GET_ALL_ACCOUNT_RESPONSE,
  GET_ALL_ACCOUNT_ERROR,
} from "../../constants";

const initialState = {
  requesting: false,
  successful: false,
  messages: "",
  errors: "",
  listAccounts: [],
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_ACCOUNT_REQUEST:
      return {
        requesting: true,
        successful: false,
        messages: "",
        errors: "",
        listAccounts: [],
      };
    case GET_ALL_ACCOUNT_RESPONSE:
      return {
        requesting: false,
        successful: true,
        messages: "",
        errors: "",
        listAccounts: action.json.imsUser,
      };
    case GET_ALL_ACCOUNT_ERROR:
      return {
        requesting: false,
        successful: false,
        messages: "",
        errors: "",
        listAccounts: [],
      };
    default:
      return state;
  }
}
