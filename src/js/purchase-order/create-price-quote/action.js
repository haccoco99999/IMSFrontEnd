import {SEND_MAIL_PRICE_QUOTE} from './containts'
export default function sendMailPriceQuote({priceQuote}){
    
    return{
        type:SEND_MAIL_PRICE_QUOTE,
        priceQuote,
    }
}