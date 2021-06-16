import React from 'react'

import FilterModal from '../fillter/FilterModal'
import './PurchaseQuoteOrder.css'
import TablePurchase from './Table-Purchase-Order'
import 'bootstrap/js/dist/modal'
import { connect } from 'react-redux'
import AddjustDisplayTableModal from '../adjust-display-table/AddjustDisplayTableModal'
import { useState, useEffect } from 'react'
import ListReceiptTable from '../../table-receipt/ListReceiptsTable'
import { withRouter } from 'react-router-dom'
import {getListQuote ,searchPurchaseOrder} from './action'
import "react-multi-carousel/lib/styles.css";
import Gallery from '../../Gallery/Gallery'
class PurchaseQuoteOrder extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            listDraftColumn: {
                id: true,
                supplierName: true,
                supplierId: false,
                supplierPhone: false,
                supplierEmail: false,
                createdByName: true,
                canceledByName: false,
                confirmedByName: true,
                status: true,
                totalPrice: true,
                costFee: false,
                deliveryDate: true,
                confirmedDate: false,
                createdDate: false,
                suggest: false,
            },
            listColumn: {
                id: true,
                supplierName: true,
                supplierId: false,
                supplierPhone: false,
                supplierEmail: false,
                createdByName: true,
                canceledByName: false,
                confirmedByName: true,
                status: true,
                totalPrice: true,
                costFee: false,
                deliveryDate: true,
                confirmedDate: false,
                createdDate: false,
                suggest: false,


            },
            listHeaderEdit: {
                id: "Order Id"
            }
        }
        this.onClickToDetailPurchaseOrder = this.onClickToDetailPurchaseOrder.bind(this)
        this.props.searchPurchaseOrder("sss")
        this.props.getListQuote();
    }
    onClickToDetailPurchaseOrder(row) {
        console.log(row)
        this.props.history.push("/homepage/purchase/DetailPurchaseOrder", { orderID: row.id, status: row.status });
        // console.log(orderID)
    }
    nextPagingClick() {
        console.log("forward")
    }
    backPagingClick() {
        console.log("backWard")
    }
    submitDisplay() {
        this.setState({
            listColumn: {
                ...this.state.listDraftColumn
            }
        })
    }
    setCheckBoxClick(event) {
        this.setState({
            listDraftColumn: {
                ...this.state.listDraftColumn,
                [event.target.name]: event.target.checked
            }
        })
    }

    render() {
       
        return (
            <div className="purchase-quote-order">
                <div className="title-purchase-quote-order">
                    <span>Purchase requistion</span>
                    <div>6</div>
                </div>

                <Gallery listData={this.props.searchPurchaseOrderReducer.listQuote}/>
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
                <AddjustDisplayTableModal
                    submitDisplay={(e) => this.submitDisplay(e)}
                    setCheckBoxClick={(e) => this.setCheckBoxClick(e)}
                    listColumnDisplay={this.state.listDraftColumn} />
                {/* <TablePurchase listColumn = {this.state.listColumn} listData={this.props.searchPurchaseOrderReducer.listPurchaseOrder} onRowClick={this.onClickToDetailPurchaseOrder}/> */}
                <ListReceiptTable
                    listHeaderEdit={this.state.listHeaderEdit}
                    listColumn={this.state.listColumn}
                    listData={this.props.searchPurchaseOrderReducer.listPurchaseOrder}
                    onRowClick={this.onClickToDetailPurchaseOrder}
                    backPagingClick={this.backPagingClick}
                    nextPagingClick={this.nextPagingClick}
                />

            </div>
        )
    }

}
const mapStateToProps = state => ({
    searchPurchaseOrderReducer: state.searchPurchaseOrderReducer

})

const connected = connect(mapStateToProps, {getListQuote, searchPurchaseOrder })(PurchaseQuoteOrder)
export default withRouter(connected)