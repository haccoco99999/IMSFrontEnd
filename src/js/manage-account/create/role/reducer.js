import {
    CREATE_ROLE_ERROR,CREATE_ROLE_REQUESTING,CREATE_ROLE_SUCCESS,
    GET_DETAIL_ROLE_ERROR,GET_DETAIL_ROLE_REQUESTING, GET_DETAIL_ROLE_SUCCESS,
    UPDATE_DETAIL_ROLE_ERROR, UPDATE_DETAIL_ROLE_REQUESTING,UPDATE_DETAIL_ROLE_SUCCESS,
    
} from './contants'
  
  const initalState = {
    requesting: false,
    success: false,
    messages: "",
    errors: "",
    result: {},
  };
  
  export  function createRolePermission(state = initalState, action) {
    switch (action.type) {
      case CREATE_ROLE_REQUESTING:
        return {
          requesting: true,
          success: false,
          messages: "",
          errors: "",
          result: {},
        };
      case CREATE_ROLE_SUCCESS:
        return {
          requesting: false,
          successful: true,
          messages: "",
          errors: "",
          result: action.json,
        };
      case CREATE_ROLE_ERROR:
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
  const initalRoleDetailState = {
    requesting: false,
    success: false,
    messages: "",
    errors: "",
    detailRole:{
      roleId:"",
      roleName:"",
      pagePermissions:{
        
      }
    }
  };
  
  export const DetailRolePermission = function getDetailRolePermission(state = initalRoleDetailState, action) {
    switch (action.type) {
      case GET_DETAIL_ROLE_REQUESTING:
        return {
          ...state,
          requesting: true,
          success: false,
          messages: "",
          errors: "",
         
        };
      case GET_DETAIL_ROLE_SUCCESS:
        console.log(action.json)
        return {
       
          requesting: false,
          successful: true,
          messages: "",
          errors: "",
          detailRole:{
            roleId: action.json.role.id,
            roleName: action.json.role.name,
            pagePermissions: action.json.pagePermissions
          }
        };
      case GET_DETAIL_ROLE_ERROR:
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


  const initalUpdateRoleDetailState = {
    requesting: false,
    success: false,
    messages: "",
    errors: "",
    detailRole:{
      roleId:"",
      roleName:"",
      pagePermissions:{
        
      }
    }
  }; 
  export const UpdateRolePermission = function updateRolePermission(state = initalUpdateRoleDetailState, action) {
    switch (action.type) {
      case UPDATE_DETAIL_ROLE_REQUESTING:
        return {
          ...state,
          requesting: true,
          success: false,
          messages: "",
          errors: "",
         
        };
      case UPDATE_DETAIL_ROLE_SUCCESS:
        console.log(action.json)
        return {
          requesting: false,
          successful: true,
          messages: "",
          errors: "",
          detailRole:{
            roleId: action.json.role.id,
            roleName: action.json.role.name,
            pagePermissions: action.json.pagePermissions
          }
        };
      case UPDATE_DETAIL_ROLE_ERROR:
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
  
  
  