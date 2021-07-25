// import { call, put, takeEvery } from "@redux-saga/core/effects"
// import {GET_DETAIL_QUOTE_PRODUCT_ERROR,
//     GET_DETAIL_QUOTE_PRODUCT_SUCCESS,
//     GET_DETAIL_QUOTE_PRODUCT_REQUESTING,
//     } from './contants'
// import handleApiErrors from '../../auth/api-errors'
// const updateUrl="https://imspublicapi.herokuapp.com/api/pricequote/"
// function getPriceQuote(id){
    
//     return fetch(updateUrl+id, {
//         method: 'GET',
//         headers:{
//             "Authorization": "Bearer " + "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImM3ODY3NmY2LTc1NTUtNGU3ZS05OWQ5LWE4OTcxZGI4NWU5MiIsIm5iZiI6MTYyMzI4NzExMSwiZXhwIjoxNjIzODkxOTExLCJpYXQiOjE2MjMyODcxMTF9.vJFm2zhnE5JHwVXIRuU0_MHrZAwlvHttaTUDKksT4Wc",
//             "Content-Type": "application/json",
//             "Origin": ""
//         },
//         credentials: "include",
        
//     })
//     .then(response => handleApiErrors(response))
//     .then(response => response.json())
//     .then(json => json)
//     .catch((error) => {throw error})
// }
// function* getPriceQuoteFlow(action){
    
//     try{
//       let  json= yield call(getPriceQuote,action.id)
     
//         yield put({type:GET_DETAIL_QUOTE_PRODUCT_SUCCESS, json})
//     }catch(error){
       
//         yield put({type:GET_DETAIL_QUOTE_PRODUCT_ERROR})
//     }

// }
// function* updateWatcher(){
//     yield takeEvery (GET_DETAIL_QUOTE_PRODUCT_REQUESTING, getPriceQuoteFlow)
// } 

// export default updateWatcher