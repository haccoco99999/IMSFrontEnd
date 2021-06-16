import LoginSaga from './login/sagas'
import UpdateSaga from './about-account/sagas'
// import PriceQuoteSaga from './Gallery/sagas'
import DetailPriceQuote from './purchase-order/detail-purchase-order/sagas'
import SendMailPriceQuote from './purchase-order/create-price-quote/sagas'
import searchPurchaseOrder from './purchase-order/purchase-quote-order/sagas'
import getDetailPurchaseOrder from './purchase-order/create-purchase-order/sagas'
import { all } from '@redux-saga/core/effects'
export default function* IndexSaga () {  
    yield all ([
        LoginSaga(),
        UpdateSaga(),
        // PriceQuoteSaga(),
        DetailPriceQuote(),
        SendMailPriceQuote(),
        searchPurchaseOrder(),
        getDetailPurchaseOrder(),
        
    ])
  }