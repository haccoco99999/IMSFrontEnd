import { setClient } from '../user/actions'

function checkAuthorization (dispatch) {  
   
    const storedToken = localStorage.getItem('token')
      
    
    if (storedToken) {
      
      const token = JSON.parse(storedToken)
      
    
      const createdDate = new Date(token.created)
      const created = Math.round(createdDate.getTime() / 1000)
      const ttl = 1209600
      const expiry = created + ttl
  
   
      if (created > expiry) return false
  
      
      dispatch(setClient(token))
      return true
    }
  
    return false
  }

  export function checkHomePageAuthorization ({ dispatch, getState }) {  
      
      const client = getState().client
  
      
       if (client && client.token) return true
  
      
      if (checkAuthorization(dispatch)) return true
  
     
      
      return false
    
  }
  
