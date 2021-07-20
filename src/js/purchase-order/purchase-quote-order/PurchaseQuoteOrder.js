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
import { PurchaseOrderSuggestion } from '../../search-component/SearchComponentAll'
export default function PurchaseQuoteOrder() {

    let history = useHistory()
    const { token, purchaseOrderStore } = useSelector(state => ({
        token: state.client.token,
        purchaseOrderStore: state.searchPurchaseOrderReducer
    }))
    const [purchaseOrderFilter, setpurchaseOrderFilter] = useState(purchaseOrderStore.purchaserOrderFilter)
    const [infoTablePage, setInfoTablePage] = useState(purchaseOrderStore.infoTablePage)
    const [listPriceQuote, setListPriceQuote] = useState([])
    const [listPurchaseOrder, setListPurchaseOrder] = useState([])
    const dispatch = useDispatch()
    const [listKeyArrayFilter, setListKeyArrayFilter] = useState([])
    const [eventPage , setEventPage] = useState({
        isShowFilter: false
    })
    useEffect(() => {
        dispatch(searchPurchaseOrder({ filter: purchaseOrderFilter }))
        dispatch(getListQuote())
    }, [])
    
    useEffect(() => {
        setListPriceQuote(
            purchaseOrderStore.listQuote
        )
        setListPurchaseOrder(
            purchaseOrderStore.listPurchaseOrder
        )
        setpurchaseOrderFilter(
            purchaseOrderStore.purchaserOrderFilter
        )
        setInfoTablePage(
            purchaseOrderStore.infoTablePage
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
            dataField: 'status',
            text: 'Status',
            align: 'center',
            formatter: (cell, row, rowIndex, extraData) => {

                if (row.status === "POCreated") {
                    return <span class="badge bg-secondary">Draft</span>

                }
                if (row.status === "POWaitingConfirmation") {
                    return <span class="badge bg-warning text-dark">Watinng confirm</span>



                }
                if (row.status === "POConfirm") {
                    return <span class="badge bg-success">Confirmed</span>



                }
                if (row.status === "Done") {
                    return <span class="badge bg-primary">Done</span>


                }
                if (row.status === "POCanceled") {
                    return <span class="badge bg-danger">Canceled</span>


                }
                return row.status

            }
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
    const purchaserOrderFilterReset ={
      
        // HideMerged: true
        supplier:{
            SupplierId:"",
            supplierName: "",
        },
       
        FromTotalOrderPrice:"",
        ToTotalOrderPrice:"",
        FromDeliveryDate:"",
        ToDeliveryDate:"",
        FromConfirmedDate:"",
        ToConfirmedDate:"",
        ConfirmedByName:"",
        FromCreatedDate:"",
        ToCreatedDate:"",
        FromModifiedDate:"",
        ToModifiedDate:"",
     
    }
    const rowEvents = {
        onClick: (e, row, rowIndex) => {

            history.push("/homepage/purchase/PurchaseOrder", { orderID: row.id, status: row.status });


         

        },

    };
    function cancelFilter(arr){
        setListKeyArrayFilter([...arr])
    }
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
        history.push("/homepage/purchase/PriceQuote", { orderId: row.id, status: row.status });
    }
    
    

    function setListTablePaging(event) {


        dispatch(searchPurchaseOrder({ filter: { ...purchaseOrderFilter, [event.target.name]: event.target.value, CurrentPage: 1 } }))
    }
    function pagingPurchaseOrder(index) {
        dispatch(searchPurchaseOrder({ filter: { ...purchaseOrderFilter, CurrentPage: purchaseOrderFilter.CurrentPage + index } }))
    }
    function submitFilter(listselectFilter,filter) {
        setListKeyArrayFilter([...listselectFilter])
        setShowFilter()
        dispatch(searchPurchaseOrder({ filter: filter }))

    }
    function searchKeyWordPurchaseOrder(searchKey) {
        dispatch(searchPurchaseOrder({ filter: {...purchaseOrderFilter, SearchQuery: searchKey} }))
    }
    function reloadTable(){
        searchKeyWordPurchaseOrder("")
    }
    function resetFilter(){
        setListKeyArrayFilter([])
        setShowFilter()
        dispatch(searchPurchaseOrder({ filter: {...purchaseOrderFilter,...purchaserOrderFilterReset} }))
    }
    function setListKeyWordArrayFilter(value){
        setListKeyArrayFilter([...value])
    }
    function setShowFilter(){
        setEventPage((state) =>({
            ...state, isShowFilter: ! state.isShowFilter
        }))
    }
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
            {/* {/* <FilterModal selectStatus={this.selectStatus} /> */}
            {/* <AddjustDisplayTableModal
                    submitDisplay={(e) => this.submitDisplay(e)}
                    setCheckBoxClick={(e) => this.setCheckBoxClick(e)}
                    listColumnDisplay={this.state.listDraftColumn} />  */}

            <div className="list-receipt-table-container">
                <div className="tool-bar-table">
                    <div className="form-group search-purchase">
                        <img src="..\src\js\images\search.svg" alt="icon-search" />
                        {/* <input name="searchQuery" type="text" className="form-control" placeholder="Search by Order ID or Supplier Name" /> */}
                    <PurchaseOrderSuggestion searchKeyWordPurchaseOrder={searchKeyWordPurchaseOrder}/>
                    </div>
                    <div className="list-icon-tool-bar">
                        <div className="icon-tool-bar" onClick={() => reloadTable()}><i class='bx bx-rotate-right'></i></div>
                        <div class="btn btn-default filter"
                      className="icon-tool-bar"
                            onClick={() => setShowFilter()}
                            ><i class='bx bx-filter'></i></div>
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
                        <select onChange={setListTablePaging} name="SizePerPage" className="select-row-table">
                            <option value={10}>10</option>
                            <option value={25}>25</option>
                            <option value={50}>50</option>

                        </select>
                        <span>Showing result out of </span>
                    </div>
                    <div className="button-paging">
                        <img onClick={() => pagingPurchaseOrder(-1)} src="..\src\js\images\left-arrow.svg" />
                        {purchaseOrderFilter.CurrentPage}
                        <img onClick={() => pagingPurchaseOrder(+1)} src="..\src\js\images\right-arrow.svg" />
                    </div>
                </div>
            </div>

            <FilterModal cancelClick={setShowFilter} isShowFilter={eventPage.isShowFilter}  listKeyArrayFilter={listKeyArrayFilter} submitFilter={submitFilter} filterValue={purchaseOrderFilter} resetFilter={resetFilter}/>
       
      

        </div>
    )


}
