import React, { useEffect, useState } from 'react'
import { connect, useDispatch, useSelector } from 'react-redux'
import { useHistory, useLocation, withRouter } from 'react-router-dom'
import { getDetailPurchaseOrder, confirmDetailPurchaseOrder, confirmPurchaseORderByManager, saveProductsPurchaseOrder } from './action'
import NavigationBar from '../../navigation-bar-component/NavigationBar';
import InfoDetailReceipt from '../../info-detail-receipt/InfoDetailReceipt';
import ListProductsTable from '../../list-products-table/ListProductsTable';
import PreviewSendMail from './preview-quote-request';
import sendMailPriceQuote from '../create-price-quote/action';
export default function PurchaseOrder() {
    let dispatch = useDispatch()
    let history = useHistory()
    let location = useLocation()
    let [eventPage, setEventPage] = useState({
        isShowEdit: true,
        isCreatePO: true,
        isShowCancel: false,
        isShowSave: false,
      
    })
    const listColumn = [

        {
            name: "Product Name",

        },
        {
            unit: "Unit",

        },
        {
            orderQuantity: "Quantity",
            input: true,

        },
        {
            price: "Unit Price",
            input: true,

        },
        {
            totalAmount: "Amount"
        }

    ]

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
    function clickToCreate() {
        dispatch(confirmDetailPurchaseOrder(location.state.orderID))
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
                createdBy={detailPurchaseState.transaction.createdBy}
                supplier={detailPurchaseState.supplier}
                date={
                    {
                        createDate: "10/20/2016",
                        deadline: "20/28/200",

                    }
                }
            />
            {console.log(detailPurchaseState.purchaseOrderProduct)}
            <ListProductsTable
                // selectProduct={this.selectProduct}
                //     clickDeleteProduct={this.clickDeleteProduct}

                onChangeValueProduct={onChangeValueProduct}
                //     disabled={this.state.isShowEdit}
                listColumn={listColumn}
                listData={listProductPurchaseOrder} />

        </div>
    )
}
