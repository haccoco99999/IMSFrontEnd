import {
  GET_ALL_ROLE_REQUEST,
  GET_ALL_ROLE_RESPONSE,
  GET_ALL_ROLE_ERROR,
} from "../../constains";

const initalState = {
  requesting: false,
  success: false,
  messages: "",
  errors: "",
  listRoles: [],
};

const reducer = function RoleManagerReducer(state = initalState, action) {
  switch (action.type) {
    case GET_ALL_ROLE_REQUEST:
      return {
        requesting: true,
        successful: false,
        messages: "",
        errors: "",
        listRoles: [],
      };
    case GET_ALL_ROLE_RESPONSE:
      console.log("GET_ALL_ROLE_RESPONSE", action.json);
      return {
        requesting: false,
        successful: true,
        messages: "",
        errors: "",
        listRoles: action.json.roles,
      };
    case GET_ALL_ROLE_ERROR:
      return {
        requesting: false,
        successful: false,
        messages: "",
        errors: "error",
        listGoodsReceipt: [],
      };
    default:
      return state;
  }
};

export default reducer;
