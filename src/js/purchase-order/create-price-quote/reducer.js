import {SEND_MAIL_PRICE_QUOTE,
    SEND_MAIL_PRICE_QUOTE_ERROR,
    SEND_MAIL_PRICE_QUOTE_SUCCESS} from './containts'

const initalState = {
    requesting: false,
    successful: false,
    messages: "",
    errors: "",
}
const reducer = function SendMailQuoteReducer(state = initalState, action){
    switch(action.type){
        case SEND_MAIL_PRICE_QUOTE:
            return{
                requesting: true,
                successful: false,
                messages: "",
                errors: "", 
                
            }
        case SEND_MAIL_PRICE_QUOTE_SUCCESS:
            
            return{
                requesting: false,
                successful: true,
                messages: "",
                errors: "",
               
            }
        case SEND_MAIL_PRICE_QUOTE_ERROR:
            return{
                requesting: false,
                successful: false,
                messages: "",
                errors: "error",
                
            }
        default: 
            return state
    }
}
export default reducer
