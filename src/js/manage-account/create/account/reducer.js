import {
  CREATE_ACC_REQUEST,
  CREATE_ACC_RESPONSE,
  CREATE_ACC_ERR,

  GET_DETAIL_ACC_REQUEST,
  GET_DETAIL_ACC_SUCCESS,
  GET_DETAIL_ACC_ERR,

  UPDATE_DETAIL_ACC_ERR,
  UPDATE_DETAIL_ACC_REQUEST,
  UPDATE_DETAIL_ACC_SUCCESS,
  SET_ACTIVE_ACC_REQUEST,
  SET_ACTIVE_ACC_SUCCESS,
  SET_ACTIVE_ACC_ERR,
  SET_ACTIVE_ACC_CLEAN
} from "./constants";

const initalCreateAccountState = {
  requesting: false,
  success: false,
  messages: "",
  errors: "",
  result: {},
};

export function createUserAccountReducer(state = initalCreateAccountState, action) {
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
const deactivatedAccountInit = {
  requesting: false,
  success: false,
  messages: "",
  errors: false,
 
};

export const setActiveAccount =  function createUserAccountReducer(state = deactivatedAccountInit, action) {
  switch (action.type) {
    case SET_ACTIVE_ACC_REQUEST:
      return {
        requesting: true,
        success: false,
        messages: "",
        errors: false,
   
      };
    case SET_ACTIVE_ACC_SUCCESS:
      return {
        requesting: false,
        successful: true,
        messages: "",
        errors: false,
        
      };
    case SET_ACTIVE_ACC_ERR:
      return {
        requesting: false,
        success: false,
        messages: "",
        errors: true,
       
      };
    case SET_ACTIVE_ACC_CLEAN:
      return deactivatedAccountInit
    default:
      return state;
  }
};

const initalGetDetailAccountState = {
  requesting: false,
  success: false,
  messages: "",
  errors: "",
  infoDetailAccount: {

    userID: "",
    email: "",
    phoneNumber: "",
    fullname: "",
    address: "",
    dateOfBirth: "",
    isActive: "",
    roleID: "",
    userRole: "",

  // password: "dellDell123*",
  // email: "",
  // roleId: "",
  // fullName: "",
  // phoneNumber: "",
  // address: "",
  // dateOfBirth: ""


  }

};

export function getUserAccountDetail(state = initalGetDetailAccountState, action) {
  switch (action.type) {
    case GET_DETAIL_ACC_REQUEST:
      return {
        ...state,
        requesting: true,
        success: false,
        messages: "",
        errors: "",
       
      };
    case GET_DETAIL_ACC_SUCCESS:

      return {
        requesting: false,
        successful: true,
        messages: "",
        errors: "",
        infoDetailAccount: {

          userID: action.json.userAndRole.imsUser.id,
          email: action.json.userAndRole.imsUser.email,
          phoneNumber: action.json.userAndRole.imsUser.phoneNumber,
          fullname: action.json.userAndRole.imsUser.fullname,
          address: action.json.userAndRole.imsUser.address,
          dateOfBirth: action.json.userAndRole.imsUser.dateOfBirth,
          isActive: action.json.userAndRole.imsUser.isActive,
          roleID: action.json.userAndRole.roleID,
          userRole: action.json.userAndRole.userRole,
        }
      };
    case GET_DETAIL_ACC_ERR:
      return {
        requesting: false,
        success: false,
        messages: "",
        errors: "",
        infoDetailAccount: {},
      };
    default:
      return state;
  }
};
const initalUpdateDetailAccountState = {
  requesting: false,
  success: false,
  messages: "",
  errors: "",
};

export function updateAccountDetail(state = initalUpdateDetailAccountState, action) {
  switch (action.type) {
    case UPDATE_DETAIL_ACC_REQUEST:
      return {
        requesting: true,
        success: false,
        messages: "",
        errors: "",
       
      };
    case UPDATE_DETAIL_ACC_SUCCESS:

      return {
        requesting: false,
        success: true,
        messages: "Success",
        errors: "",
      };
    case UPDATE_DETAIL_ACC_ERR:
      return {
        requesting: false,
        success: false,
        messages: "",
        errors: "error",
      };
    default:
      return state;
  }
};


