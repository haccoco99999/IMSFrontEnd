import React from 'react'

import './PurchaseQuoteOrder.css'
import 'bootstrap/js/dist/modal'
import { connect, useDispatch, useSelector } from 'react-redux'
import { useState, useEffect } from 'react'
import ListReceiptTable from '../../table-receipt/ListReceiptsTable'
import { useHistory, withRouter } from 'react-router-dom'
import { getListQuote, searchPurchaseOrder } from './action'
import "react-multi-carousel/lib/styles.css";
import Gallery from '../../Gallery/Gallery';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import BootstrapTable from 'react-bootstrap-table-next';
import { SearchPurchaseOrder, SelectSupplier, SelectStatusPurchaseOrder } from '../../search-component/SearchComponentAll'
import ContentLoader from "react-content-loader"
import PagingComponent from '../../components/paging/paging-component'
import ToolkitProvider, { ColumnToggle } from 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit';
import ProductVariantsFilter from './ProductVariantsFilter'
import StockTakeFilter from './StockTakeFilter'
import { Cloudinary } from "@cloudinary/base";
import { PurchaseOrderFilter } from '../../components/filter/FilterComponents'

export default function PurchaseQuoteOrder() {
    // const cld = new Cloudinary({
    //     cloud: {
    //       cloudName: 'demo',
    //       api_key: '874837483274837', 
    //       api_secret: 'a676b67565c6767a6767d6767f676fe1' 
    //     }
    //   });
    //   cld.v2.uploader.upload("https://www.example.com/mysample.jpg",
    //   { public_id: "sample_woman" }, 
    //   function(error, result) {alert(result) }); 

    let history = useHistory()
    const { token, purchaseOrderStore } = useSelector(state => ({
        token: state.client.token,
        purchaseOrderStore: state.searchPurchaseOrderReducer
    }))
    // const [purchaseOrderFilter, setpurchaseOrderFilter] = useState(purchaseOrderStore.purchaserOrderFilter)
    const [infoTablePage, setInfoTablePage] = useState(purchaseOrderStore.infoTablePage)
    const [listPriceQuote, setListPriceQuote] = useState([])
    const [listPurchaseOrder, setListPurchaseOrder] = useState([])
    const dispatch = useDispatch()
    const [listKeyArrayFilter, setListKeyArrayFilter] = useState([])
    const [eventPage, setEventPage] = useState({
        isShowFilter: false
    })
    const { ToggleList } = ColumnToggle;
    const purchaserOrderFilterInit = {

        SearchQuery: "",
        Statuses: [
            { key: "PurchaseOrder", value: "Draft" },
            { key: "POWaitingConfirmation", value: "Watting Confirm" },
            { key: "POConfirm", value: "Confirmed" },
            { key: "Done", value: "Done" },
            { key: "POCanceled", value: "Canceled" },

        ],
        supplier: {
            id: "",
            address: "",
            supplierName: "",
            phoneNumber: "",
            email: "",
        },

        FromTotalOrderPrice: "",
        ToTotalOrderPrice: "",
        FromDeliveryDate: "",
        ToDeliveryDate: "",
        FromConfirmedDate: "",
        ToConfirmedDate: "",
        ConfirmedByName: "",
        FromCreatedDate: "",
        ToCreatedDate: "",
        FromModifiedDate: "",
        ToModifiedDate: "",

    }
    const [filter, setFilter] = useState({

        currentPage: 1,
        SizePerPage: 25,

        ...purchaserOrderFilterInit

    })
    useEffect(() => {

        dispatch(searchPurchaseOrder({ filter: parseFilterToString(filter), token:token }))
        dispatch(getListQuote({token: token}))
    }, [])

    useEffect(() => {

        setListPriceQuote(
            purchaseOrderStore.listQuote
        )
        setListPurchaseOrder(
            purchaseOrderStore.listPurchaseOrder
        )
        // setpurchaseOrderFilter(
        //     purchaseOrderStore.purchaserOrderFilter
        // )
        setInfoTablePage(
            purchaseOrderStore.infoTablePage
        )

    }, [purchaseOrderStore])
    const columns = [
        {
            dataField: 'id',
            text: 'Order ID',
        },
        {
            dataField: 'createdByName',
            text: 'Create By ',
            hidden: true
        },
        {
            dataField: 'status',
            text: 'Status',
            align: 'center',
            formatter: (cell, row, rowIndex, extraData) => {

                if (row.status === "PurchaseOrder") {
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
        },
        {
            dataField: 'action',
            text: 'Action',
            formatter: (cell, row, rowIndex, extraData) => {
                return (
                    <div onClick={() => history.push("/homepage/purchase/PriceQuote", { orderId: row.id, status: row.status })}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                            <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
                        </svg>
                    </div>


                )
            }
        }


    ];

    const rowEvents = {
        onClick: (e, row, rowIndex) => {

            history.push("/homepage/purchase/PurchaseOrder", { orderID: row.id, status: row.status });




        },

    };
    function cancelFilter(arr) {
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



    // function setListTablePaging(event) {


    //     dispatch(searchPurchaseOrder({ filter: { ...purchaseOrderFilter, [event.target.name]: event.target.value, currentPage: 1 } }))
    // }
    // function pagingPurchaseOrder(index) {
    //     dispatch(searchPurchaseOrder({ filter: { ...purchaseOrderFilter, currentPage: purchaseOrderFilter.currentPage + index } }))
    // }
    // function submitFilter(listselectFilter, filter) {
    //     setListKeyArrayFilter([...listselectFilter])
    //     setShowFilter()
    //     dispatch(searchPurchaseOrder({ filter: filter, token: token }))

    // }
    // function searchKeyWordPurchaseOrder(searchKey) {
    //     dispatch(searchPurchaseOrder({ filter: { ...purchaseOrderFilter, SearchQuery: searchKey } }))
    // }
    function searchKeyWordPurchaseOrder(searchKey) {
        console.log(searchKey)
        setFilter(state => ({ ...state, SearchQuery: searchKey }))

    }
    // function reloadTable() {
    //     searchKeyWordPurchaseOrder("")
    // }
    // function resetFilter() {
    //     setListKeyArrayFilter([])
    //     setShowFilter()
    //     dispatch(searchPurchaseOrder({ filter: { ...purchaseOrderFilter, ...purchaserOrderFilterReset } }))
    // }
    function setListKeyWordArrayFilter(value) {
        setListKeyArrayFilter([...value])
    }
    function setShowFilter() {
        setEventPage((state) => ({
            ...state, isShowFilter: !state.isShowFilter
        }))
    }
    function nextPagingClick() {
        let dataFilter = { ...filter, currentPage: filter.currentPage + 1 }
        dispatch(searchPurchaseOrder({ filter: parseFilterToString(dataFilter) , token:token}))
        setFilter(dataFilter)
    }
    function backPagingClick() {
        let dataFilter = { ...filter, currentPage: filter.currentPage - 1 }
        dispatch(searchPurchaseOrder({ filter: parseFilterToString(dataFilter), token:token }))
        setFilter(dataFilter)
    }
    function setSizePage(event) {
        console.log(event.target.value)
        let dataFilter = { ...filter, SizePerPage: event.target.value }
        dispatch(searchPurchaseOrder({ filter: parseFilterToString(dataFilter), token: token }))
        setFilter(dataFilter)
    }
    function onChangeValueFilter(event) {
        setFilter(state => ({ ...state, [event.target.name]: event.target.value }))

    }
    function setFilterSupplier(supplierValue) {
   
        setFilter(state => ({ ...state, supplier: supplierValue }))

    }
    function selectStatusFilter(selected) {
        setFilter(state => ({ ...state, Statuses: selected.map(item => item) }))

    }
    function parseFilterToString(dataFilter) {
        let filterString = ""
        Object.entries(dataFilter).forEach(item => {
            if (item[1] !== "") {

                if (item[0] === "supplier") {

                    if (item[1]["id"] !== "") filterString += "SupplierId=" + item[1]["id"] + "&"
                }
                else if (item[0] === "Statuses") {
                    item[1].forEach(status => filterString += item[0] + "=" + status.key + "&")

                }
            
                else {

                    filterString += item[0] + "=" + item[1] + "&"
                }

            }
        })
        return filterString
    }
    function submitFilter() {



        dispatch(searchPurchaseOrder({ filter: parseFilterToString(filter) , token:token}))

    }
    function resetFilter() {

        setFilter(state => ({ ...state, ...purchaserOrderFilterInit }))
        dispatch(searchPurchaseOrder({ filter: parseFilterToString({ ...filter, ...purchaserOrderFilterInit }), token: token }))
    }
    const CustomToggleList = ({
        columns,
        onColumnToggle,
        toggles
    }) => (

        <div className=" collapse btn-group btn-group-toggle btn-group-vertical" id="collapseExample" data-toggle="buttons">
            {
                columns
                    .map(column => ({
                        ...column,
                        toggle: toggles[column.dataField]
                    }))
                    .map((column, index) => (

                        <div class="form-check form-switch">
                            <input
                                key={column.dataField}
                                className={`form-check-input ${column.toggle ? 'active' : ''}`}
                                data-toggle="button"
                                checked={column.toggle}
                                type="checkbox"
                                aria-pressed={column.toggle ? 'true' : 'false'}
                                id={"flexSwitchCheckDefault" + index}
                                onClick={() => onColumnToggle(column.dataField)}
                            />
                            <label class="form-check-label" for={"flexSwitchCheckDefault" + index}>{column.text}</label>

                        </div>

                    ))
            }
        </div>
    );
    const NoDataIndication = () => {

        return (<ContentLoader
            speed={2}
            width={"100%"}
            height={400}
            viewBox="0 0 100% 400"
            backgroundColor="#c2c2c2"
            foregroundColor="#ecebeb"

        >
            {/* {console.log(arr.map((_,i) => ( <rect x="-33" y={i*35} rx="3" ry="3" width="634" height="20" /> )))} */}
            {Array.apply(null, Array(20)).map((val, idx) => (<rect x="-33" y={idx * 40} rx="3" ry="3" width="100%" height="30" />))}



        </ContentLoader>
        )
    };


    /////////////////////////////////////////////////////////
    //////PRODUCT VARIANTS
    function productVariantsFilterAPI(string) {
        const updateUrl = `https://imspublicapi.herokuapp.com/api/productvariant/search?${string}`



        return fetch(updateUrl, {

            method: 'GET',
            headers: {

                "Content-Type": "application/json",
                "Origin": ""
            },
            credentials: "include",

        })

            .then(response => response.json())
            .then(json => json)
            .catch((error) => { throw error })
    }

    const productVariantFilterInit = {
        SearchNameOnly: true,
        SearchQuery: "",
        Category: "",
        FromCreatedDate: "",
        ToCreatedDate: "",
        FromModifiedDate: "",
        ToModifiedDate: "",
        CreatedByName: "",
        ModifiedByName: "",
        FromPrice: "",
        ToPrice: "",
        Brand: "",
    }
    const [productVariantsFilter, setProductVariantsFilter] = useState({
        currentPage: 1,
        SizePerPage: 25,
        ...productVariantFilterInit
    })

    function onChangeProductVariantFilter(event) {
        setProductVariantsFilter((state) => ({
            ...state, [event.target.name]: event.target.value
        }))
    }
    function submitProductVariantsFilter() {
        let filterString = ""
        Object.entries(productVariantsFilter).forEach(item => {
            if (item[1] !== "") {
                filterString += item[0] + "=" + item[1] + "&"
            }
        })
        let json = productVariantsFilterAPI(filterString)
        console.log(json)
    }
    function resetProductVariantsFilter() {
        setProductVariantsFilter((state) => ({
            ...state, ...productVariantFilterInit
        }))
    }

    //COMPONENT SEARCH PRODUCT VARIANTS

    // <ProductVariantsFilter 
    // onChangeValueFilter={onChangeProductVariantFilter}
    //  filter={productVariantsFilter} 
    //  submitFilter={submitProductVariantsFilter}
    //  resetFilter={resetProductVariantsFilter}
    //  />




    ////////////////////////////////////////////////////////
    ///SEARCH LOCATION


    // const stockTakeFilterInit = {
    //     IsLocationOnly: true,
    //     SearchQuery: "",
    //     FromImportedDate:"",
    //     ToImportedDate:"",
    //     ProductVariantID:"",
    //     FromTotalPrice:"",
    //     ToTotalPrice:"",
    //     FromPrice:"",
    //     ToPrice:"",
    //     LocationId:"",
    //     FromQuantity:"",
    //     ToQuantity:"",
    // }
    const stockTakeFilterInit = {

        SearchQuery: "",
        FromStatus: "",
        ToStatus: "",
        FromCreatedDate: "",
        ToCreatedDate: "",
        ToTotalPrice: "",
        CreatedByName: "",
        DeliveryMethod: "",
        FromDeliveryDate: "",
        ToDeliveryDate: "",

    }
    const [stockTakeFilter, setStockTakeFilter] = useState({
        currentPage: 1,
        SizePerPage: 25,
        ...stockTakeFilterInit
    })

    function onChangeStockTaketFilter(event) {
        setStockTakeFilter((state) => ({
            ...state, [event.target.name]: event.target.value
        }))
    }
    function submitStockTakeFilter() {
        let filterString = ""
        Object.entries(stockTakeFilter).forEach(item => {
            if (item[1] !== "") {
                filterString += item[0] + "=" + item[1] + "&"
            }
        })
        alert(filterString)
    }
    function resetStockTakeFilter() {

        setStockTakeFilter((state) => ({
            ...state, ...stockTakeFilterInit
        }))
    }

    //////////////////////////////////////////////////////



    return (
        <div className="purchase-quote-order">
            <div className="title-purchase-quote-order">
                <span>Purchase requistion</span>
                <div>6</div>
            </div>


            {purchaseOrderStore.successfulPQ ?
                <Gallery
                    clickQuote={onClickToDetailQuoteOrder}
                    listData={listPriceQuote} /> : <ContentLoader viewBox="0 0 1360 175"
                        backgroundColor="#c2c2c2"
                        foregroundColor="#ecebeb"
                        height={175} width={1360} >
                    <rect x="30" y="20" rx="8" ry="8" width="200" height="200" />
                    <rect x="250" y="20" rx="8" ry="8" width="200" height="200" />
                    <rect x="470" y="20" rx="8" ry="8" width="200" height="200" />
                    <rect x="690" y="20" rx="8" ry="8" width="200" height="200" />
                    <rect x="910" y="20" rx="8" ry="8" width="200" height="200" />
                    <rect x="1130" y="20" rx="8" ry="8" width="200" height="200" />

                </ContentLoader>}



            <div className="title-purchase-quote-order">
                <span>Purchase order</span>

            </div>

            <div class="d-grid gap-2">


                <PurchaseOrderFilter
                    filter={filter}
                    submitFilter={submitFilter}
                    resetFilter={resetFilter}
                    onChangeValueFilter={onChangeValueFilter}
                    selectStatusFilter={selectStatusFilter}
                    setFilterSupplier={setFilterSupplier}
                />
                <div class="p-3 ">
                    <div className="card">
                        <div class="card-header text-white bg-secondary">List Purchase Order</div>
                        <div className="card-body">


                            <PagingComponent rowCountTotal={infoTablePage.rowCountTotal} sizePerPage={filter.SizePerPage} setSizePage={setSizePage} pageCount={infoTablePage.pageCount} nextPagingClick={nextPagingClick} backPagingClick={backPagingClick} currentPage={filter.currentPage} />
                            <p className="dropdown-toggle" data-bs-toggle="collapse" data-bs-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-sliders" viewBox="0 0 16 16">
                                    <path fill-rule="evenodd" d="M11.5 2a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zM9.05 3a2.5 2.5 0 0 1 4.9 0H16v1h-2.05a2.5 2.5 0 0 1-4.9 0H0V3h9.05zM4.5 7a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zM2.05 8a2.5 2.5 0 0 1 4.9 0H16v1H6.95a2.5 2.5 0 0 1-4.9 0H0V8h2.05zm9.45 4a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zm-2.45 1a2.5 2.5 0 0 1 4.9 0H16v1h-2.05a2.5 2.5 0 0 1-4.9 0H0v-1h9.05z" />
                                </svg> Setting Colum
                            </p>

                            <ToolkitProvider
                                keyField="id"
                                data={listPurchaseOrder}
                                columns={columns}
                                columnToggle
                            >
                                {
                                    props => (
                                        <div>
                                            <CustomToggleList {...props.columnToggleProps} />
                                            <hr />
                                            <BootstrapTable
                                                keyField='id'
                                                data={listPurchaseOrder}
                                                columns={columns}
                                                striped
                                                hover
                                                condensed
                                                noDataIndication={() => <NoDataIndication />}
                                                // rowEvents={rowEvents}

                                                //    headerClasses="table-header-receipt"
                                                {...props.baseProps}
                                            />
                                        </div>
                                    )
                                }
                            </ToolkitProvider>




                        </div>
                    </div>
                </div>

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

            {/* <div className="list-receipt-table-container">
                <div className="tool-bar-table">
                    <div className="form-group search-purchase">
                        <img src="..\src\js\images\search.svg" alt="icon-search" />
                        <PurchaseOrderSuggestion searchKeyWordPurchaseOrder={searchKeyWordPurchaseOrder} />
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
                 
                </div>
                <div className="paging-container">

                    <div className="left-size-paging">
                        <select  name="SizePerPage" className="select-row-table">
                            <option value={10}>10</option>
                            <option value={25}>25</option>
                            <option value={50}>50</option>

                        </select>
                        <span>Showing result out of </span>
                    </div>
                    <div className="button-paging">
                        <img onClick={() => pagingPurchaseOrder(-1)} src="..\src\js\images\left-arrow.svg" />
                        {filter.currentPage}
                        <img onClick={() => pagingPurchaseOrder(+1)} src="..\src\js\images\right-arrow.svg" />
                    </div>
                </div>
            </div> */}

            {/* <FilterModal cancelClick={setShowFilter} isShowFilter={eventPage.isShowFilter} listKeyArrayFilter={listKeyArrayFilter} submitFilter={submitFilter} filterValue={purchaseOrderFilter} resetFilter={resetFilter} /> */}



        </div>
    )


}
