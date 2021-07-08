import React from 'react'

import FilterModal from '../fillter/FilterModal'
import './PurchaseQuoteOrder.css'
import 'bootstrap/js/dist/modal'
import { connect, useDispatch, useSelector } from 'react-redux'
import AddjustDisplayTableModal from '../adjust-display-table/AddjustDisplayTableModal'
import { useState, useEffect } from 'react'
import ListReceiptTable from '../../table-receipt/ListReceiptsTable'
import { useHistory, withRouter } from 'react-router-dom'
import { getListQuote, searchPurchaseOrder } from './action'
import "react-multi-carousel/lib/styles.css";
import Gallery from '../../Gallery/Gallery';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import BootstrapTable from 'react-bootstrap-table-next';
export default function PurchaseQuoteOrder() {
    // constructor(props) {
    //     super(props)
    //     this.state = {
    //         filter: {
    //             searchQuery: "",
    //             currentPage: 1,
    //             sizePerPage: 8,
    //             poSearchFilter: {
    //                 status: 2,

    //             }
    //         },
    //         listDraftColumn: {
    //             id: true,
    //             supplierName: true,
    //             supplierId: false,
    //             supplierPhone: false,
    //             supplierEmail: false,
    //             createdByName: true,
    //             canceledByName: false,
    //             confirmedByName: true,
    //             status: true,
    //             totalPrice: true,
    //             costFee: false,
    //             deliveryDate: true,
    //             confirmedDate: false,
    //             createdDate: false,
    //             suggest: false,
    //         },
    //         listColumn: {
    //             id: true,
    //             supplierName: true,
    //             supplierId: false,
    //             supplierPhone: false,
    //             supplierEmail: false,
    //             createdByName: true,
    //             canceledByName: false,
    //             confirmedByName: true,
    //             status: true,
    //             totalPrice: true,
    //             costFee: false,
    //             deliveryDate: true,
    //             confirmedDate: false,
    //             createdDate: false,
    //             suggest: false,


    //         },
    //         listHeaderEdit: {
    //             id: "Order Id"
    //         }
    //     }
    //     this.onClickToDetailPurchaseOrder = this.onClickToDetailPurchaseOrder.bind(this)
    //     this.onClickToDetailQuoteOrder = this.onClickToDetailQuoteOrder.bind(this)
    //     this.nextPagingClick = this.nextPagingClick.bind(this)
    //     this.backPagingClick = this.backPagingClick.bind(this)
    //     this.clickToSearchOrder = this.clickToSearchOrder.bind(this)
    //     this.selectStatus = this.selectStatus.bind(this)
    //     this.props.searchPurchaseOrder(this.state.filter)
    //     this.props.getListQuote();
    // }
    let history = useHistory()
    const { token, purchaseOrderStore } = useSelector(state => ({
        token: state.client.token,
        purchaseOrderStore: state.searchPurchaseOrderReducer
    }))
    const [listPriceQuote, setListPriceQuote] = useState([])
    const [listPurchaseOrder, setListPurchaseOrder] = useState([])
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(searchPurchaseOrder({}))
        dispatch(getListQuote())
    }, [])

    useEffect(() => {
        setListPriceQuote(
            purchaseOrderStore.listQuote
        )
        setListPurchaseOrder(
            purchaseOrderStore.listPurchaseOrder
        )
    }, [purchaseOrderStore])
    console.log(listPurchaseOrder)
    const columns = [
        {
            dataField: 'id',
            text: 'Order ID',
         },
        {
            dataField: 'createdByName',
            text: 'Create By ',
        },
        {
            dataField: 'createdDate',
            text: 'Created Date',
        },
        {
            dataField: 'deliveryDate',
            text: 'Delivery Date',
        },
        {
            dataField: 'supplierName',
            text: 'Supplier Name',
        },
        {
            dataField: 'totalPrice',
            text: 'Total Price',
        }


    ];
    const rowEvents = {
        onClick: (e, row, rowIndex) => {
            if (row.status === "POCreated") {
                history.push("/homepage/purchase/PurchaseOrder", { orderID: row.id, status: row.status });
    
            }
            // console.log(row.status)
            if (row.status === "POWaitingConfirmation") {
                history.push("/homepage/purchase/PurchaseOrderConfirm", { orderID: row.id, status: row.status });
    
            }
            if (row.status === "POConfirm") {
                history.push("/homepage/purchase/PurchaseOrderDone", { orderID: row.id, status: row.status });
    
            }

        },

    };
    function onClickToDetailPurchaseOrder(row) {
        console.log(row)
        if (row.status === "POCreated") {
            this.props.history.push("/homepage/purchase/PurchaseOrder", { orderID: row.id, status: row.status });

        }
        // console.log(row.status)
        if (row.status === "POWaitingConfirmation") {
            this.props.history.push("/homepage/purchase/PurchaseOrderConfirm", { orderID: row.id, status: row.status });

        }
        if (row.status === "POConfirm") {
            this.props.history.push("/homepage/purchase/PurchaseOrderDone", { orderID: row.id, status: row.status });

        }
        // this.props.history.push("/homepage/purchase/DetailPurchaseOrder", { orderID: row.id, status: row.status });
        // console.log(orderID)
    }
    function onClickToDetailQuoteOrder(row) {
        console.log(row)
        history.push("/homepage/purchase/PriceQuote", { orderID: row.id, status: row.status });
        // console.log(orderID)
    }
    // nextPagingClick() {
    //     this.setState({
    //         currentPage: this.state.currentPage + 1
    //     })
    //     this.props.searchPurchaseOrder({
    //         searchQuery: this.state.searchQuery,
    //         status: this.state.status,
    //         currentPage: this.state.currentPage + 1,
    //         sizePerPage: 8,
    //     })
    // }
    // backPagingClick() {
    //     this.setState({
    //         currentPage: this.state.currentPage - 1
    //     })
    //     this.props.searchPurchaseOrder({
    //         searchQuery: this.state.searchQuery,
    //         status: this.state.status,
    //         currentPage: this.state.currentPage - 1,
    //         sizePerPage: 8,
    //     })
    // }
    // submitDisplay() {
    //     this.setState({
    //         listColumn: {
    //             ...this.state.listDraftColumn
    //         }
    //     })
    // }
    // setCheckBoxClick(event) {
    //     this.setState({
    //         listDraftColumn: {
    //             ...this.state.listDraftColumn,
    //             [event.target.name]: event.target.checked
    //         }
    //     })
    // }
    // clickToSearchOrder(keySearch) {

    //     this.props.searchPurchaseOrder(this.state.filter)

    // }


    // selectStatus(event) {
    //     if (event.target.name !== "searchQuery") {
    //         this.setState((prevState) => ({
    //             filter: {
    //                 ...prevState.filter,
    //                 poSearchFilter: {
    //                     ...prevState.filter.poSearchFilter,
    //                     [event.target.name]: event.target.value
    //                 }
    //             }
    //         }))
    //     }
    //     else if (event.target.name === "searchQuery") {
    //         this.setState((prevState) => ({
    //             filter: {
    //                 ...prevState.filter,
    //                 searchQuery: event.target.value
    //             }
    //         }))
    //     }

    // }




    return (
        <div className="purchase-quote-order">
            <div className="title-purchase-quote-order">
                <span>Purchase requistion</span>
                <div>6</div>
            </div>

            <Gallery
                    clickQuote={onClickToDetailQuoteOrder}
                    listData={listPriceQuote} />
            <div className="title-purchase-quote-order">
                <span>Purchase order</span>

            </div>
            {/* <div className="option-purchase">
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
                </div> */}
            {/* <FilterModal selectStatus={this.selectStatus} />
                <AddjustDisplayTableModal
                    submitDisplay={(e) => this.submitDisplay(e)}
                    setCheckBoxClick={(e) => this.setCheckBoxClick(e)}
                    listColumnDisplay={this.state.listDraftColumn} /> */}

            <div className="list-receipt-table-container">
                <div className="tool-bar-table">
                    <div className="form-group search-purchase">
                        <img src="..\src\js\images\search.svg" alt="icon-search" />
                        <input name="searchQuery" type="text" className="form-control" placeholder="Search by Order ID or Supplier Name" />

                    </div>
                    <div className="list-icon-tool-bar">
                        <div className="icon-tool-bar"><i class='bx bx-rotate-right'></i></div>
                        <div className="icon-tool-bar"><i class='bx bx-filter'></i></div>
                        <div className="icon-tool-bar"><i class='bx bx-cog'></i></div>

                    </div>

                </div>
                <div className="table-container">
                    <BootstrapTable
                        keyField='id'
                        data={listPurchaseOrder}
                        columns={columns}
                        striped
                        hover
                        condensed
                        noDataIndication="Table is Empty"
                        rowEvents={rowEvents}

                        headerClasses="table-header-receipt"
                    />
                </div>
                <div className="paging-container">

                    <div className="left-size-paging">
                        <select className="select-row-table">
                            <option value={10}>{10}</option>
                            <option value={11}>{10}</option>
                            <option value={10}>{10}</option>

                        </select>
                        <span>Showing result out of </span>
                    </div>
                    <div className="button-paging">
                        <img src="..\src\js\images\left-arrow.svg" />
                        <img src="..\src\js\images\right-arrow.svg" />
                    </div>
                </div>
            </div>


            {/* <ListReceiptTable
                    setKeySearch={this.selectStatus}
                    keySearch={this.state.filter.searchQuery}
                    clickToSearch={this.clickToSearchOrder}
                    sizePerPage={this.state.sizePerPage}
                    currentPage={this.state.currentPage}
                    pageCount={this.props.searchPurchaseOrderReducer.pageCount}
                    listHeaderEdit={this.state.listHeaderEdit}
                    listColumn={this.state.listColumn}
                    listData={this.props.searchPurchaseOrderReducer.listPurchaseOrder}
                    onRowClick={this.onClickToDetailPurchaseOrder}
                    backPagingClick={this.backPagingClick}
                    nextPagingClick={this.nextPagingClick}
                /> */}

        </div>
    )


}
