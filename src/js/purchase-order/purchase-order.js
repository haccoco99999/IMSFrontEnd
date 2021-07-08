import React from 'react'
import './purchase-order.css'
import {DetailPurhcaseOrder} from './detail-purchase-order/Detail-Purchase-Order'
import CreatePriceQuote from './create-price-quote/Create-Purchase-Order'
import {Route, withRouter, Switch } from 'react-router-dom'
import CreatePurchaseOrder from './create-purchase-order/CreatePurchaseOrder'
import PurchaseQuoteOrder from './purchase-quote-order/PurchaseQuoteOrder'
import DetailPuchaseOrder from './create-purchase-order/DetailPuchaseOrder'
import PriceQuote from './create-purchase-order/PirceQuote'
import PurchaseOrder from './create-purchase-order/PurchaseOrder'
import PurchaseOrderConfirm from './create-purchase-order/PurchaseOrderConfirm'
import PurchaseOrderDone from './create-purchase-order/PurchaseOrderDone'
import { connect } from 'react-redux'
//create purchae da ton tai do dat sai ten
class Purchase extends React.Component {
  constructor(props){
    super(props)
   
  }
  render() {
    return (
      <div className="home_content purchase-order">
        <div className="text">
          {/* ############################ */}
      {/* <CreatePurchaseOrder/> */}
          <Switch>
         
            <Route exact path="/homepage/purchase"> <PurchaseQuoteOrder /></Route>

            {/* <Route path="/homepage/purchase/DetailPurchaseOrder"> <PurchaseOrderConfirm/></Route> */}
            <Route path="/homepage/purchase/PriceQuote"> <PriceQuote/></Route>
            <Route path="/homepage/purchase/PurchaseOrder"> <PurchaseOrder/></Route>
            <Route path="/homepage/purchase/PurchaseOrderConfirm"> <PurchaseOrderConfirm/></Route>
            <Route path="/homepage/purchase/PurchaseOrderDone"> <PurchaseOrderDone/></Route>
            {/* <Route path="/homepage/purchase/DetailPurhcaseOrder"> <DetailPurhcaseOrder/></Route> */}
            <Route path="/homepage/purchase/CreatePriceQuote"> <CreatePriceQuote /></Route>
            
          </Switch>
          {/* ################################# */}
        </div>
      </div>
    );
  }

}
const mapStateToProps = state => ({

  controlPurchaseQuotePage: state.controlPurchaseQuotePage
})
const connected = connect(mapStateToProps)(Purchase)
export default withRouter(connected)
