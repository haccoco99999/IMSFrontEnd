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
import { SearchToAddProduct } from '../../search-component/SearchComponentAll';
export default function PurchaseOrderConfirm() {
    let dispatch = useDispatch()
    let history = useHistory()
    let location = useLocation()
    let [eventPage, setEventPage] = useState({
        isConform: false


    })
    const columns = [
        {
            dataField: 'sku',
            text: 'SKU',
            // formatter: (cell, row, rowIndex, extraData) =>{
            //     return (
            //         <SearchToAddProduct/>
            //     )
            // }
        },
        {
            dataField: 'name',
            text: 'Product Name',
        },
        {
            dataField: 'orderQuantity',
            text: 'Quantity',
        },
        {
            dataField: 'price',
            text: 'Price',
        },

        {
            dataField: 'totalAmount',
            text: 'Total Price',
        }



    ];

    let purchaseOrderDataGlobal = useSelector(state => state.getDetailPurchaseReducer.detailPurchaseOrder)
    let [detailPurchaseState, setDetailPurchaseState] = useState(purchaseOrderDataGlobal)
    let [listProductPurchaseOrder, setListProductPurchaseOrder] = useState(purchaseOrderDataGlobal.purchaseOrderProduct)
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
    return (
        <div>
            <NavigationBar actionGoBack={() => goBackClick()}
                titleBar="NO10235"
                listButton={listButton}
            />
            <InfoDetailReceipt

                date={
                    {
                        createDate: "10/20/2016",
                        deadline: "20/28/200",

                    }
                }
            />
            {console.log(detailPurchaseState.purchaseOrderProduct)}
            {/* <ListProductsTable
                // selectProduct={this.selectProduct}
                //     clickDeleteProduct={this.clickDeleteProduct}

                onChangeValueProduct={onChangeValueProduct}
                //     disabled={this.state.isShowEdit}
                listColumn={listColumn}
                listData={listProductPurchaseOrder} />

            <ConfirmDateModal confirmClick={confirmClick} cancelConfirmClick={cancelClick} isConfirm={eventPage.isConfirm} /> */}

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


        </div>
    )
}
