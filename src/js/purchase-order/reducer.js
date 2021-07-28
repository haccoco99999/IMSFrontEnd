// import { CLICK_QUOTE_ORDER , CLICK_CREATE_PRICE_QUOTE_REQUEST, CLICK_TO_SEND_MAIL_PRICE_QUOTE,
// CLICK_TO_PREVIEW_PRICE_QUOTE} from './contants'

// const initalState = {
//     isClickGallery: false,
//     isClickCreatePriceQuoteRequest: false,
//     isClickToSendMailPriceQuote: false,
//     isClickToPreviewPriceQuote: false,
    
// }
// const reducer = function controlPurchaseQuotePage(state = initalState, action) {
//     switch (action.type) {
//         case CLICK_QUOTE_ORDER:
//             return {
//                 ...state, isClickGallery: !state.isClickGallery
//             }
//         case CLICK_CREATE_PRICE_QUOTE_REQUEST:
//             return {
//                 ...state, isClickCreatePriceQuoteRequest: !state.isClickCreatePriceQuoteRequest
//             }
//         case CLICK_TO_SEND_MAIL_PRICE_QUOTE:
//             return {
//                 ...state, isClickToSendMailPriceQuote: !state.isClickToSendMailPriceQuote
//             }
//         case CLICK_TO_SEND_MAIL_PRICE_QUOTE:
//             return {
//                 ...state, isClickToSendMailPriceQuote: !state.isClickToSendMailPriceQuote
//             }
//         case CLICK_TO_PREVIEW_PRICE_QUOTE:
//             return {
//                 ...state, isClickToPreviewPriceQuote: !state.isClickToPreviewPriceQuote
//             }
//         default:
//             return state
//     }
// }
// export default reducer