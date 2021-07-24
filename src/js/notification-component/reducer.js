import {
  GET_ALL_NOTIFICATIONS_REQUEST,
  GET_ALL_NOTIFICATIONS_RESPONSE,
  GET_ALL_NOTIFICATIONS_ERROR,
} from "./constant";

const initialState = {
  requesting: false,
  successful: false,
  messages: "",
  errors: "",
  listNotifications: [],
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_NOTIFICATIONS_REQUEST:
      return {
        ...state,
        requesting: true,
        successful: false,
        messages: "",
        errors: "",
      };

    case GET_ALL_NOTIFICATIONS_RESPONSE:
      return {
        ...state,
        requesting: false,
        successful: true,
        messages: "",
        errors: "",
        listNotifications: action.json.paging.resultList,
      };
    case GET_ALL_NOTIFICATIONS_ERROR:
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
