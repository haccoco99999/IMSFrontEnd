import {
    GET_PRICE_QUOTE_REQUESTING,
    GET_PRICE_QUOTE_SUCCESS,
    GET_PRICE_QUOTE_ERROR,
} from './contants'

const initalState = {
    requesting: false,
    successful: false,
    messages: "",
    errors: "",
    listQuote: []
}
const reducer = function getListQuoteReducer(state = initalState, action){
    switch(action.type){
        case GET_PRICE_QUOTE_REQUESTING:
            console.log("okkkkkkk")
            return{
                requesting: true,
                successful: false,
                messages: "",
                errors: "",
                listQuote: []
            }
        case GET_PRICE_QUOTE_SUCCESS:
            
            return{
                requesting: false,
                successful: true,
                messages: "",
                errors: "",
                listQuote: action.json.priceQuotes
            }
        case GET_PRICE_QUOTE_ERROR:
            return{
                requesting: false,
                successful: false,
                messages: "",
                errors: "",
                listQuote: [] 
            }
        default:
            return state
    }
}

export default reducer