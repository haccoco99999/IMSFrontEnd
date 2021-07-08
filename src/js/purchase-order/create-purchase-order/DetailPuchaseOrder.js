import React, { useEffect, useState } from 'react'
import { connect, useDispatch, useSelector } from 'react-redux'
import { useHistory, useLocation, withRouter } from 'react-router-dom'
import { getDetailPurchaseOrder, confirmDetailPurchaseOrder, confirmPurchaseORderByManager, saveProductsPurchaseOrder } from './action'
import NavigationBar from '../../navigation-bar-component/NavigationBar';
import InfoDetailReceipt from '../../info-detail-receipt/InfoDetailReceipt';
import ListProductsTable from '../../list-products-table/ListProductsTable';

export default function DetailPurchase() {
    let dispatch = useDispatch()
    let history = useHistory()
    let location = useLocation()
    let [eventPage, setEventPage] = getStateShowButton(location.state.status)
    let purchaseOrderDataGlobal = useSelector(state => state.getDetailPurchaseReducer.detailPurchaseOrder) 
    let [detailPurchaseState, setDetailPurchaseState]= useState(purchaseOrderDataGlobal)

    console.log(detailPurchaseState, "alalla")
    useEffect(() => {
        dispatch(getDetailPurchaseOrder(location.state.orderID))
    }, [])
    useEffect(() => {
        setDetailPurchaseState({
            ...purchaseOrderDataGlobal}
        )
    }, [purchaseOrderDataGlobal])
    


    function getStateShowButton(status) {
        if (status === "PQCreated") {
            return useState({

                isShowEdit: true,
                isShowCancel: false,
                isShowSave: false,
                isShowPreview: true,
            })
        }
        else if (status === "PQSent") {
            return useState({

                isShowEdit: true,
                isShowCancel: false,
                isShowSave: false,
                isConfirmToManager: true,
            })
        }
        else if (status === "POCreated") {
            return useState({

                isShowCancel: true,
                isConfirmByManager: true,
            })
        }
        else if (status === "POConfirm") {
            return useState({

                isCreateGoodReceipt: true
            })
        }
    }

    function checkStatusButton(words) {

        var arrayButton = checkStatusPurchaseOrder()

        return arrayButton.includes(words)

    }

    function checkStatusPurchaseOrder() {

        if (location.state.status === "PQCreated") {
            return ["SAVE", "EDIT", "CANCEL", "PREVIEW_SEND_MAIL"]
        }
        else if (location.state.status === "PQSent") {
            return ["SAVE", "EDIT", "CANCEL", "CONFIRM_TO_MANAGER"]
        }
        else if (location.state.status === "POCreated") {
            return ["CANCEL", "CONFIRM_BY_MANAGER"]
        }
        else if (location.state.status === "POConfirm") {
            return ["CREATE_GOOD_RECEIPT"]
        }
    }
    function editClick() {
        if (location.state.status === "PQCreated") {
            setEventPage({
                isShowEdit: !eventPage.isShowEdit,
                isShowPreview: !eventPage.isShowPreview,
                isShowCancel: !eventPage.isShowCancel,
                isShowSave: !eventPage.isShowSave,
            })
        }
        else if (location.state.status === "PQSent") {
            setEventPage({
                isShowEdit: !eventPage.isShowEdit,
                isConfirmToManager: !eventPage.isConfirmToManager,
                isShowCancel: !eventPage.isShowCancel,
                isShowSave: !eventPage.isShowSave,
            })
        }
    }
    function cancelEditClick() {
        if (location.state.status === "PQCreated") {
            setEventPage({

                isShowEdit: !eventPage.isShowEdit,
                isShowPreview: !eventPage.isShowPreview,
                isShowCancel: !eventPage.isShowCancel,
                isShowSave: !eventPage.isShowSave,
            })
            setDetailPurchaseState(
                purchaseOrderDataGlobal
            )
        }
        else if (location.state.status === "PQSent") {
            setEventPage({
                isShowEdit: !eventPage.isShowEdit,
                isConfirmToManager: !eventPage.isConfirmToManager,
                isShowCancel: !eventPage.isShowCancel,
                isShowSave: !eventPage.isShowSave,
            })
            setDetailPurchaseState(
                purchaseOrderDataGlobal
            )
        }
    }
    function saveEditClick() {
        if (location.state.status === "PQCreated") {
            setEventPage({
                isShowEdit: !eventPage.isShowEdit,
                isShowPreview: !eventPage.isShowPreview,
                isShowCancel: !eventPage.isShowCancel,
                isShowSave: !eventPage.isShowSave,
            })
        }
        else if (location.state.status === "PQSent") {
            setEventPage({
                isShowEdit: !eventPage.isShowEdit,
                isConfirmToManager: !eventPage.isConfirmToManager,
                isShowCancel: !eventPage.isShowCancel,
                isShowSave: !eventPage.isShowSave,
            })
        }
    }
    function confirmClick() {

    }
    function confirmClickByManager() {

    }
    function clickPreview() {

    }

    function goBackClick() {

    }
   function onChangeValueProduct(event){
      
    detailPurchaseState.purchaseOrderProduct[event.target.id][event.target.name] = event.target.value
    setDetailPurchaseState(
        {
        ...detailPurchaseState}
    )
    }
    const listButton = [


        checkStatusButton("EDIT") ? {
            isShow: eventPage.isShowEdit,
            title: "Edit",
            action: () => editClick(),
            style: {
                "background-color": "#f9c421"
            }
        } : null,
        checkStatusButton("CANCEL") ? {
            isShow: eventPage.isShowCancel,
            title: "Cancel",
            action: () => cancelEditClick(),
            style: {
                background: "red"
            }
        } : null,
        checkStatusButton("SAVE") ? {
            isShow: eventPage.isShowSave,
            title: "Save",
            action: () => saveEditClick(),
            style: {
                background: "#4ca962"
            }
        } : null,
        checkStatusButton("CONFIRM_TO_MANAGER") ? {
            isShow: eventPage.isConfirmToManager,
            title: "Confirm for manager",
            action: () => confirmClick(),
            style: {
                background: "#4e9ae8"
            }
        } : null,
        checkStatusButton("CONFIRM_BY_MANAGER") ? {
            isShow: eventPage.isConfirmByManager,
            title: "Confirm By manager",
            action: () => confirmClickByManager(),
            style: {
                background: "#4e9ae8"
            },


        } : null,
        checkStatusButton("PREVIEW_SEND_MAIL") ? {
            isShow: eventPage.isShowPreview,
            title: "Preview Mail To Send",
            action: () => clickPreview(),
            style: {
                background: "#4e9ae8"
            },


        } : null,
        checkStatusButton("CREATE_GOOD_RECEIPT") ? {
            isShow: eventPage.isCreateGoodReceipt,
            title: "Preview Mail To Send",
            action: () => clickPreview(),
            style: {
                background: "#4e9ae8"
            },


        } : null
    ]


    return (
        <div>
            <NavigationBar actionGoBack={() => goBackClick()}
                titleBar="hunghanhphuc"
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
            
                
                 onChangeValueProduct={onChangeValueProduct}
               
                listColumn={["Product No", "Product Name", "Unit", "Quantity", "Unit Price", "Ammount"]} 
                listData={detailPurchaseState.purchaseOrderProduct} />
        </div>
    )
}
