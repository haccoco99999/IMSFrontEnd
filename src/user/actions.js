import { CLIENT_SET, CLIENT_UNSET } from './constants'

export function setClient (respone_login) {  
  return {
    type: CLIENT_SET,
    respone_login,
  }
}
export function updateClient (respone_login) {  
  return {
    type: 'CLIENT_UPDATE',
    respone_login,
  }
}

export function unsetClient () {  
  return {
    type: CLIENT_UNSET,
  }
}