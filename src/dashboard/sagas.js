import { take, fork, cancel, call, put, cancelled, takeEvery } from 'redux-saga/effects'
import handleApiErrors from '../auth/api-errors'
import action from '../good-receipt/details/action'
import { GET_VALUE_DASHBOARD_ERROR, GET_VALUE_DASHBOARD_REQUESTING, GET_VALUE_DASHBOARD_SUCCESS } from './constant'


// const updateUrl=`${process.env.REACT_APP_API_URL}/api/pricequote/all`

function getImportExportAPI(action){
    return fetch("http://imspublicapi.herokuapp.com/api/report/importexportquantity", {
        method: 'GET',
        headers:{
            "Authorization": "Bearer " + action.token,
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
function getSumQuantityProductAPI(action){
    return fetch("http://imspublicapi.herokuapp.com/api/report/sumquantityproduct", {
        method: 'GET',
        headers:{
            "Authorization": "Bearer " + action.token,
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
function getInventoryCostsumAPI(action){
    return fetch("http://imspublicapi.herokuapp.com/api/report/inventorycostsum", {
        method: 'GET',
        headers:{
            "Authorization": "Bearer " + action.token,
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

function getTopSellingMonthAPI(action){
    
    return fetch("http://imspublicapi.herokuapp.com/api/report/topselling/currentmonth?CurrentPage=1&SizePerPage=5", {
        method: 'GET',
        headers:{
            "Authorization": "Bearer " + action.token,
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
function getTopSellingYearAPI(action){
    
    return fetch("http://imspublicapi.herokuapp.com/api/report/topselling/currentyear?CurrentPage=1&SizePerPage=5", {
        method: 'GET',
        headers:{
            "Authorization": "Bearer " + action.token,
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
function* getDataDashboard(action){
    
    let json 
    
    try{
     let   jsonImportExport = yield call(getImportExportAPI,action)
     let   jsonQuantityProduct = yield call(getSumQuantityProductAPI,action)
     let  jsonInventoryCost = yield call(getInventoryCostsumAPI,action)
     let    jsonSellingYear = yield call(getTopSellingYearAPI,action)
     let  jsonMonth = yield call(getTopSellingMonthAPI,action)
        console.log(jsonImportExport)
        console.log(jsonQuantityProduct)
        console.log(jsonInventoryCost)
        console.log(jsonSellingYear)
        console.log(jsonMonth)
        json ={
            dataDashBoard:{
                importQuantity:  jsonImportExport.importQuantity,
                exportQuantity:  jsonImportExport.exportQuantity,
                inventoryCostThisMonth: jsonInventoryCost.inventoryCostThisMonth,
                sumInventoryCountThisMonth: jsonQuantityProduct.sumInventoryCountThisMonth,
                top5SellingYear: jsonSellingYear.paging.resultList,
                top5SellingMonth: jsonMonth.paging.resultList,
            }
        }
        yield put({ type: GET_VALUE_DASHBOARD_SUCCESS, json })
    }catch(error){
        yield put({type:GET_VALUE_DASHBOARD_ERROR, error})
    }
}
function* updateWatcher(){
    
      yield takeEvery (GET_VALUE_DASHBOARD_REQUESTING, getDataDashboard);
}

export default updateWatcher