import {
  CREATE_ACC_REQUEST,
  CREATE_ACC_RESPONSE,
  CREATE_ACC_ERR,
} from "./constants";

const initalState = {
  requesting: false,
  success: false,
  messages: "",
  errors: "",
  result: {},
};

const reducer = function RoleManagerReducer(state = initalState, action) {
  switch (action.type) {
    case CREATE_ACC_REQUEST:
      return {
        requesting: true,
        success: false,
        messages: "",
        errors: "",
        result: {},
      };
    case CREATE_ACC_RESPONSE:
      return {
        requesting: false,
        successful: true,
        messages: "",
        errors: "",
        result: action.json,
      };
    case CREATE_ACC_ERR:
      return {
        requesting: false,
        success: false,
        messages: "",
        errors: "",
        result: {},
      };
    default:
      return state;
  }
};

export default reducer;
