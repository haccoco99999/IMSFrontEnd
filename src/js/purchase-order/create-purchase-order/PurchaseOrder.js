import React, { useEffect, useState } from 'react'
import { connect, useDispatch, useSelector } from 'react-redux'
import { useHistory, useLocation, withRouter } from 'react-router-dom'
import { getDetailPurchaseOrder, confirmDetailPurchaseOrder, sendMailService, confirmPurchaseORderByManager, saveProductsPurchaseOrder, rejectPurchaseOrderConfirm } from './action'
import NavigationBar from '../../navigation-bar-component/NavigationBar';
import InfoDetailReceipt from '../../info-detail-receipt/InfoDetailReceipt';
import ListProductsTable from '../../list-products-table/ListProductsTable';
import PreviewSendMail from './preview-quote-request';
import sendMailPriceQuote from '../create-price-quote/action';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import BootstrapTable from 'react-bootstrap-table-next';
import cellEditFactory, { Type } from "react-bootstrap-table2-editor";
import RejectReceiptModal from '../../RejectReceiptModal/RejectReceiptModal';
import ConfirmDateModal from './ConfirmDateModal';
import FormAddProductModal from './FormAddProductModal';

export default function PurchaseOrder() {
    let dispatch = useDispatch()
    let history = useHistory()
    let location = useLocation()
    let [eventPage, setEventPage] = useState({
        isShowEdit: true,
        isCreatePO: true,
        isShowCancel: false,
        isShowSave: false,

        isShowConfirm: false,
        isShowReject: false,

        isShowAddProductPage: false,

    })
    const columns = [
        {
            dataField: 'sku',
            text: 'SKU',
            editable: false
        },
        {
            dataField: 'name',
            text: 'Product Name',
            editable: false,
        },
        {
            dataField: 'orderQuantity',
            text: 'Quantity',
            editable: true,
            editable: !eventPage.isShowEdit,
            formatter: (cellContent, row, rowIndex) => {
                return (
                    <div>
                        {!eventPage.isShowEdit ? <input className="form-control" value={row.orderQuantity} type="text" /> : row.orderQuantity}
                    </div>);
            },
            validator: (newValue, row, column) => {
                if (isNaN(newValue)) {
                    return {
                        valid: false,
                        message: 'Price should be numeric'
                    };
                }
                if (newValue <= 0) {
                    return {
                        valid: false,
                        message: 'Price should bigger than 0'
                    };
                }
                return true;
            }
        },
     
        {
            dataField: 'totalAmount',
            text: 'Total Price',
            editable: false,
            formatter: (cellContent, row, rowIndex) => {

                return (
                    row.orderQuantity * row.price
                );
            },
        },
        {
            dataField: 'action',
            text: 'action',
            editable: false,
            formatter: (cellContent, row, rowIndex) => {
                return (
                    <button
                        type="button"
                        className="btn btn-danger"
                        onClick={() => clickDeleteProduct(rowIndex)}
                    >
                        Delete
                    </button>
                );
            },
        },



    ];

    let {
        purchaseOrderDataGlobal,
        token,
        updatePurchaseOrderStatus,
        submitPurchaseOrderStatus,
        confirmPurchaserOrderStatus,
        rejectPurchaserOrderStatus
    } = useSelector(state => ({
        purchaseOrderDataGlobal: state.getDetailPurchaseReducer.detailPurchaseOrder,
        token: state.client.token,
        updatePurchaseOrderStatus: state.updatePurchaseOrder,
        submitPurchaseOrderStatus: state.submitPurchaseOrder,
        confirmPurchaserOrderStatus: state.confirmPurchaserOrder,
        rejectPurchaserOrderStatus: state.rejectPurchaserOrder,
    }))
    let [detailPurchaseState, setDetailPurchaseState] = useState(purchaseOrderDataGlobal)
    let [listProductPurchaseOrder, setListProductPurchaseOrder] = useState(purchaseOrderDataGlobal.purchaseOrderProduct)
    useEffect(() => {
        dispatch(getDetailPurchaseOrder(location.state.orderID))
    }, [])


    useEffect(() => {
        if (updatePurchaseOrderStatus.requesting === true) {
            alert("Danh update PO")
        }
        else if (updatePurchaseOrderStatus.successful === true) {
            alert("Update PO Thanh Cong")
        }
        else if (updatePurchaseOrderStatus.errors === true) {
            alert("Update PO Thất Bại")
        }

        if (submitPurchaseOrderStatus.requesting === true) {
            alert("Dang Submit")
        }
        else if (submitPurchaseOrderStatus.successful === true) {
            alert("Submit Thanh Cong")
        }
        else if (submitPurchaseOrderStatus.errors === true) {
            alert("Submit That Bai")
        }

        if (rejectPurchaserOrderStatus.requesting === true) {
            alert("Dang Reject")
        }
        else if (rejectPurchaserOrderStatus.successful === true) {
            alert("Reject Thanh Cong")
        }
        else if (rejectPurchaserOrderStatus.errors === true) {
            alert("Reject That Bai")
        }

        if (confirmPurchaserOrderStatus.requesting === true) {
            alert("Dang Confirm")
        }
        else if (confirmPurchaserOrderStatus.successful === true) {
            alert("Confirm Thanh Cong")
        }
        else if (confirmPurchaserOrderStatus.errors === true) {
            alert("Confirm That Bai")
        }
    }, [updatePurchaseOrderStatus,
        submitPurchaseOrderStatus,
        rejectPurchaserOrderStatus,
        confirmPurchaserOrderStatus

    ])

    useEffect(() => {
        setDetailPurchaseState({
            ...purchaseOrderDataGlobal
        })
        setListProductPurchaseOrder(
            purchaseOrderDataGlobal.purchaseOrderProduct.map(product => {
                return {
                    ...product
                }
            })
        )
    }, [purchaseOrderDataGlobal])

    console.log(listProductPurchaseOrder)
    function statusButton(status) {
        if (status === "PurchaseOrder") {
            return [{
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
                title: "Submit",
                action: () => clickToSubmitPurchaseOrder(),
                style: {
                    background: "#4e9ae8"
                },


            },]
        }


        else if (status === "POWaitingConfirmation") {
            return [
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
                    isShow: true,
                    title: "Ignore",
                    action: () => isShowRejectModal(),
                    style: {
                        background: "red"
                    }
                },

                {
                    isShow: true,
                    title: "Confirm",
                    action: () => isShowConfirmModal(),
                    style: {
                        "background-color": "#4e9ae8"
                    }
                },

            ]

        }
        else if (status === "POConfirm") {
            return [
                {
                    isShow: true,
                    title: "Create Good Receipt",
                    action: () => IgnorePurchase(),
                    style: {
                        background: "blue"
                    }
                },


            ]

        }
        else {
            return []
        }
    }
    function clickDeleteProduct(rowIndex) {
        setListProductPurchaseOrder((state) => (

            state.filter((_, i) => i !== rowIndex)


        ))
    }


    const listButton = statusButton(location.state.status)




    function editClick() {
        setEventPage({
            isShowEdit: false,
            isCreatePO: false,
            isShowCancel: true,
            isShowSave: true,

        })
    }
    function cancelEditClick() {
        setListProductPurchaseOrder(
            purchaseOrderDataGlobal.purchaseOrderProduct.map(product => {
                return {
                    ...product
                }
            })
        )
        setEventPage({
            isShowEdit: true,
            isCreatePO: true,
            isShowCancel: false,
            isShowSave: false,

        })
    }
    function saveEditClick() {

        const dataUpdate = {
            purchaseOrderNumber: detailPurchaseState.orderId,
            mailDescription: "string",
            orderItemInfos: listProductPurchaseOrder.map(product => {
                return {
                    productVariantId: product.productVariantId,
                    orderQuantity: product.orderQuantity,
                    unit: product.unit,
                    price: product.price,
                    discountAmount: product.discountAmount,
                    totalAmount: product.totalAmount,
                }
            })

        }
        console.log(dataUpdate)
        dispatch(saveProductsPurchaseOrder({ data: dataUpdate, token: token }))
        setEventPage({
            isShowEdit: true,
            isCreatePO: true,
            isShowCancel: false,
            isShowSave: false,

        })
    }
    function clickToSubmitPurchaseOrder() {
        let data = {

            purchaseOrderNumber: location.state.orderID

        }
        dispatch(confirmDetailPurchaseOrder({ data: data, token, token }))
        // goBackClick()
    }

    function isShowConfirmModal() {
        setEventPage((state) => ({
            ...state, isShowConfirm: !state.isShowConfirm,
        }))
    }
    function isShowRejectModal() {
        setEventPage((state) => ({
            ...state, isShowReject: !state.isShowReject,
        }))
    }
    function sendMailSupplier(pdf, note) {

    }



    function clickToCLoseConfirm(status, pdf, note) {
        if (status === true) {
            let data = {
                purchaseOrderNumber: detailPurchaseState.orderId
            }
            if (pdf !== undefined) {
                // sendMailSupplier(pdf)
                const formData = new FormData();

                formData.append('To', 'hungppse130422@fpt.edu.vn')
                formData.append('Content', note)
                formData.append('Subject', 'Gui MAil')
                formData.append('pdf', pdf)
                dispatch(sendMailService({ data: formData }))
            }
            dispatch(confirmPurchaseORderByManager({ data: data, token: token }))
            // goBackClick()
        }
        setEventPage((state) => ({
            ...state, isShowConfirm: !state.isShowConfirm,
        }))
    }
    function clickToCLoseReject(cancelReason) {
        if (cancelReason !== undefined) {
            console.log(cancelReason)
            let data = {
                id: detailPurchaseState.orderId,
                cancelReason: cancelReason,
            }
            dispatch(rejectPurchaseOrderConfirm({ data: data, token }))
            // goBackClick()
        }
        setEventPage((state) => ({
            ...state, isShowReject: !state.isShowReject,
        }))
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
    function clickSetShowAddProductPage() {
        setEventPage((state) => {
            return { ...state, isShowAddProductPage: !state.isShowAddProductPage }
        })
    }
    function clickToAddProduct(product) {
        if (checkProductExist(product.productVariantId)) {
            setListProductPurchaseOrder((state) => state.map(item =>
                item.productVariantId === product.productVariantId ? { ...item, orderQuantity: item.orderQuantity + product.orderQuantity } : item))
        }
        else {
            setListProductPurchaseOrder((state) => [...state, product])
        }

        clickSetShowAddProductPage()
    }

    function goBackClick() {
        history.go(-1)
    }
    function checkProductExist(productVariantId) {
        return listProductPurchaseOrder.some(product => product.productVariantId === productVariantId)
    }
    function addGroupProduct(listGroupProduct) {

        console.log("aa", listGroupProduct)
        let listGroupProductIsSelected = listGroupProduct.filter(product => product.isChecked)
        console.log(listGroupProductIsSelected)
        let listGroupProductSelected = listGroupProductIsSelected.map(groupProduct => groupProduct.listProductVariant)
        let temp = [...listProductPurchaseOrder]


        listGroupProductSelected.map(arrayProduct => {
            arrayProduct.map(product => {
                let count = 0

                if (temp.some(function (p, index) {
                    count = index
                    return p.productVariantId === product.productVariantId
                })) {
                }
                else {
                    temp.push({ ...product })
                }


            })
        })
        console.log("bb", temp)
        setListProductPurchaseOrder((state) =>
            [...temp]
        )
        clickSetShowAddProductPage()

    }
    return (
        <div>
            <NavigationBar actionGoBack={() => goBackClick()}
                titleBar={detailPurchaseState.orderId}
                listButton={listButton}
            />

            {location.state.status === "POCanceled" ? <div class="card text-white alert-danger mb-3" >
                <div class="row">


                    <div class="card-body col-sm-4">
                        <h5 class="card-title text-danger">Reject By:</h5>
                        <div className="form-text text-danger">
                            Name:
                        </div>
                        <label className="form-check-label text-danger" >
                            Logan
                        </label>
                        <div className="form-text text-danger">
                            Phone Number:
                        </div>
                        <label className="form-check-label text-danger" >
                            2621546165
                        </label>

                    </div>
                    <div class="card-body col-sm-8">
                        <h5 class="card-title text-danger">Reson:</h5>
                        <p class="card-text text-danger">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                    </div>
                </div>
            </div> : ""}

            <InfoDetailReceipt
                applicationUser={detailPurchaseState.applicationUser}
                supplier={detailPurchaseState.supplier}
                date={
                    {
                        createDate: "10/20/2016",
                        deadline: "20/28/200",

                    }
                }
            />


            <div className="list-receipt-table-container">
                <div className="table-container">
                    <BootstrapTable
                        keyField='productVariantId'
                        data={listProductPurchaseOrder}
                        columns={columns}
                        striped
                        hover
                        condensed
                        noDataIndication="Table is Empty"
                        // rowEvents={rowEvents}

                        cellEdit={cellEditFactory({
                            mode: "click",
                            blurToSave: true,
                        })}
                        cellEdit={cellEditFactory({
                            mode: "click",
                            blurToSave: true,
                            afterSaveCell: (oldValue, newValue, row, column) => { row.totalAmount = row.orderQuantity * row.price }
                        })}



                        headerClasses="table-header-receipt"

                    />
                    {!eventPage.isShowEdit ?
                        <div class="btn-toolbar mb-3" role="toolbar" aria-label="Toolbar with button groups">
                            <div class="btn-group me-2" role="group" aria-label="First group">
                                <button type="button" class="btn btn-outline-primary" onClick={clickSetShowAddProductPage}>Add Product</button>

                            </div>

                        </div> : ""}
                </div>
            </div>

            <ConfirmDateModal

                listProduct={listProductPurchaseOrder}
                infoPriceQuote={detailPurchaseState}
                clickToCLoseConfirm={clickToCLoseConfirm} isConfirm={eventPage.isShowConfirm} />
            <RejectReceiptModal clickToCLoseReject={clickToCLoseReject} isReject={eventPage.isShowReject} />
            <FormAddProductModal
                clickSetShowAddProductPage={clickSetShowAddProductPage}
                isShowAddProductPage={eventPage.isShowAddProductPage}
                clickToAddProduct={clickToAddProduct}
                addGroupProduct={addGroupProduct}
                checkProductExist={checkProductExist}

            />


        </div>
    )
}