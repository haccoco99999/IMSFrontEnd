import React, { useEffect, useState } from 'react'
import { connect, useDispatch, useSelector } from 'react-redux'
import { useHistory, useLocation, withRouter } from 'react-router-dom'
import { getDetailPurchaseOrder, ignorePurchaseOrderConfirm, confirmDetailPurchaseOrder, confirmPurchaseORderByManager, saveProductsPurchaseOrder } from './action'
import NavigationBar from '../../navigation-bar-component/NavigationBar';
import InfoDetailReceipt from '../../info-detail-receipt/InfoDetailReceipt';
import ListProductsTable from '../../list-products-table/ListProductsTable';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import BootstrapTable from 'react-bootstrap-table-next';
import ConfirmDateModal from './ConfirmDateModal';
import './PriceQuote.css'
import { SearchToAddProduct, SeachSupplier } from '../../search-component/SearchComponentAll';
import MergePriceQuote from './MergePriceQuoteComponent';
import FormAddProductModal from './FormAddProductModal';
export default function PurchaseOrderConfirm() {
    let dispatch = useDispatch()
    let history = useHistory()
    let location = useLocation()
    let [eventPage, setEventPage] = useState({
        isConform: false,
        isShowMergePage: false
        
    })
   
    function selectProduct(infoProduct) {
        alert(infoProduct)
    }
    function changeProduct(status, rownIndex, name) {
        console.log(status)
        console.log(rownIndex)
        console.log(name)
        setListProductPurchaseOrder(
            listProductPurchaseOrder.map((element, index) =>
                index == rownIndex ?
                    {
                        ...element, [name]: status,

                    }
                    : {
                        ...element, [name]: false,

                    })
        )
    }
    const columns = [
        {
            dataField: 'sku',
            text: 'SKU',
            formatter: (cell, row, rowIndex, extraData) => {

                console.log(row.productVariantId)
                if (row.productVariantId !== "") {
                    return (
                        <div>
                            <p>{row.sku} </p>
                            <span onClick={() => changeProduct(!row.changeProduct, rowIndex, "changeProduct")} >Change Product </span>
                            {row.changeProduct === true ? <SearchToAddProduct selectProduct={selectProduct} /> : ""}
                        </div>


                    )
                }

                return <SearchToAddProduct selectProduct={selectProduct} />


            }
        },
        {
            dataField: 'name',
            text: 'Product Name',
        },
        {
            dataField: 'orderQuantity',
            text: 'Quantity',
            formatter: (cell, row, rowIndex, extraData) => {
                return (
                    <input className="form-control" value={row.orderQuantity} />
                )
            }
        },
        {
            dataField: 'action',
            text: 'action',
            // formatter: (cell, row, rowIndex, extraData) => {
            //     return (
            //         <input className="form-control" value={row.orderQuantity} />
            //     )
            // }
        },




    ];

    let purchaseOrderDataGlobal = useSelector(state => state.getDetailPurchaseReducer.detailPurchaseOrder)
    let [detailPurchaseState, setDetailPurchaseState] = useState(purchaseOrderDataGlobal)
    let [listProductPurchaseOrder, setListProductPurchaseOrder] = useState(purchaseOrderDataGlobal.purchaseOrderProduct)
    let [supplier, setSupplier] = useState({
        address: "",
        description: "",
        email: "",
        id: "",
        phoneNumber: "",
        salePersonName: "",
        supplierName: "",
        transactionId: ""
    })
    useEffect(() => {
        dispatch(getDetailPurchaseOrder(location.state.orderID))
    }, [])


    useEffect(() => {
        setDetailPurchaseState({
            ...purchaseOrderDataGlobal
        })
        setListProductPurchaseOrder(
            purchaseOrderDataGlobal.purchaseOrderProduct
        )
    }, [purchaseOrderDataGlobal])

    console.log(listProductPurchaseOrder)
    const listButton = [
        {
            isShow: true,
            title: "Ignore",
            action: () => IgnorePurchase(),
            style: {
                background: "red"
            }
        },

        {
            isShow: true,
            title: "Confirm",
            action: () => editClick(),
            style: {
                "background-color": "#4e9ae8"
            }
        },
    ]
        
    function mergePriceQuote(listDataPriceQuote){
        
     let listPriceQuote  = listDataPriceQuote.filter(priceQuote=> priceQuote.isChecked)
     let listProductPurchaseOrderMerge = listPriceQuote.map(priceQuote => priceQuote.listProductOrder)
     let temp = [...listProductPurchaseOrder]
      console.log(listProductPurchaseOrderMerge)
     let allProductMerge = listProductPurchaseOrderMerge.map(arrayProduct=>{
         arrayProduct.map(product =>{
             let count = 0
            // if(productExist(product.productVariantId, temp, count)){
            //     console.log(count)
            // }
            if(temp.some(function(p, index){
                count = index
                return p.productVariantId === product.productVariantId
            })){
             temp[count].orderQuantity = temp[count].orderQuantity + product.orderQuantity
            }
            else{
                temp.push(product)
            }
         
           
         })
     })
     console.log(temp)
     setListProductPurchaseOrder((state)=>
         [...temp]
     )
      
    }
    // function productExist(productVariantId, arr, count){
    //     return arr.some(function(product, index){
    //         console.log(index)
    //         return product.productVariantId === productVariantId
    //     })
    // }
    function confirmClickByManager() {
        setEventPage({
            isConfirm: true
        })
    }

    function cancelClick() {
        setEventPage({
            isConfirm: false
        })
    }
    function IgnorePurchase() {
        dispatch(ignorePurchaseOrderConfirm(location.state.orderID))
    }
    function confirmClick() {
        dispatch(confirmPurchaseORderByManager(location.state.orderID))
    }


    const onChangeValueProduct = (event) => {

        setListProductPurchaseOrder(
            listProductPurchaseOrder.map((element, index) =>
                index == event.target.id ?
                    {
                        ...element, [event.target.name]: event.target.value,
                        totalAmount: ([event.target.name] === "orderQuantity" ? event.target.value * element.price : event.target.value * element.orderQuantity)
                    }
                    : element)
        )

    }
    function addRowProduct() {
        let newProduct = {
            changeProduct: false,
            id: "",
            orderId: "",
            productVariantId: "",
            orderQuantity: 0,
            unit: "",
            price: 0,
            discountAmount: 0,
            totalAmount: 0,
            name: "",
            sku: "",
        }
        setListProductPurchaseOrder((state) => [...state, newProduct])
    }
    function openModalMergePriceQuote() {

    }
    function getDataSupplier(supplier) {
        console.log(supplier)
        setSupplier(supplier)
    }
    function clickSetEventMergePriceQuote(){
        setEventPage((state) =>{
           return{ ...state, isShowMergePage: !state.isShowMergePage }
        })
    }
    return (
        <div>
            <NavigationBar actionGoBack={() => goBackClick()}
                titleBar="NO10235"
                listButton={listButton}
            />
            <InfoDetailReceipt
                createdBy={detailPurchaseState.transaction.createdBy}
                supplier={detailPurchaseState.supplier}
                date={
                    {
                        createDate: "10/20/2016",
                        deadline: "20/28/200",

                    }
                }
            />

            <div className="list-receipt-table-container price-quote-info-supplier">
                <div className="info-supplier-email-name">
                    <p>Suppli <SeachSupplier getDataSupplier={getDataSupplier} /> </p>
                    <p> Email: {supplier.email} </p>
                </div>
                <div className="info-supplier-phone-address">
                    <p>  Phone No: {supplier.phoneNumber}</p>
                    <p>  Address: {supplier.address}</p>
                </div>
            </div>
            {console.log(detailPurchaseState.purchaseOrderProduct)}
            <button onClick={addRowProduct}>Add Product</button>
            <button onClick={clickSetEventMergePriceQuote} >Merge Price Quote</button>
            <p class="btn btn-default fw-bold filter"
                data-bs-target="#FilterModal"
                data-bs-toggle="modal"
                >Merge</p>
            <div className="list-receipt-table-container">
                <div className="tool-bar-table">

                    <div className="list-icon-tool-bar">
                        <div className="icon-tool-bar"><i class='bx bx-rotate-right'></i></div>
                        <div className="icon-tool-bar"><i class='bx bx-filter'></i></div>
                        <div className="icon-tool-bar"><i class='bx bx-cog'></i></div>

                    </div>

                </div>
                <div className="table-container">
                    <BootstrapTable
                        keyField='id'
                        data={listProductPurchaseOrder}
                        columns={columns}
                        striped
                        hover
                        condensed
                        noDataIndication="Table is Empty"
                        // rowEvents={rowEvents}

                        headerClasses="table-header-receipt"
                    />
                </div>


            </div>



            <MergePriceQuote 
             clickSetEventMergePriceQuote={clickSetEventMergePriceQuote}
              isShowMergePage={eventPage.isShowMergePage}
              mergePriceQuote={mergePriceQuote}
              />
            {/* <ListProductsTable
                // selectProduct={this.selectProduct}
                //     clickDeleteProduct={this.clickDeleteProduct}

                onChangeValueProduct={onChangeValueProduct}
                //     disabled={this.state.isShowEdit}
                listColumn={listColumn}
                listData={listProductPurchaseOrder} />

            <ConfirmDateModal confirmClick={confirmClick} cancelConfirmClick={cancelClick} isConfirm={eventPage.isConfirm} /> */}


        </div>
    )
}
