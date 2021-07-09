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
        isShowMergePage: false,
        isShowAddProductPage: false,
        isShowEdit: true,
        isCreatePO: true,
        isShowCancel: false,
        isShowSave: false,
    })
    const [test, setTest] = useState("abc")
    function  changeTest(e){
      
        setTest(e.target.value)
    }
    function selectProduct(infoProduct) {
        alert(infoProduct)
    }
    function changeProduct(status, rownIndex, name) {
   
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
            // formatter: (cell, row, rowIndex, extraData) => {

            //     console.log(row.productVariantId)
            //     if (row.productVariantId !== "") {
            //         return (
            //             <div>
            //                 <p>{row.sku} </p>
            //                 <span onClick={() => changeProduct(!row.changeProduct, rowIndex, "changeProduct")} >Change Product </span>
            //                 {row.changeProduct === true ? <SearchToAddProduct selectProduct={selectProduct} /> : ""}
            //             </div>


            //         )
            //     }

            //     return <SearchToAddProduct selectProduct={selectProduct} />


            // }
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
                    <input onChange={(e) =>onChangeValueProduct(e, row.productVariantId)} name="orderQuantity" className="form-control" value={row.orderQuantity} />
                )
            }
        },
        {
            dataField: 'action',
            text: 'action',
            formatter:(row) =>{
                return <input value={test} onChange={(e) => changeTest(e)}/>
            }
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

 
    function editClick() {
        setEventPage({
            isShowEdit: false,
            isCreatePO: false,
            isShowCancel: true,
            isShowSave: true,
            
        })
    }
    function cancelEditClick() {
        setEventPage({
            isShowEdit: true,
            isCreatePO: true,
            isShowCancel: false,
            isShowSave: false,
            
        })
    }
    function saveEditClick() {
        setEventPage({
            isShowEdit: true,
            isCreatePO: true,
            isShowCancel: false,
            isShowSave: false,
            
        })
    }
    const listButton = [


        {
            isShow: eventPage.isShowEdit,
            title: "Edit",
            action: () => editClick(),
            style: {
                "background-color": "#f9c421"
            }
        },
        {
            isShow: eventPage.isShowCancel,
            title: "Cancel",
            action: () => cancelEditClick(),
            style: {
                background: "red"
            }
        },
        {
            isShow: eventPage.isShowSave,
            title: "Save",
            action: () => saveEditClick(),
            style: {
                background: "#4ca962"
            }
        },


        {
            isShow: eventPage.isCreatePO,
            title: "Create Purchase Order",
            action: () => clickToCreate(),
            style: {
                background: "#4e9ae8"
            },


        },
    ]
    function mergePriceQuote(listDataPriceQuote){
        
     let listPriceQuote  = listDataPriceQuote.filter(priceQuote=> priceQuote.isChecked)
     let listProductPurchaseOrderMerge = listPriceQuote.map(priceQuote => priceQuote.listProductOrder)
     let temp = [...listProductPurchaseOrder]
      console.log(listProductPurchaseOrderMerge)
      //Merge phiếu
     listProductPurchaseOrderMerge.map(arrayProduct=>{
         arrayProduct.map(product =>{
             let count = 0
           
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


    const onChangeValueProduct = (event, productVariantId) => {
        console.log(event.target.name)
        console.log(event.target.value)
        setListProductPurchaseOrder(
            listProductPurchaseOrder.map((element) =>{
            return    element.productVariantId === productVariantId ?
                    {
                        ...element, [event.target.name]: event.target.value,
                      
                    }
                    : element})
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
    function clickSetShowAddProductPage(){
        setEventPage((state) =>{
           return{ ...state, isShowAddProductPage: !state.isShowAddProductPage }
        })
    }
    function clickToAddProduct(product){
        // console.log(product)
        setListProductPurchaseOrder((state) =>[...state, product])
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
            {console.log(listProductPurchaseOrder)}
            {/* <button onClick={addRowProduct}>Add Product</button> */}
            <button onClick={clickSetShowAddProductPage}>Add Product</button>
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
                <FormAddProductModal 
                clickSetShowAddProductPage={clickSetShowAddProductPage}
                isShowAddProductPage={eventPage.isShowAddProductPage}
                clickToAddProduct = {clickToAddProduct}
                
                />

<input value={test} onChange={(e) => changeTest(e)}/>
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
