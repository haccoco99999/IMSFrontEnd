export default function handleApiErrors (response) {  
    
    if (response.status !== 200) { throw Error(response.statusText)}
    
      
    return response;
  }