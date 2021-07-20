import React, { useEffect, useState } from 'react'
import { connect, useDispatch, useSelector } from 'react-redux'
import { useHistory, useLocation, withRouter } from 'react-router-dom'
import { getDetailPurchaseOrder, sendMailService, createPurchaseOrder, rejectPurchaseOrderConfirm, createPriceQuote, confirmDetailPurchaseOrder, confirmPurchaseORderByManager, saveProductsPurchaseOrder, editPriceQuote } from './action'
import NavigationBar from '../../navigation-bar-component/NavigationBar';
// import sendMailPriceQuote from '../create-price-quote/action';
import InfoDetailReceipt from '../../info-detail-receipt/InfoDetailReceipt';
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

export default function PurchaseOrderConfirm() {
    const dispatch = useDispatch()
    const history = useHistory()
    const location = useLocation()
    const [eventPage, setEventPage] = useState({
        isConform: false,
        isShowMergePage: false,
        isShowAddProductPage: false,
        isShowEdit: true,
        isCreatePO: true,
        isShowCancel: false,
        isShowSave: false,
        isPreview: false,
        isResend: true
    })


    const [mergedRequisitionIds, setMergedRequisitionIds] = useState([location.state.orderId])
    const { purchaseOrderDataGlobal, token } = useSelector(state => ({
        purchaseOrderDataGlobal: state.getDetailPurchaseReducer.detailPurchaseOrder,
        token: state.client.token,
    }))
    const [mailDescription, setMailDescription] = useState("");

    const [detailPurchaseState, setDetailPurchaseState] = useState(purchaseOrderDataGlobal)

    const [listProductPurchaseOrder, setListProductPurchaseOrder] = useState(purchaseOrderDataGlobal.purchaseOrderProduct)
    const [supplier, setSupplier] = useState(purchaseOrderDataGlobal.supplier)

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
    function clickToResendMail() {

    }
    function onChangeValueProduct(event) {
        console.log(event)
        // setListProductPurchaseOrder(
        //     listProductPurchaseOrder.map((element, index) =>
        //         index ===  i ?
        //             {
        //                 ...element, [event.target.name]: event.target.value,

        //             }
        //             : element)
        // )

    }
    function clickCreatePurchaseOrder() {
        let data = {
            orderNumber: purchaseOrderDataGlobal.orderId
        }
        dispatch(createPurchaseOrder({ data: data, token: token }))
    }
    function setListButton(status) {
        if (status === "PQCreated") {
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
                    isShow: eventPage.isResend,
                    title: "Re-sent Supplier",
                    action: () => clickShowPreviewSendMail(),
                    style: {
                        background: "#4e9ae8"
                    },


                },

                {
                    isShow: eventPage.isCreatePO,
                    title: "Create Purchase Order",
                    action: () => clickCreatePurchaseOrder(),
                    style: {
                        background: "#4e9ae8"
                    },


                },
            ]
        }
        else {
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
                    isShow: eventPage.isCreatePO,
                    title: "Create Price Quote",
                    action: () => clickShowPreviewSendMail(),
                    style: {
                        background: "#4e9ae8"
                    },


                },
            ]
        }
    }
    const listButton = setListButton(location.state.status)




    useEffect(() => {
        dispatch(getDetailPurchaseOrder(location.state.orderId))
    }, [])


    useEffect(() => {
        setDetailPurchaseState({
            ...purchaseOrderDataGlobal
        })
        setMailDescription(purchaseOrderDataGlobal.mailDescription)
        setSupplier(purchaseOrderDataGlobal.supplier)
        setListProductPurchaseOrder(
            purchaseOrderDataGlobal.purchaseOrderProduct.map(product => {
                return {
                    ...product
                }
            })
        )
    }, [purchaseOrderDataGlobal])
    // console.log(detailPurchaseState)

    function editClick() {
        'use strict'

        // Fetch all the forms we want to apply custom Bootstrap validation styles to


        setEventPage((state) => ({
            ...state,
            isShowEdit: false,
            isCreatePO: false,
            isShowCancel: true,
            isShowSave: true,

        }))
    }
    function cancelEditClick() {

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
        setSupplier({
            address: "",
            description: "",
            email: "",
            id: "",
            phoneNumber: "",
            salePersonName: "",
            supplierName: "",
            transactionId: ""
        })
        setEventPage({
            isShowEdit: true,
            isCreatePO: true,
            isShowCancel: false,
            isShowSave: false,

        })
    }
    function saveEditClick() {
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

        setEventPage({
            isShowEdit: true,
            isCreatePO: true,
            isShowCancel: false,
            isShowSave: false,

        })
    }
    function clickShowPreviewSendMail() {
        setEventPage((state) => ({
            ...state, isPreview: true
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

        let listProductVariant = listGroupProduct.map(product => product.isChecked ? product.listProductVariant : [])
        // let listProductPurchaseOrderMerge = listGroupProductIsSelected.map(priceQuote => priceQuote.listProductOrder)
        let temp = [...listProductPurchaseOrder]
        //Merge phiếu
        listProductVariant.map(arrayProduct => {
            arrayProduct.map(product => {
                let count = 0

                if (temp.some(function (p, index) {
                    count = index
                    return p.productVariantId === product.productVariantId
                })) {
                    // temp[count].orderQuantity = temp[count].orderQuantity + product.orderQuantity
                }
                else {
                    temp.push(product)
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
        // console.log(product)
        setListProductPurchaseOrder((state) => [...state, product])
        clickSetShowAddProductPage()
    }

    function changeMailContent(contentEmail) {
        setMailDescription(contentEmail)
    }
    function sendMailSupplier(pdf) {
        const formData = new FormData();

        formData.append('To', 'hungppse130422@fpt.edu.vn')
        formData.append('Content', mailDescription)
        formData.append('Subject', 'Gui MAil')
        formData.append('pdf', pdf)
        dispatch(sendMailService({ data: formData }))
    }
    function clostPreviewSendMail(pdf) {
        if (pdf !== undefined) {
            sendMailSupplier(pdf)
            dispatch(createPriceQuote({ data: purchaseOrderDataGlobal.orderId, token: token }))
            goBackClick()
        }
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
    return (
        <div>

            <NavigationBar actionGoBack={() => goBackClick()}
                titleBar={purchaseOrderDataGlobal.orderId}
                listButton={listButton}
            />



            <div class="card">
                <div class="card-header">
                    Featured
                </div>
                <div class="card-body">
                    <form id="choose-supplier-form" class="row g-3 needs-validation " novalidate>
                        <SelectSupplier supplierInfo={supplier} getDataSupplier={getDataSupplier} />
                    </form>
                    
                    <form class="form-floating">
                        <div class="form-control" id="floatingInputValue"  >{supplier.email}</div>
                        <label for="floatingInputValue">Email</label>
                    </form>
                    <form class="form-floating">
                    <div class="form-control" id="floatingInputValue"  >{supplier.phoneNumber}</div>
                        <label for="floatingInputValue">Phone No:</label>
                    </form>
                    <form class="form-floating">
                    <div class="form-control" id="floatingInputValue"  >{supplier.address}</div>
                        <label for="floatingInputValue">Address:</label>
                    </form>

                    {/* <p>Supplier <SeachSupplier supplierInfo={supplier} getDataSupplier={getDataSupplier} /> </p> */}

                  
                </div>
            </div>

            <div className="content-container-receipt">
                {/* <div className="list-receipt-table-container">

                    <p>Supplier <SeachSupplier supplierInfo={supplier} getDataSupplier={getDataSupplier} /> </p>
                    <p> Email: {supplier.email} </p>
                    <p>  Phone No: {supplier.phoneNumber}</p>
                    <p>  Address: {supplier.address}</p>

                </div> */}
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
                            cellEdit={cellEditFactory({
                                mode: "click",
                                blurToSave: true,
                                afterSaveCell: (oldValue, newValue, row, column) => { onChangeValueProduct(row) }
                            })}

                            headerClasses="table-header-receipt"
                        />
                    </div>


                </div>
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
                {console.log(purchaseOrderDataGlobal.mailDescription === mailDescription)}
                {<TextEditor setDefault={purchaseOrderDataGlobal.mailDescription === mailDescription} contentEmail={mailDescription} changeMailContent={changeMailContent} />}


                <PreviewSendMail clostPreviewSendMail={() => this.clostPreviewSendMail()}
                    statusSendMail={eventPage.isPreview}
                    contentEmail={mailDescription}
                    listProduct={listProductPurchaseOrder}
                    infoPriceQuote={purchaseOrderDataGlobal}
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
    console.log(selected)
    return (






        <div class="col-md-3 form-floating">
            
            <select onChange={onChangeValue} value={JSON.stringify(selected)} class="form-select" id="validationCustom04" required>
                <option selected disabled value="">Choose...</option>
                {listSupplier.map(supplier => <option value={JSON.stringify(supplier)} >{supplier.supplierName}</option>)}
            </select>
            <label for="floatingSelect">Select Supplier</label>
            <div class="invalid-feedback">
                Please select a valid state.
            </div>
        </div>
    )
}