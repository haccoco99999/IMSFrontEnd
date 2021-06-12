import { CLIENT_SET, CLIENT_UNSET, CLIENT_UPDATE } from './constants'

const initialState = {  
    id: null,
    token:null,
    email:null,
    fullname:null,
    phoneNumber:null,
    address:null,
    dateOfBirth:null,
    isActive:null,
    userRole:null,
  }

  const reducer = function clientReducer (state = initialState, action) {  
    switch (action.type) {
      case CLIENT_SET:
        
        return {
          token: action.respone_login.token,
          email: action.respone_login.applicationUser.email,
          fullname:action.respone_login.applicationUser.fullname,
          phoneNumber:action.respone_login.applicationUser.phoneNumber,
          address:action.respone_login.applicationUser.address,
          dateOfBirth:action.respone_login.applicationUser.dateOfBirthNormalizedString,
          isActive:action.respone_login.applicationUser.isActive,
          userRole:action.respone_login.userRole,
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
          id: null,
          token:null,
          email:null,
          fullname:null,
          phoneNumber:null,
          address:null,
          dateOfBirth:null,
          isActive:null,
          userRole:null,
        }
  
      default:
        return state
    }
  }
  
  export default reducer  