import React, { useEffect, useState } from 'react'
import { connect, useDispatch, useSelector } from 'react-redux'
import { useHistory, useLocation, withRouter } from 'react-router-dom'
import { getDetailPurchaseOrder, sendMailService, createPurchaseOrder, rejectPurchaseOrderConfirm, createPriceQuote, confirmDetailPurchaseOrder, confirmPurchaseORderByManager, saveProductsPurchaseOrder, editPriceQuote } from './action'
import NavigationBar from '../../navigation-bar-component/NavigationBar';
// import sendMailPriceQuote from '../create-price-quote/action';
// import InfoDetailReceipt from '../../info-detail-receipt/InfoDetailReceipt';
import ToolkitProvider, { ColumnToggle } from 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit';

import ListProductsTable from '../../list-products-table/ListProductsTable';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import BootstrapTable from 'react-bootstrap-table-next';
import ConfirmDateModal from './ConfirmDateModal';
import './PriceQuote.css'
import { SearchToAddProduct, SeachSupplier } from '../../search-component/SearchComponentAll';
import MergePriceQuote from './MergePriceQuoteComponent';
import FormAddProductModal from './FormAddProductModal';
import TextEditor from '../../text-editor-compoent/text-editor-compoent';
import PreviewSendMail from './preview-quote-request';
import cellEditFactory, { Type } from "react-bootstrap-table2-editor";
import Swal from 'sweetalert2'
import RejectReceiptModal from '../../RejectReceiptModal/RejectReceiptModal';
import { CONFIRM_PURCHASE_ORDER_RESET, CREATE_PRICE_QUOTE_RESET, CREATE_PURCHASE_ORDER_RESET, GET_DETAIL_PURCHASE_ORDER_RESET, REJECT_PURCHASE_ORDER_CONFIRM_RESET, SEND_MAIL_SERVICE_RESET, SUBMIT_PURCHASE_ORDER_RESET } from './contants';
import { InfoPurchaseOrderLoader, TableLoading } from '../../components/loading/loading-component';

