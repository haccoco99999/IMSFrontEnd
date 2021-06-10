import { call, put, takeEvery } from "@redux-saga/core/effects"
import {SEND_MAIL_PRICE_QUOTE,
    SEND_MAIL_PRICE_QUOTE_ERROR,
    SEND_MAIL_PRICE_QUOTE_SUCCESS} from './containts'
import handleApiErrors from '../../auth/api-errors'
const updateUrl="https://imspublicapi.herokuapp.com/api/pricequote/submit"
function sendEmailQuote(priceQuote){
  
    return fetch(updateUrl, {
        method: 'POST',
        headers:{
            
            "Authorization": "Bearer " + "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImM3ODY3NmY2LTc1NTUtNGU3ZS05OWQ5LWE4OTcxZGI4NWU5MiIsIm5iZiI6MTYyMzI4NzExMSwiZXhwIjoxNjIzODkxOTExLCJpYXQiOjE2MjMyODcxMTF9.vJFm2zhnE5JHwVXIRuU0_MHrZAwlvHttaTUDKksT4Wc",
            // "Content-Type": "multipart/form-data; boundary=------WebKitFormBoundaryVrJDc11fejgsDoAs",
            "Origin": "",
            "boundary":"l3iPy71otz"
        },
        body: priceQuote,
        credentials: "include",
        
    })
    .then(response => handleApiErrors(response))
    .then(response => response.json())
    .then(json => json)
    .catch((error) => {throw error})
}
function* sendMailPriceQuoteFlow(action){
    
    try{
        console.log("ok vao")
      let  json= yield call(sendEmailQuote,action.priceQuote)
     console.log("thanh cong")
    //     yield put({type:SEND_MAIL_PRICE_QUOTE_SUCCESS, json})
    }catch(error){
       console.log("that bai")
        yield put({type:SEND_MAIL_PRICE_QUOTE_ERROR})
    }

}
function* updateWatcher(){
    
    yield takeEvery (SEND_MAIL_PRICE_QUOTE, sendMailPriceQuoteFlow)
} 

export default updateWatcher