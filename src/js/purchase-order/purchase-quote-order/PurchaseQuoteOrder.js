import React from 'react'
import Gallery from '../../Gallery/Gallery'
import FilterModal from '../fillter/FilterModal'
import './PurchaseQuoteOrder.css'
import TablePurchase from './Table-Purchase-Order'
import 'bootstrap/js/dist/modal'
import AddjustDisplayTableModal from '../adjust-display-table/AddjustDisplayTableModal'
import {useState, useEffect} from 'react'
export default function PurchaseQuoteOrder() {
    let[listColumn, setListColumn] = useState(["OrderID", "Confirm by", "Status", "Total Price", "Delivery date", "Create date"])
    return (
        <div className="purchase-quote-order">
            <div className="title-purchase-quote-order">
                <span>Purchase requistion</span>
                <div>6</div>
            </div>
            <Gallery />

            <div className="title-purchase-quote-order">
                <span>Purchase order</span>

            </div>
            <div className="option-purchase">
                <ul>
                    <li><img src='..\src\js\images\plus.svg' /> <span> Add</span></li>
                    <li
                        class="btn btn-default filter"
                        data-bs-target="#AddjustDisplayTableModal"
                        data-bs-toggle="modal"
                    ><img src="..\src\js\images\settings.svg" /> <span>Adjust display table</span> </li>
                    <li class="btn btn-default filter"
                        data-bs-target="#FilterModal"
                        data-bs-toggle="modal" ><img src="..\src\js\images\filter.svg" /> <span>Filter</span> </li>
                </ul>
            </div>
            <FilterModal />
            <AddjustDisplayTableModal />
            <TablePurchase listColumn = {listColumn} />
        </div>
    )

}