export default function PurchaseOrderConfirm() {
    const dispatch = useDispatch()
    const history = useHistory()
    const location = useLocation()
    const [eventPage, setEventPage] = useState({
        isConform: false,
        isShowMergePage: false,
        isShowAddProductPage: false,
        isShowEdit: false,
        isCreatePO: false,
        isShowReject: false,
        isShowConfirm: false,
        isPreview: false,
        isResend: false,
        isShowEditListProducts: false
    })
    // alert(eventPage.isShowEditListProducts)

    const [listTransactions, setListTransactions] = useState([])
    const [mergedRequisitionIds, setMergedRequisitionIds] = useState([location.state.orderId])
    const {
        purchaseOrderDataGlobal,
        token, priceQuoteUpdateStatus,
        createPriceQuoteStatus,
        mailOrderDataStatus,
        submitPurchaseOrderStatus,
        rejectPurchaserOrderStatus,
        confirmPurchaserOrderStatus,
        createPurchaserOrderStatus,
        purchaseOrderDetailStore,

    } = useSelector(state => ({
        purchaseOrderDataGlobal: state.getDetailPurchaseReducer.detailPurchaseOrder,
        purchaseOrderDetailStore: state.getDetailPurchaseReducer,
        token: state.client.token,
        priceQuoteUpdateStatus: state.PriceQuoteUpdate,
        createPriceQuoteStatus: state.createPriceQuote,
        mailOrderDataStatus: state.mailOrderData,
        submitPurchaseOrderStatus: state.submitPurchaseOrder,
        rejectPurchaserOrderStatus: state.rejectPurchaserOrder,
        confirmPurchaserOrderStatus: state.confirmPurchaserOrder,
        createPurchaserOrderStatus: state.createPurchaserOrder,

    }))
    const [mergedOrderIdLists, setMergedOrderIdLists] = useState([])
    const [mailDescription, setMailDescription] = useState("");
    console.log(listTransactions)
    const [detailPurchaseState, setDetailPurchaseState] = useState(purchaseOrderDataGlobal)
    const [listProductPurchaseOrder, setListProductPurchaseOrder] = useState(purchaseOrderDataGlobal.purchaseOrderProduct)
    const [supplier, setSupplier] = useState(purchaseOrderDataGlobal.supplier)
    function clickToResendMail() {

    }
    const [test, setTest] = useState(true);


    const columns = [
        {
            dataField: 'sku',
            text: 'SKU',
            editable: false,

        },
        {
            dataField: 'name',
            text: 'Product Name',
            editable: false,
        },
        {
            dataField: 'orderQuantity',
            text: 'Quantity',
            editor: {
                type: Type.TEXT,

            },
            editable: !eventPage.isShowEditListProducts,
            formatter: (cellContent, row, rowIndex) => {
                return (
                    <div>
                        {!eventPage.isShowEditListProducts ? <input className="form-control" defaultValue={row.orderQuantity} type="text" /> : row.orderQuantity}
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

            dataField: 'price',
            text: 'Unit Price',
            hidden: test,

            editable: !eventPage.isShowEditListProducts,
            formatter: (cellContent, row, rowIndex) => {
                return (
                    <div>
                        {!eventPage.isShowEditListProducts ? <input className="form-control" defaultValue={row.price} type="text" /> : row.price}
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

            hidden: test,
            formatter: (cellContent, row, rowIndex) => {

                return (
                    row.orderQuantity * row.price
                );
            },
        },
        {   //neu duoc isShowEdit true thi khong duoc delete
            dataField: 'action',
            text: 'action',
            hidden: eventPage.isShowEditListProducts,
            editable: false,
            formatter: (cellContent, row, rowIndex) => {
                return (
                    <div className="text-danger" onClick={() => clickDeleteProduct(rowIndex)}>
                        <i class="bi bi-trash"></i>




                    </div>
                );
            },
        },




    ];

    function clickCreatePurchaseOrder() {
        let data = {
            orderNumber: purchaseOrderDataGlobal.orderId
        }
        dispatch(createPurchaseOrder({ data: data, token: token }))
    }
    const ListEdit = function listEdit(props) {
        if (props.statusEdit !== undefined) {
            return (
                <div>
                    {!props.statusEdit ? <span onClick={() => cancelEditClick(props.nameEdit)} class="badge bg-secondary me-1">Discard</span> : ""}
                    {props.statusEdit ? <span onClick={() => editClick(props.nameEdit)} class="badge bg-success me-1">Edit</span> : ""}
                    {!props.statusEdit ? <span onClick={(() => saveEditClick(props.nameEdit))} class="badge bg-primary me-1">Save</span> : ""}
                </div>
            )
        }
        else {
            return ""
        }
    }
    function setListButton(status) {
        if (status === "PriceQuote" && purchaseOrderDataGlobal.hasSentMail) {

            return [




                {
                    isShow: true,
                    title: "Re-sent Supplier",
                    action: () => clickShowPreviewSendMail(),
                    style: {
                        background: "#4e9ae8"
                    },


                },

                {
                    isShow: true,
                    title: "Create Purchase Order",
                    action: () => clickCreatePurchaseOrder(),
                    style: {
                        background: "#4e9ae8"
                    },


                },
            ]
        }
        else if (status === "PriceQuote" && purchaseOrderDataGlobal.hasSentMail === false) {
            return [


                {
                    isShow: true,
                    title: "Preview Mail",
                    action: () => clickShowPreviewSendMail(),
                    style: {
                        "background-color": "#f9c421"
                    }
                },
            ]
        }
        else if (status === "Requisition") {

            return [

                {
                    isShow: true,
                    title: "Reject",
                    action: () => isShowRejectModal(),
                    style: {
                        background: "red"
                    }
                },


                {
                    isShow: true,
                    title: "Create Price Quote",
                    action: () => clickCreatePriceQuote(),
                    style: {
                        background: "#4e9ae8"
                    },


                },
            ]
        }
        else if (status === "PurchaseOrder") {

            return [

                {
                    isShow: true,
                    title: "Submit",
                    action: () => clickToSubmitPurchaseOrder(),
                    style: {
                        background: "#4e9ae8"
                    },


                }
            ]
        } else if (status === "POWaitingConfirmation") {
            return [


                {
                    isShow: true,
                    title: "Reject",
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

        return []
    }
    function isShowConfirmModal() {
        setEventPage((state) => ({
            ...state, isShowConfirm: !state.isShowConfirm,
        }))
    }
    function clickToSubmitPurchaseOrder() {
        let data = {

            purchaseOrderNumber: purchaseOrderDataGlobal.orderId

        }
        dispatch(confirmDetailPurchaseOrder({ data: data, token, token }))

    }
    function isShowRejectModal() {
        setEventPage((state) => ({
            ...state, isShowReject: !state.isShowReject,
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
    const listButton = setListButton(purchaseOrderDataGlobal.status)
    function clickToCLoseConfirm(status, pdf, note) {
        if (status === true) {
            let data = {
                purchaseOrderNumber: detailPurchaseState.orderId
            }
            if (pdf !== undefined) {
                sendMailSupplier(pdf, note, purchaseOrderDataGlobal.orderId)

            }
            dispatch(confirmPurchaseORderByManager({ data: data, token: token }))
            // goBackClick()
        }
        setEventPage((state) => ({
            ...state, isShowConfirm: !state.isShowConfirm,
        }))
    }



    useEffect(() => {
        dispatch(getDetailPurchaseOrder(location.state.orderId))
        return () => {
            dispatch({ type: GET_DETAIL_PURCHASE_ORDER_RESET })
        };
    }, [])

    useEffect(() => {

        if (priceQuoteUpdateStatus.requesting === true) {
            Swal.fire({
                title: 'Updating!',
                html: 'Watting...',
                timerProgressBar: true,
                didOpen: () => {
                    Swal.showLoading()

                },

            }).then((result) => {
                if (result.dismiss === Swal.DismissReason.timer) {
                    console.log('I was closed by the timer')
                }
            })
        }
        if (priceQuoteUpdateStatus.successful === true) {

            Swal.fire(
                'Update Success!',
                'Click to Close!',
                'success'

            )
            dispatch({ type: "EDIT_PRICE_QUOTE_RESET" })
        }
        if (priceQuoteUpdateStatus.errors === true) {
            alert("Loi")
        }


    }, [priceQuoteUpdateStatus])
    useEffect(() => {

        if (mailOrderDataStatus.requesting === true) {
            Swal.fire({
                title: 'Mail Sending!',
                html: 'Watting...',
                timerProgressBar: true,
                didOpen: () => {
                    Swal.showLoading()

                },

            }).then((result) => {
                if (result.dismiss === Swal.DismissReason.timer) {
                    console.log('I was closed by the timer')
                }
            })
        }
        if (mailOrderDataStatus.successful === true) {
            Swal.fire(
                'Send Mail Success!',
                'Click to Close!',
                'success'

            )
            dispatch({ type: SEND_MAIL_SERVICE_RESET })
        }
        if (mailOrderDataStatus.errors === true) {
            alert("Send Mail that bai")
            dispatch({ type: SEND_MAIL_SERVICE_RESET })
        }


    }, [mailOrderDataStatus])
    useEffect(() => {

        if (createPriceQuoteStatus.requesting === true) {
            Swal.fire({
                title: 'Creating!',
                html: 'Watting...',
                timerProgressBar: true,
                didOpen: () => {
                    Swal.showLoading()

                },

            }).then((result) => {
                if (result.dismiss === Swal.DismissReason.timer) {
                    console.log('I was closed by the timer')
                }
            })
        }
        if (createPriceQuoteStatus.successful === true) {
            Swal.fire(
                'Create Price Quote Success!',
                'Click to Close!',
                'success'

            )
            dispatch({ type: CREATE_PRICE_QUOTE_RESET })
        }
        if (createPriceQuoteStatus.errors === true) {
            alert("create that bai")
            dispatch({ type: CREATE_PRICE_QUOTE_RESET })
        }


    }, [createPriceQuoteStatus])
    useEffect(() => {

        if (confirmPurchaserOrderStatus.requesting === true) {
            Swal.fire({
                title: 'Confirming!',
                html: 'Watting...',
                timerProgressBar: true,
                didOpen: () => {
                    Swal.showLoading()

                },

            }).then((result) => {
                if (result.dismiss === Swal.DismissReason.timer) {
                    console.log('I was closed by the timer')
                }
            })
        }
        else if (confirmPurchaserOrderStatus.successful === true) {
            Swal.fire(
                'Confirm Success!',
                'Click to Close!',
                'success'

            )
            dispatch({ type: CONFIRM_PURCHASE_ORDER_RESET })
        }
        else if (confirmPurchaserOrderStatus.errors === true) {
            alert("Confirm That Bai")
            dispatch({ type: CONFIRM_PURCHASE_ORDER_RESET })

        }


    }, [confirmPurchaserOrderStatus])
    useEffect(() => {

        if (createPurchaserOrderStatus.requesting === true) {
            Swal.fire({
                title: 'Creating!',
                html: 'Watting...',
                timerProgressBar: true,
                didOpen: () => {
                    Swal.showLoading()

                },

            }).then((result) => {
                if (result.dismiss === Swal.DismissReason.timer) {
                    console.log('I was closed by the timer')
                }
            })
        }
        else if (createPurchaserOrderStatus.successful === true) {
            Swal.fire(
                'Create Purchase Order Success!',
                'Click to Close!',
                'success'

            )

            dispatch({ type: CREATE_PURCHASE_ORDER_RESET })
        }
        else if (createPurchaserOrderStatus.errors === true) {
            alert("Confirm That Bai")
            dispatch({ type: CREATE_PURCHASE_ORDER_RESET })

        }


    }, [createPurchaserOrderStatus])
    useEffect(() => {


        if (submitPurchaseOrderStatus.requesting === true) {
            Swal.fire({
                title: 'Submiting!',
                html: 'Watting...',
                timerProgressBar: true,
                didOpen: () => {
                    Swal.showLoading()

                },

            }).then((result) => {
                if (result.dismiss === Swal.DismissReason.timer) {
                    console.log('I was closed by the timer')
                }
            })
        }
        else if (submitPurchaseOrderStatus.successful === true) {
            Swal.fire(
                'Submit Success!',
                'Click to Close!',
                'success'

            )
            dispatch({ type: SUBMIT_PURCHASE_ORDER_RESET })
        }
        else if (submitPurchaseOrderStatus.errors === true) {
            alert("Submit That Bai")
            dispatch({ type: SUBMIT_PURCHASE_ORDER_RESET })

        }


    }, [submitPurchaseOrderStatus])
    useEffect(() => {


        if (rejectPurchaserOrderStatus.requesting === true) {
            Swal.fire({
                title: 'Rejecting!',
                html: 'Watting...',
                timerProgressBar: true,
                didOpen: () => {
                    Swal.showLoading()

                },

            }).then((result) => {
                if (result.dismiss === Swal.DismissReason.timer) {
                    console.log('I was closed by the timer')
                }
            })
        }
        else if (rejectPurchaserOrderStatus.successful === true) {
            Swal.fire(
                'Reject Success!',
                'Click to Close!',
                'success'

            )
            dispatch({ type: REJECT_PURCHASE_ORDER_CONFIRM_RESET })
        }
        else if (rejectPurchaserOrderStatus.errors === true) {
            alert("Reject That Bai")
            dispatch({ type: REJECT_PURCHASE_ORDER_CONFIRM_RESET })

        }


    }, [rejectPurchaserOrderStatus])
    useEffect(() => {
        setDetailPurchaseState({
            ...purchaseOrderDataGlobal
        })
        setListTransactions(() => [
            ...purchaseOrderDataGlobal.transaction.transactionRecord
        ])
        setMergedOrderIdLists(() => [...purchaseOrderDataGlobal.mergedOrderIdLists])
        setMailDescription(purchaseOrderDataGlobal.mailDescription)
        setSupplier(purchaseOrderDataGlobal.supplier)
        setListProductPurchaseOrder(
            purchaseOrderDataGlobal.purchaseOrderProduct.map(product => {
                return {
                    ...product
                }
            })
        )
        if (!["Requisition", "PriceQuote"].includes(purchaseOrderDataGlobal.status)) {

            setTest((state) => (false))
        }
        else {

            setTest((state) => (true))
        }
        if (!["Requisition", "Done", "PQCanceled", "Requisition"].includes(purchaseOrderDataGlobal.status)) {

            setEventPage(state => ({
                ...state, isShowEdit: true,
                isCreatePO: true,
                isShowEditInfoOrder: true,
                isShowEditListProducts: true
            }))
        }

    }, [purchaseOrderDataGlobal])
    function editClick(nameEdit) {


        // Fetch all the forms we want to apply custom Bootstrap validation styles to
        console.log("okkk")
        if (nameEdit === "listProducts") {

            setEventPage((state) => ({
                ...state,
                isShowEdit: false,
                isCreatePO: false,
                isShowEditListProducts: !state.isShowEditListProducts

            }))
        }
        else if (nameEdit === "infoOrder") {
            setEventPage((state) => ({
                ...state,
                isShowEdit: false,
                isCreatePO: false,

                isShowEditInfoOrder: !state.isShowEditInfoOrder,

            }))
        }

    }
    function cancelEditClick(nameEdit) {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {

                setListProductPurchaseOrder(
                    purchaseOrderDataGlobal.purchaseOrderProduct.map(product => {
                        return {
                            ...product
                        }
                    })
                )
                setDetailPurchaseState({
                    ...purchaseOrderDataGlobal
                })
                setMailDescription(purchaseOrderDataGlobal.mailDescription)
                setSupplier(purchaseOrderDataGlobal.supplier)
                editClick(nameEdit)
                Swal.fire(
                    'Reverted!',
                    'Your edit has been reverted.',
                    'success'
                )

            }
        })


    }

    function saveEditClick(nameEdit) {
        let data = {
            purchaseOrderNumber: purchaseOrderDataGlobal.orderId,
            supplierId: supplier.id,
            mergedRequisitionIds: [
                ...mergedRequisitionIds.filter(id => id !== purchaseOrderDataGlobal.orderId)
            ],
            deadline: "2021-07-11T05:37:29.052Z",
            mailDescription: mailDescription,
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
        dispatch(editPriceQuote({ data: data, token: token }))
        editClick(nameEdit)
        // setEventPage({
        //     isShowEdit: true,
        //     isCreatePO: true,
        //     isShowEditInfoOrder: true,
        //     isShowEditListProducts: true,


        // })
    }
    function clickShowPreviewSendMail() {
        setEventPage((state) => ({
            ...state, isPreview: !state.isPreview
        }))
    }

    function clickDeleteProduct(rowIndex) {
        setListProductPurchaseOrder((state) => (

            state.filter((_, i) => i !== rowIndex)


        ))
    }

    function mergePriceQuote(listDataPriceQuote) {

        let listPriceQuote = listDataPriceQuote.filter(priceQuote => priceQuote.isChecked)
        setMergedRequisitionIds((state) => [...state, ...listPriceQuote.map(priceQuote => priceQuote.orderId)])
        let listProductPurchaseOrderMerge = listPriceQuote.map(priceQuote => priceQuote.listProductOrder)
        let temp = [...listProductPurchaseOrder]

        //Merge phiếu
        listProductPurchaseOrderMerge.map(arrayProduct => {
            arrayProduct.map(product => {
                let count = 0

                if (temp.some(function (p, index) {
                    count = index
                    return p.productVariantId === product.productVariantId
                })) {
                    temp[count].orderQuantity = temp[count].orderQuantity + product.orderQuantity
                }
                else {
                    temp.push(product)
                }


            })
        })

        setListProductPurchaseOrder((state) =>
            [...temp]
        )

    }

    function addGroupProduct(listGroupProduct) {




        let listGroupProductIsSelected = listGroupProduct.filter(product => product.isChecked)
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

        setListProductPurchaseOrder((state) =>
            [...temp]
        )
        clickSetShowAddProductPage()

    }

    function checkProductExist(productVariantId) {
        return listProductPurchaseOrder.some(product => product.productVariantId === productVariantId)
    }
    // function productExist( arr, productVariantId){
    //     return arr.some(function(product, index){

    //         return product.productVariantId === productVariantId
    //     })
    // }

    function IgnorePurchase() {
        dispatch(rejectPurchaseOrderConfirm
            (location.state.orderId))
    }
    function confirmClick() {
        dispatch(confirmPurchaseORderByManager(location.state.orderId))
    }
    function checkValidQuantity(quantity) {
        if (quantity <= 0) {
            return false
        }
        return true
    }





    function getDataSupplier(supplier) {
        setSupplier({ ...supplier })
    }
    function clickSetEventMergePriceQuote() {
        setEventPage((state) => {
            return { ...state, isShowMergePage: !state.isShowMergePage }
        })
    }
    function clickSetShowAddProductPage() {
        setEventPage((state) => {
            return { ...state, isShowAddProductPage: !state.isShowAddProductPage }
        })
    }
    function clickToAddProduct(product) {
        console.log(product)
        if (checkProductExist(product.productVariantId)) {
            setListProductPurchaseOrder((state) => state.map(item =>
                item.productVariantId === product.productVariantId ? { ...item, orderQuantity: (item.orderQuantity + product.orderQuantity) } : item))
        }
        else {
            setListProductPurchaseOrder((state) => [...state, product])
        }

        clickSetShowAddProductPage()
    }

    function changeMailContent(contentEmail) {
        setMailDescription(contentEmail)
    }
    function sendMailSupplier(pdf, contentMail, orderId) {
        const formData = new FormData();

        formData.append('To', 'hungppse130422@fpt.edu.vn')
        formData.append('Content', contentMail)
        formData.append('Subject', 'Gui MAil')
        formData.append('PurchaseOrderId', orderId)
        formData.append('pdf', pdf)
        dispatch(sendMailService({ data: formData }))
    }
    function clickCreatePriceQuote() {
        dispatch(createPriceQuote({ data: { id: purchaseOrderDataGlobal.orderId }, token: token }))
    }
    function clostPreviewSendMail(pdf) {



        sendMailSupplier(pdf, mailDescription, purchaseOrderDataGlobal.orderId)



        setEventPage((state) => ({
            ...state, isPreview: false
        }))
    }

    function goBackClick() {
        history.go(-1)
    }
    (function () {
        'use strict'

        // Fetch all the forms we want to apply custom Bootstrap validation styles to
        var forms = document.querySelectorAll('.needs-validation')

        // Loop over them and prevent submission
        Array.prototype.slice.call(forms)
            .forEach(function (form) {
                form.addEventListener('submit', function (event) {
                    if (!form.checkValidity()) {
                        event.preventDefault()
                        event.stopPropagation()
                    }

                    form.classList.add('was-validated')
                }, false)
            })
    })()





    const listpermissionEdit = ["PriceQuote", "PurchaseOrder", "POWaitingConfirmation"]
    return (
        <div>

            <NavigationBar actionGoBack={() => goBackClick()}
                titleBar={purchaseOrderDataGlobal.orderId}
                listButton={listButton}
            />

            <div class="d-grid gap-2">
                <div className="p-3">
                    {detailPurchaseState.status !== "PriceQuote" ?
                        <div class="card">
                            <div class="row p-5">
                                <div className="col-md-4">
                                    {purchaseOrderDetailStore.successful ?
                                        <div>
                                            <div className="form-text">
                                                Create By:
                                            </div>
                                            <label className="form-check-label" >
                                                {"hung phan"}
                                            </label>

                                            <div className="form-text">
                                                Email:
                                            </div>
                                            <label className="form-check-label" >
                                                {"hunghanhpuc@gmail.comn"}
                                            </label>

                                            <div className="form-text">
                                                Phone Number:
                                            </div>
                                            <label className="form-check-label" >
                                                {"0546544986"}
                                            </label>

                                            <div className="form-text">
                                                Create date:
                                            </div>
                                            <label className="form-check-label" >
                                                {"1/2/2020"}
                                            </label>

                                            <div className="form-text">
                                                Deadline:
                                            </div>
                                            <label className="form-check-label" >
                                                {"1/2/2020"}
                                            </label> </div>
                                        : <InfoPurchaseOrderLoader />}
                                </div>
                                <div className="col-md-8" >
                                    <p data-bs-toggle="collapse" data-bs-target="#collapseHistory" >History</p>
                                    <div className="collapse show " id="collapseHistory" >
                                        <div style={{ height: "250px", overflow: "auto" }} >
                                            <table className="table">
                                                <tbody>
                                                    {purchaseOrderDetailStore.successful ?
                                                        listTransactions.map((transaction, index) => (
                                                            <tr>
                                                                <td>{transaction.name}</td>
                                                                <td>{transaction.date}</td>
                                                                <td>{transaction.applicationUser.fullname}</td>
                                                            </tr>))

                                                        : <TableLoading />}
                                                </tbody>
                                            </table>


                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div> : <div class="card">

                            <div class="card-header p-0">
                                <div class="d-flex ">
                                    <div class="me-auto p-2">Info Order:</div>
                                    <div class="p-2 pe-4 ">
                                        <ListEdit statusEdit={eventPage.isShowEditInfoOrder} nameEdit="infoOrder" />
                                    </div>
                                </div>
                            </div>
                            <div class="card-body">
                                <div className="row">
                                    <div className="col-md-4">
                                        <form id="choose-supplier-form" class="row g-3 needs-validation " novalidate>
                                            <SelectSupplier isDisabled={eventPage.isShowEditInfoOrder} supplierInfo={supplier} getDataSupplier={getDataSupplier} />
                                        </form>


                                        <div className="form-text">
                                            Email:
                                        </div>
                                        <label className="form-check-label" >
                                            {supplier.email}
                                        </label>
                                        <div className="form-text">
                                            Phone Number:
                                        </div>
                                        <label className="form-check-label" >
                                            {supplier.phoneNumber}
                                        </label>
                                        <div className="form-text">
                                            Address:
                                        </div>
                                        <label className="form-check-label" >
                                            {supplier.address}
                                        </label>
                                    </div>
                                    <div className="col-md-8" >
                                        <p data-bs-toggle="collapse" data-bs-target="#collapseHistory" >History</p>
                                        <div className="collapse show " id="collapseHistory" >
                                            <div style={{ height: "250px", overflow: "auto" }} >
                                                <table className="table">
                                                    <tbody> {listTransactions.map((transaction, index) => (<tr>
                                                        <td>{transaction.name}</td>
                                                        <td>{transaction.date}</td>
                                                        <td>{transaction.applicationUser.fullname}</td>
                                                    </tr>))}
                                                    </tbody>  </table>


                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="form-text dropdown-toggle text-success" data-bs-toggle="collapse" data-bs-target="#collapseMoreCotent">
                                    Content Mail:
                                </div>
                                <div class="collapse show" id="collapseMoreCotent">
                                    <div className="card p-0">
                                        <div className="card-header">
                                            Content Mail:
                                        </div>
                                        <div class="card-body p-0">
                                            <TextEditor setDefault={purchaseOrderDataGlobal.mailDescription === mailDescription} contentEmail={mailDescription} changeMailContent={changeMailContent} />

                                        </div>
                                    </div>
                                </div>


                                <div className="form-text dropdown-toggle text-success" data-bs-toggle="collapse" data-bs-target="#mergedOrderIdLists" >
                                    Merged Order List
                                </div>
                                <div className="collapse show " id="mergedOrderIdLists" >
                                    <div style={{ maxHeight: "250px", overflow: "auto" }} >
                                        <table className="table">
                                            <tbody> {mergedOrderIdLists.map((order, index) => (<tr>
                                                <td>{order.purchaseOrderId}</td>
                                                <td>{order.createdBy}</td>
                                                <td>{order.createdDate}</td>

                                            </tr>))}
                                            </tbody>  </table>


                                    </div>
                                </div>

                            </div>

                        </div>}

                    {purchaseOrderDataGlobal.status === "POCanceled" ? <div class="card text-white alert-danger mb-3" >
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

                </div>
                {/* <p>Supplier <SeachSupplier supplierInfo={supplier} getDataSupplier={getDataSupplier} /> </p> */}

                <div className="p-3">
                    <div className="card">
                        <div class="card-header p-0">
                            <div class="d-flex ">
                                <div class="me-auto p-2">Info Order:</div>
                                <div class="p-2 pe-4 ">
                                    {listpermissionEdit.includes(detailPurchaseState.status) ? <ListEdit statusEdit={eventPage.isShowEditListProducts} nameEdit="listProducts" /> : ""}

                                </div>
                            </div>
                        </div>
                        <div class="card-body">



                            <BootstrapTable
                                keyField='productVariantId'
                                data={listProductPurchaseOrder}
                                columns={columns}
                                striped
                                hover
                                condensed
                                noDataIndication={() => <TableLoading />}
                                // rowEvents={rowEvents}

                                cellEdit={cellEditFactory({
                                    mode: "click",
                                    blurToSave: true,
                                    afterSaveCell: (oldValue, newValue, row, column) => { row.totalAmount = row.orderQuantity * row.price }
                                })}

                                headerClasses="table-header-receipt"
                            />



                            {eventPage.isShowEditListProducts === false && listpermissionEdit.includes(detailPurchaseState.status) ?
                                <div class="btn-toolbar mb-3" role="toolbar" aria-label="Toolbar with button groups">
                                    <div class="btn-group me-2" role="group" aria-label="First group">
                                        <button type="button" class="btn btn-outline-primary" onClick={clickSetShowAddProductPage}>Add Product</button>

                                    </div>
                                    {detailPurchaseState.status === "PriceQuote" ? <div class="btn-group me-2" role="group" aria-label="First group">
                                        <button type="button" class="btn btn-outline-success" onClick={clickSetEventMergePriceQuote} >Merge Requisition</button>

                                    </div> : ""}

                                </div> : ""}
                        </div>
                    </div>
                </div>
            </div>

            <div className="content-container-receipt">

                <FormAddProductModal
                    clickSetShowAddProductPage={clickSetShowAddProductPage}
                    isShowAddProductPage={eventPage.isShowAddProductPage}
                    clickToAddProduct={clickToAddProduct}
                    addGroupProduct={addGroupProduct}
                    checkProductExist={checkProductExist}

                />


                <MergePriceQuote
                    mergedRequisitionIds={mergedRequisitionIds}
                    clickSetEventMergePriceQuote={clickSetEventMergePriceQuote}
                    isShowMergePage={eventPage.isShowMergePage}
                    mergePriceQuote={mergePriceQuote}
                />

                <RejectReceiptModal clickToCLoseReject={clickToCLoseReject} isReject={eventPage.isShowReject} />
                <ConfirmDateModal

                    listProduct={listProductPurchaseOrder}
                    infoPriceQuote={detailPurchaseState}
                    clickToCLoseConfirm={clickToCLoseConfirm} isConfirm={eventPage.isShowConfirm} />
                <PreviewSendMail
                    statusSendMail={eventPage.isPreview}
                    contentEmail={mailDescription}
                    listProduct={listProductPurchaseOrder}
                    infoPriceQuote={purchaseOrderDataGlobal}
                    supplierInfo={supplier}
                    closePreview={clickShowPreviewSendMail}
                    isResend={eventPage.isResend}
                    clostPreviewSendMail={clostPreviewSendMail}
                />

            </div>
        </div>
    )
}

function SelectSupplier(props) {
    const SEARCH_URI = 'https://imspublicapi.herokuapp.com/api/suppliers/search';
    const [listSupplier, setListSupplier] = useState([])
    const [selected, setSelected] = useState({})

    useEffect(() => {



        if (props.supplierInfo.id !== "") {

            setSelected({
                ...props.supplierInfo
            })
        }
    }, [props.supplierInfo])

    useEffect(() => {



        fetch(`${SEARCH_URI}`)
            .then((resp) => resp.json())
            .then((json) => {

                setListSupplier(json.paging.resultList.map((i) => {
                    return {

                        id: i.id,
                        address: i.address,
                        supplierName: i.supplierName,
                        phoneNumber: i.phoneNumber,
                        email: i.email,
                    }
                }))


            })


    }, [])
    function onChangeValue(event) {

        props.getDataSupplier(JSON.parse(event.target.value))
    }
    return (






        <div class="form-floating">

            <select disabled={props.isDisabled} onChange={onChangeValue} value={JSON.stringify(selected)} class="form-select" id="validationCustom04" required>
                <option selected disabled value={JSON.stringify({})}>Choose...</option>
                {listSupplier.map(supplier => <option value={JSON.stringify(supplier)} >{supplier.supplierName}</option>)}
            </select>
            <label for="floatingSelect">Select Supplier</label>
            <div class="invalid-feedback">
                Please select a valid state.
            </div>
        </div>
    )
}