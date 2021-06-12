import { CLIENT_SET, CLIENT_UNSET } from './constants'

export function setClient (respone_login) {  
  console.log(respone_login)
  return {
    type: 'CLIENT_SET',
    respone_login,
  }
}
export function updateClient (updateClient) {  
  return {
    type: 'CLIENT_UPDATE',
    updateClient,
  }
}

export function unsetClient () {  
  return {
    type: 'CLIENT_UNSET',
  }
}