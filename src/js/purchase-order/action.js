import {CLICK_QUOTE_ORDER, CLICK_CREATE_PRICE_QUOTE_REQUEST,CLICK_TO_SEND_MAIL_PRICE_QUOTE,CLICK_TO_PREVIEW_PRICE_QUOTE } from './contants'
export function clickQuoteOrder(){
    return {type: CLICK_QUOTE_ORDER}
}
export function ClickCreatePriceQuoteRequest(){
    return {type:CLICK_CREATE_PRICE_QUOTE_REQUEST}
} 
export function clickToSendMailPriceQuote(){
    return {type:CLICK_TO_SEND_MAIL_PRICE_QUOTE}
} 
export function clickToPrevewPriceQuote(){
    return {type:CLICK_TO_PREVIEW_PRICE_QUOTE}
} 