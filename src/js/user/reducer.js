import { CLIENT_SET, CLIENT_UNSET, CLIENT_UPDATE } from './constants'

const initialState = {  
   
    token:null,
    isNotAllowed: null,
    email:null,
    emailConfirmed: null,
    fullname:null,
    phoneNumber:null,
    accessFailedCount:null,
    address:null,
    dateOfBirth:null,
    isActive:null,
    userRole:null,
    pageAuthorized:[],
  }

  const reducer = function clientReducer (state = initialState, action) {  
    switch (action.type) {
      case CLIENT_SET:
        
        return {
          token: action.respone_login.token,
          isNotAllowed: action.respone_login.isNotAllowed,
          email: action.respone_login.applicationUser.email,
          emailConfirmed: action.respone_login.applicationUser.emailConfirmed,
          fullname:action.respone_login.applicationUser.fullname,
          phoneNumber:action.respone_login.applicationUser.phoneNumber,
          accessFailedCount:action.respone_login.applicationUser.accessFailedCount,
          address:action.respone_login.applicationUser.address,
          dateOfBirth:action.respone_login.applicationUser.dateOfBirthNormalizedString,
          isActive:action.respone_login.applicationUser.isActive,
          userRole:action.respone_login.userRole,
          pageAuthorized:action.respone_login.pageAuthorized,
        }
      case CLIENT_UPDATE:
        
        return {
          ...state,
          fullname: action.updateClient.fullname,
          phoneNumber: action.updateClient.phoneNumber,
          dateOfBirth: action.updateClient.dateOfBirth,
        }
  
      case CLIENT_UNSET:
        return {
          token:null,
          isNotAllowed: null,
          email:null,
          emailConfirmed: null,
          fullname:null,
          phoneNumber:null,
          accessFailedCount:null,
          address:null,
          dateOfBirth:null,
          isActive:null,
          userRole:null,
          pageAuthorized:[],
        }
  
      default:
        return state
    }
  }
  
  export default reducer  