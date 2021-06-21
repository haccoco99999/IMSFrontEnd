import { call, put, takeEvery } from "@redux-saga/core/effects"
import { GET_PRICE_QUOTE_ERROR,GET_PRICE_QUOTE_SUCCESS,GET_PRICE_QUOTE_REQUESTING,SEARCH_PURCHASE_ORDER_SEARCH,SEARCH_PURCHASE_ORDER_ERROR,SEARCH_PURCHASE_ORDER} from './contants'
import handleApiErrors from '../../auth/api-errors'
function searchPurchaseOrder(action){
    const updateUrl=`https://imspublicapi.herokuapp.com/api/purchaseorder/${action.searchQuery}&status=${action.status}&page=${action.currentPage}&size=${action.sizePerPage}`
        // const fillter= {
                

                 
        //         }
              
        // }
        console.log(action.filter)
    return fetch("https://imspublicapi.herokuapp.com/api/purchaseorder/search", {
        
        method: 'POST',
        headers:{
            "Authorization": "Bearer " + "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImU5ZjUxNWNjLTcyZjQtNDI3Ni1iOWE5LThhM2EzMTA0MTUwMiIsIm5iZiI6MTYyNDE3NDUzNywiZXhwIjoxNjI0MzQ3MzM3LCJpYXQiOjE2MjQxNzQ1Mzd9.rKQllv-JADJYAYcBoIkGxRnSwgMKknKk1xlZTJwxXmc",
            "Content-Type": "application/json",
            "Origin": ""
        },
        credentials: "include",
        body: JSON.stringify(action.filter)
    })
    .then(response => handleApiErrors(response))
    .then(response => response.json())
    .then(json => json)
    .catch((error) => {throw error})
}
function searchPurchaseOrderkeyword(action){
    const updateUrl=`https://imspublicapi.herokuapp.com/api/purchaseorder/search/${action.searchQuery}&status=-99&page=${action.currentPage}&size=${action.sizePerPage}`
     
              
        
    
    return fetch(updateUrl, {
        
        method: 'GET',
        headers:{
            "Authorization": "Bearer " + "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImU5ZjUxNWNjLTcyZjQtNDI3Ni1iOWE5LThhM2EzMTA0MTUwMiIsIm5iZiI6MTYyNDE3NDUzNywiZXhwIjoxNjI0MzQ3MzM3LCJpYXQiOjE2MjQxNzQ1Mzd9.rKQllv-JADJYAYcBoIkGxRnSwgMKknKk1xlZTJwxXmc",
            "Content-Type": "application/json",
            "Origin": ""
        },
        credentials: "include",
       
    })
    .then(response => handleApiErrors(response))
    .then(response => response.json())
    .then(json => json)
    .catch((error) => {throw error})
}
function getListPriceQuoteAPI(){
    const fillter= {
            
        currentPage: 1,
        sizePerPage: 99,
        poSearchFilter: {
          status: 1,
         
        }
      
}

    const updateUrl="https://imspublicapi.herokuapp.com/api/purchaseorder/all"

    return fetch(updateUrl, {
        
        method: 'POST',
        headers:{
            "Authorization": "Bearer " + "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImU5ZjUxNWNjLTcyZjQtNDI3Ni1iOWE5LThhM2EzMTA0MTUwMiIsIm5iZiI6MTYyNDE3NDUzNywiZXhwIjoxNjI0MzQ3MzM3LCJpYXQiOjE2MjQxNzQ1Mzd9.rKQllv-JADJYAYcBoIkGxRnSwgMKknKk1xlZTJwxXmc",
            "Content-Type": "application/json",
            "Origin": ""
        },
        credentials: "include",
        body:JSON.stringify(fillter)
    })
    .then(response => handleApiErrors(response))
    .then(response => response.json())
    .then(json => json)
    .catch((error) => {throw error})
}
function* searchPurchaseOrderFlow(action){
    
    try{
      let  json= yield call(searchPurchaseOrder,action)
      
        yield put({type:SEARCH_PURCHASE_ORDER_SEARCH, json})
    }catch(error){
       console.log(error)
        yield put({type:SEARCH_PURCHASE_ORDER_ERROR})
    }

}
function* getListPriceQuoteFlow(action){
    
    let json 
    
    try{
        json = yield call(getListPriceQuoteAPI)
      
        yield put({ type: GET_PRICE_QUOTE_SUCCESS, json })
    }catch(error){
        yield put({type:GET_PRICE_QUOTE_ERROR, error})
    }
}
function* updateWatcher(){
    
    yield takeEvery (SEARCH_PURCHASE_ORDER, searchPurchaseOrderFlow)
    yield takeEvery (GET_PRICE_QUOTE_REQUESTING, getListPriceQuoteFlow)
} 

export default updateWatcher