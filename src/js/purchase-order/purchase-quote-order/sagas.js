import { call, put, takeEvery } from "@redux-saga/core/effects"
import { GET_PRICE_QUOTE_ERROR,GET_PRICE_QUOTE_SUCCESS,GET_PRICE_QUOTE_REQUESTING,SEARCH_PURCHASE_ORDER_SEARCH,SEARCH_PURCHASE_ORDER_ERROR,SEARCH_PURCHASE_ORDER} from './contants'
import handleApiErrors from '../../auth/api-errors'
const token ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjkyZThlZGFjLWFkNTQtNGFlNi1hZTIyLTBlMGM1MDJkYTYxMSIsIm5iZiI6MTYyNTYyMTM0NSwiZXhwIjoxNjI1Nzk0MTQ1LCJpYXQiOjE2MjU2MjEzNDV9.40NoAmbWo91YFSW_qXcSVvLx5_LBnlI9kNmSjlFu0kY"
function searchPurchaseOrder(action){
    const updateUrl=`https://imspublicapi.herokuapp.com/api/purchaseorder/search?CurrentPage=1&SizePerPage=20&FromStatus=4&ToStatus=4`
    
        console.log(action.filter)
    return fetch(updateUrl, {
        
        method: 'GET',
        headers:{
            "Authorization": "Bearer " + token,
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
function searchPurchaseOrderkeyword(action){
    const updateUrl=`https://imspublicapi.herokuapp.com/api/purchaseorder/search?SearchQuery=${action.searchQuery}`
     
        
    
    return fetch(updateUrl, {
        
        method: 'GET',
        headers:{
            "Authorization": "Bearer " + token,
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

    const updateUrl="https://imspublicapi.herokuapp.com/api/purchaseorder/search?FromStatus=1&ToStatus=1"

    return fetch(updateUrl, {
        
        method: 'GET',
        headers:{
            "Authorization": "Bearer " + token,
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