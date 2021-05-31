import React from 'react'
import Gallery from './Gallery'
import TablePurchase from './Table-Purchase-Order'
import './purchase-order.css'
import DetailPurhcaseOrder from './Detail-Purchase-Order'
import CreatePurchaseOrder from './Create-Purchase-Order'
export default function (){
    return (
        <div className="home_content">
        <div className="text">
          {/* ############################ */}


        {/* <Gallery/>
        <div className="option-purchase">
        <ul>
          <li><img src="..\src\js\images\plus.svg"/> <span> Add</span></li>
          <li><img src="..\src\js\images\settings.svg" /> <span>Adjust display table</span> </li>
          <li><img src="..\src\js\images\filter.svg"/> <span>Filter</span> </li>
        </ul>
        </div>
      <TablePurchase/> */}

      {/* <DetailPurhcaseOrder/> */}
      <CreatePurchaseOrder/>


          {/* ################################# */}
        </div>
      </div>
    );
}
