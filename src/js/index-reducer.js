import { combineReducers } from "redux";
import client from './user/reducer' 
import login from './login/reducer'
import updateProfile from './about-account/reducer'
// import listPriceQuote from './Gallery/reducer'
import controlPurchaseQuotePage from './purchase-order/reducer'
import detailPriceQuote from './purchase-order/detail-purchase-order/reducer'
import sendMailReducer from './purchase-order/create-price-quote/reducer'
import getDetailPurchaseReducer from './purchase-order/create-purchase-order/reducer'
import searchPurchaseOrderReducer from './purchase-order/purchase-quote-order/reducer'
// import updateProfile from './about-account/reducer'
const IndexReducer = combineReducers({
    login,
    client,
    updateProfile,
    // listPriceQuote,
    controlPurchaseQuotePage,
    detailPriceQuote,
    sendMailReducer,
    searchPurchaseOrderReducer,
    getDetailPurchaseReducer,
    
   
})

export default IndexReducer