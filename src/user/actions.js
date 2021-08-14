import { CLIENT_SET, CLIENT_UNSET, CLIENT_UPDATE, CLIENT_UPDATE_COMPANY } from './constants'

export function setClient (respone_login) {  
  return {
    type: CLIENT_SET,
    respone_login,
  }
}
export function updateClient (respone_login) {  
  return {
    type: CLIENT_UPDATE,
    respone_login,
  }
}
export function updateCompanyInfo (json) {  
  return {
    type: CLIENT_UPDATE_COMPANY,
    json,
  }
}

export function unsetClient () {  
  return {
    type: CLIENT_UNSET,
  }
}