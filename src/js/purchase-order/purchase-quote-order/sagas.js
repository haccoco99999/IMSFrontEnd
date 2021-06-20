import { call, put, takeEvery } from "@redux-saga/core/effects"
import { GET_PRICE_QUOTE_ERROR,GET_PRICE_QUOTE_SUCCESS,GET_PRICE_QUOTE_REQUESTING,SEARCH_PURCHASE_ORDER_SEARCH,SEARCH_PURCHASE_ORDER_ERROR,SEARCH_PURCHASE_ORDER} from './contants'
import handleApiErrors from '../../auth/api-errors'
function searchPurchaseOrder(action){
    const updateUrl=`https://imspublicapi.herokuapp.com/api/purchaseorder/${action.searchQuery}&status=${action.status}&page=${action.currentPage}&size=${action.sizePerPage}`
        const fillter= {
            
                currentPage: action.currentPage,
                sizePerPage: action.sizePerPage,
                poSearchFilter: {
                  status: action.status,
                 
                }
              
        }
    
    return fetch("https://imspublicapi.herokuapp.com/api/purchaseorder/all", {
        
        method: 'POST',
        headers:{
            "Authorization": "Bearer " + "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjkyZThlZGFjLWFkNTQtNGFlNi1hZTIyLTBlMGM1MDJkYTYxMSIsIm5iZiI6MTYyNDAyNDc1OCwiZXhwIjoxNjI0NjI5NTU4LCJpYXQiOjE2MjQwMjQ3NTh9.c0auWdYxi8qB5V2Nk7des10p9PV3Qb2SzRG4oRTfpjo",
            "Content-Type": "application/json",
            "Origin": ""
        },
        credentials: "include",
        body: JSON.stringify(fillter)
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
            "Authorization": "Bearer " + "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjkyZThlZGFjLWFkNTQtNGFlNi1hZTIyLTBlMGM1MDJkYTYxMSIsIm5iZiI6MTYyNDAyNDc1OCwiZXhwIjoxNjI0NjI5NTU4LCJpYXQiOjE2MjQwMjQ3NTh9.c0auWdYxi8qB5V2Nk7des10p9PV3Qb2SzRG4oRTfpjo",
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
            "Authorization": "Bearer " + "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjkyZThlZGFjLWFkNTQtNGFlNi1hZTIyLTBlMGM1MDJkYTYxMSIsIm5iZiI6MTYyNDAyNDc1OCwiZXhwIjoxNjI0NjI5NTU4LCJpYXQiOjE2MjQwMjQ3NTh9.c0auWdYxi8qB5V2Nk7des10p9PV3Qb2SzRG4oRTfpjo",
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
        console.log(json)
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
       console.log(json)
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