import React, { useEffect, useState } from 'react'
import { connect, useDispatch, useSelector } from 'react-redux'
import { useHistory, useLocation, withRouter } from 'react-router-dom'
import { getDetailPurchaseOrder,ignorePurchaseOrderConfirm, confirmDetailPurchaseOrder, confirmPurchaseORderByManager, saveProductsPurchaseOrder } from './action'
import NavigationBar from '../../navigation-bar-component/NavigationBar';
import InfoDetailReceipt from '../../info-detail-receipt/InfoDetailReceipt';
import ListProductsTable from '../../list-products-table/ListProductsTable';

import ConfirmDateModal from './ConfirmDateModal';
export default function PurchaseOrderDone() {
    let dispatch = useDispatch()
    let history = useHistory()
    let location = useLocation()
    let [eventPage, setEventPage] = useState({
        isConform: false


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
            isShow: true,
            title: "Create Good Receipt",
            action: () => IgnorePurchase(),
            style: {
                background: "red"
            }
        },

      
    ]



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
            <ListProductsTable
                // selectProduct={this.selectProduct}
                //     clickDeleteProduct={this.clickDeleteProduct}

                // onChangeValueProduct={onChangeValueProduct}
                     disabled={false}
                listColumn={listColumn}
                listData={listProductPurchaseOrder} />



        </div>
    )
}
