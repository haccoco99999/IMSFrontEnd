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
  SET_ACTIVE_ACC_CLEAN,
  GET_DETAIL_ACC_CLEAN,
  CREATE_ACC_CLEAN,
  UPDATE_DETAIL_ACC_CLEAN,
  UPDATE_IMAGE_REQUEST,
  UPDATE_IMAGE_CLEAN,
  UPDATE_IMAGE_ERR,
  UPDATE_IMAGE_SUCCESS,
  UPDATE_AVATAR_ACC
} from "./constants";

const initalCreateAccountState = {
  requesting: false,
  successful: false,
  messages: "",
  errors: false,
 
};

export const createUserAccount = function createUserAccountReducer(state = initalCreateAccountState, action) {
  switch (action.type) {
    case CREATE_ACC_REQUEST:
      return {
        requesting: true,
        successful: false,
        messages: "",
        errors: false,
      
      };
    case CREATE_ACC_RESPONSE:
      return {
        requesting: false,
        successful: true,
        messages: "",
        errors: false,
       
      };
    case CREATE_ACC_ERR:
      return {
        requesting: false,
        successful: false,
        messages: "",
        errors: true,
       
      };
    case CREATE_ACC_CLEAN:
      return initalCreateAccountState;
    default:
      return state;
  }
};
const deactivatedAccountInit = {
  requesting: false,
  successful: false,
  messages: "",
  errors: false,
 
};

export const setActiveAccount =  function createUserAccountReducer(state = deactivatedAccountInit, action) {
  switch (action.type) {
    case SET_ACTIVE_ACC_REQUEST:
      return {
        requesting: true,
        successful: false,
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
        successful: false,
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
  successful: false,
  messages: "",
  errors: false,
  infoDetailAccount: {

    userID: "",
    email: "",
    phoneNumber: "",
    fullname: "",
    address: "",
    dateOfBirth: "",
    isActive: undefined,
    roleID: "",
    userRole: "",
    profileImageLink:"",
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
        successful: false,
        messages: "",
        errors: false,
       
      };
    case GET_DETAIL_ACC_SUCCESS:

      return {
        requesting: false,
        successful: true,
        messages: "",
        errors: false,
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
          profileImageLink: action.json.userAndRole.imsUser.profileImageLink,
         
        }
      };
    case UPDATE_AVATAR_ACC:{
      return{
        ...state,infoDetailAccount :{
          ...state.infoDetailAccount,
          profileImageLink: action.json.applicationUser.profileImageLink
        }
      }
    }
    case GET_DETAIL_ACC_ERR:
      return {
        requesting: false,
        successful: false,
        messages: "",
        errors: true,
        infoDetailAccount: {},
      };
    case GET_DETAIL_ACC_CLEAN:
      return initalGetDetailAccountState
    default:
      return state;
  }
};
const initalUpdateDetailAccountState = {
  requesting: false,
  successful: false,
  messages: "",
  errors: false,
};

export  function updateAccountDetail(state = initalUpdateDetailAccountState, action) {
  switch (action.type) {
    case UPDATE_DETAIL_ACC_REQUEST:
      return {
        requesting: true,
        successful: false,
        messages: "",
        errors: false,
       
      };
    case UPDATE_DETAIL_ACC_SUCCESS:

      return {
        requesting: false,
        successful: true,
        messages: "Success",
        errors: false,
      };
    case UPDATE_DETAIL_ACC_ERR:
      return {
        requesting: false,
        successful: false,
        messages: "",
        errors: true,
      };
    case UPDATE_DETAIL_ACC_CLEAN:
      return initalUpdateDetailAccountState
    default:
      return state;
  }
};
const updateImageInit = {
  requesting: false,
  successful: false,
  messages: "",
  errors: false,
};

export  function updateImage(state = updateImageInit, action) {
  switch (action.type) {
    case UPDATE_IMAGE_REQUEST:
      return {
        requesting: true,
        successful: false,
        messages: "",
        errors: false,
       
      };
    case UPDATE_IMAGE_SUCCESS:

      return {
        requesting: false,
        successful: true,
        messages: "Success",
        errors: false,
      };
    case UPDATE_IMAGE_ERR:
      return {
        requesting: false,
        successful: false,
        messages: "",
        errors: true,
      };
    case UPDATE_IMAGE_CLEAN:
      return initalUpdateDetailAccountState
    default:
      return state;
  }
};


