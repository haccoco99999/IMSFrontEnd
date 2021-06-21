import React from 'react'
import TablePurchase from '../purchase-quote-order/Table-Purchase-Order'
import './CreatePurchaseOrder.css';
import TextEditor from '../../text-editor-compoent/text-editor-compoent';
import { getDetailPurchaseOrder, setDefailtProductPurchaseOrder, confirmDetailPurchaseOrder, confirmPurchaseORderByManager, saveProductsPurchaseOrder, getProductPurchaseOrder } from './action'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import NavigationBar from '../../navigation-bar-component/NavigationBar';
import InfoDetailReceipt from '../../info-detail-receipt/InfoDetailReceipt';
import ListProductsTable from '../../list-products-table/ListProductsTable';
import ConfirmDateModal from './ConfirmDateModal';
import PreviewSendMail from './preview-quote-request';
import sendMailPriceQuote from '../create-price-quote/action';
import PurchaseQuoteOrder from '../purchase-quote-order/PurchaseQuoteOrder';
import ConfirmationPopup from './ConfirmationPopup';
import { productPurchaseOrderReducer } from './reducer';
import SearchComponent from '../../search-component/SearchComponent';
class CreatePurchaseOrder extends React.Component {
    constructor(props) {
        super(props)
        this.props.getDetailPurchaseOrder(this.props.location.state.orderID)
        let defaultState = {
            isCancelTask: true,
            isPreview: false,
            editorState: {},
            orderID: this.props.location.state.orderID,
            status: this.props.location.state.status,
            isSave: false,

            purchaseOrderProduct: null,

            listColumn: [

                {
                    name: "Product Name",

                },
                {
                    unit: "Unit",
                    input: true,
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


        }
        let secondState = this.getStateShowButton(this.props.location.state.status)


        this.state = {
            ...defaultState,
            ...secondState,

        }
        this.clickToAddProduct = this.clickToAddProduct.bind(this)

    }
    componentWillReceiveProps(nextProps) {
        const purchaseOrderProduct = this.props.getDetailPurchaseReducer

        if (nextProps.getDetailPurchaseReducer != purchaseOrderProduct)

            this.setState({

                purchaseOrderProduct: nextProps.getDetailPurchaseReducer.detailPurchaseOrder.purchaseOrderProduct

            })
        if (nextProps.productPurchaseOrderReducer.successful) {
            this.setState({
                purchaseOrderProduct: [...this.state.purchaseOrderProduct, nextProps.productPurchaseOrderReducer.product]
            })
            this.props.setDefailtProductPurchaseOrder()

        }
    }

    getStateShowButton(status) {
        if (status === "PQCreated") {
            return {
                isShowEdit: true,
                isShowCancel: false,
                isShowSave: false,
                isShowPreview: true,

            }
        }
        else if (status === "PQSent") {
            return {
                isShowEdit: true,
                isShowCancel: false,
                isShowSave: false,
                isConfirmToManager: true,

            }
        }
        else if (status === "POCreated") {
            return {

                isShowCancel: true,
                isConfirmByManager: true,
            }
        }
        else if (status === "POConfirm") {
            return {
                isCreateGoodReceipt: true

            }
        }
    }

    checkStatusButton(words) {

        var arrayButton = this.checkStatusPurchaseOrder()

        return arrayButton.includes(words)

    }

    checkStatusPurchaseOrder() {
        if (this.state.status === "PQCreated") {
            return ["SAVE", "EDIT", "CANCEL", "PREVIEW_SEND_MAIL"]
        }
        else if (this.state.status === "PQSent") {
            return ["SAVE", "EDIT", "CANCEL", "CONFIRM_TO_MANAGER"]
        }
        else if (this.state.status === "POCreated") {
            return ["CANCEL", "CONFIRM_BY_MANAGER"]
        }
        else if (this.state.status === "POConfirm") {
            return ["CREATE_GOOD_RECEIPT"]
        }
    }

    cancelEditClick() {
        if (this.state.status === "PQCreated") {
            this.setState({

                purchaseOrderProduct: this.props.getDetailPurchaseReducer.detailPurchaseOrder.purchaseOrderProduct,

                isShowEdit: !this.state.isShowEdit,
                isShowPreview: !this.state.isShowPreview,
                isShowCancel: !this.state.isShowCancel,
                isShowSave: !this.state.isShowSave,
            })
        }
        else if (this.state.status === "PQSent") {
            this.setState({

                purchaseOrderProduct: this.props.getDetailPurchaseReducer.detailPurchaseOrder.purchaseOrderProduct,
                isShowEdit: !this.state.isShowEdit,
                isConfirmToManager: !this.state.isConfirmToManager,
                isShowCancel: !this.state.isShowCancel,
                isShowSave: !this.state.isShowSave,
            })
        }

    }
    //sự kiện thấy đổi state khi click vào Save Button

    saveEditClick(listProducts) {
        const dataUpdate = {
            purchaseOrderNumber: this.state.orderID,
            supplierId: this.props.getDetailPurchaseReducer.detailPurchaseOrder.supplier.id,
            orderItemInfos:
                listProducts.map(product => {
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

        this.props.saveProductsPurchaseOrder(dataUpdate)



        if (this.state.status === "PQCreated") {
            this.setState({

                isSave: !this.state.isSave,
                isShowEdit: !this.state.isShowEdit,
                isShowPreview: !this.state.isShowPreview,
                isShowCancel: !this.state.isShowCancel,
                isShowSave: !this.state.isShowSave,
            })
        }
        else if (this.state.status === "PQSent") {
            this.setState({

                isSave: !this.state.isSave,
                isShowEdit: !this.state.isShowEdit,
                isConfirmToManager: !this.state.isConfirmToManager,
                isShowCancel: !this.state.isShowCancel,
                isShowSave: !this.state.isShowSave,
            })
        }

    }
    editClick() {


        if (this.state.status === "PQCreated") {
            this.setState({

                isShowEdit: !this.state.isShowEdit,
                isShowPreview: !this.state.isShowPreview,
                isShowCancel: !this.state.isShowCancel,
                isShowSave: !this.state.isShowSave,
            })
        }
        else if (this.state.status === "PQSent") {
            this.setState({
                isShowEdit: !this.state.isShowEdit,
                isConfirmToManager: !this.state.isConfirmToManager,
                isShowCancel: !this.state.isShowCancel,
                isShowSave: !this.state.isShowSave,
            })
        }



    }
    goBackClick() {
        this.props.history.go(-1)
    }
    cancelClick() {
        this.setState({
            isConfirm: !this.state.isConfirm

        })
    }

    cancelClickPreview() {
        this.setState({
            isPreview: !this.state.isPreview
        })
    }
    clickPreview() {
        this.setState({
            isPreview: !this.state.isPreview
        })
    }

    confirmClickByManager() {
        this.setState({
            isConfirm: !this.state.isConfirm
        })
    }
    confirmClick() {
        this.props.confirmPurchaseORderByManager(this.state.orderID)
    }
    sendConfirmClick() {
        this.props.confirmDetailPurchaseOrder(this.state.orderID)

    }
    sendMailClick() {

        const formData = new FormData();
        formData.append('OrderNumber', this.state.orderID)
        formData.append('To', 'hungppse130422@fpt.edu.vn')
        formData.append('Content', "<p>Hello<p>")
        formData.append('Subject', 'Gui MAil')

        this.props.sendMailPriceQuote({ priceQuote: formData })



    }
    getEditorState(data) {
        this.setState({
            editorState: data
        })
    }
    onChangeValueProduct = (event) => {
        console.log(event.target.value)
        this.setState({
            purchaseOrderProduct: this.state.purchaseOrderProduct.map((element, index) => index == event.target.id ? { ...element, [event.target.name]: event.target.value } : element)
        })

    }

    addProductPurchaseOrder() {
        this.props.getProductPurchaseOrder("MO569812R")
    }
    clickToAddProduct(productRaw) {
       
       let product = {
            id: productRaw.productId,
            orderId: "",
            productVariantId: productRaw.id,
            orderQuantity: 0,
            unit: productRaw.unit,
            price: 0,
            discountAmount: 0,
            totalAmount: 0,
            name: productRaw.name,
        }
        console.log(product)
        this.setState({
            purchaseOrderProduct: [...this.state.purchaseOrderProduct, product]
        })
    }


    render() {

        const {
            getDetailPurchaseReducer: {
                requesting,
                successful,
                messages,
                errors,
                detailPurchaseOrder,
            }
        } = this.props

        const listButton = [


            this.checkStatusButton("EDIT") ? {
                isShow: this.state.isShowEdit,
                title: "Edit",
                action: () => this.editClick(),
                style: {
                    "background-color": "#f9c421"
                }
            } : null,
            this.checkStatusButton("CANCEL") ? {
                isShow: this.state.isShowCancel,
                title: "Cancel",
                action: () => this.cancelEditClick(),
                style: {
                    background: "red"
                }
            } : null,
            this.checkStatusButton("SAVE") ? {
                isShow: this.state.isShowSave,
                title: "Save",
                action: () => this.saveEditClick(this.state.purchaseOrderProduct),
                style: {
                    background: "#4ca962"
                }
            } : null,
            this.checkStatusButton("CONFIRM_TO_MANAGER") ? {
                isShow: this.state.isConfirmToManager,
                title: "Confirm for manager",
                action: () => this.sendConfirmClick(),
                style: {
                    background: "#4e9ae8"
                }
            } : null,
            this.checkStatusButton("CONFIRM_BY_MANAGER") ? {
                isShow: this.state.isConfirmByManager,
                title: "Confirm By manager",
                action: () => this.confirmClickByManager(),
                style: {
                    background: "#4e9ae8"
                },


            } : null,
            this.checkStatusButton("PREVIEW_SEND_MAIL") ? {
                isShow: this.state.isShowPreview,
                title: "Preview Mail To Send",
                action: () => this.clickPreview(),
                style: {
                    background: "#4e9ae8"
                },


            } : null,
            this.checkStatusButton("CREATE_GOOD_RECEIPT") ? {
                isShow: this.state.isCreateGoodReceipt,
                title: "Preview Mail To Send",
                action: () => this.clickPreview(),
                style: {
                    background: "#4e9ae8"
                },


            } : null
        ]

        return (
            <div>

                <NavigationBar actionGoBack={() => this.goBackClick()}
                    titleBar="hunghanhphuc"
                    listButton={listButton}
                />
                <InfoDetailReceipt
                    createdBy={detailPurchaseOrder.transaction.createdBy}
                    supplier={detailPurchaseOrder.supplier}
                    date={
                        {
                            createDate: "10/20/2016",
                            deadline: "20/28/200",

                        }
                    }
                />

                    <SearchComponent    clickToAddProduct={this.clickToAddProduct}/>
                {console.log(this.state.purchaseOrderProduct)}
                <ListProductsTable
                    clickToAddProduct={this.clickToAddProduct}
                    onChangeValueProduct={this.onChangeValueProduct}
                    disabled={this.state.isShowEdit}
                    listColumn={this.state.listColumn}
                    listData={this.state.purchaseOrderProduct} />



                {/* <ConfirmationPopup/> */}

                {/* <input  list="citynames"/>
                <datalist id="citynames">
                   <div>Hello</div>
                    
                </datalist>
                <button onClick={() => this.addProductPurchaseOrder()} >Add Product</button> */}

                {this.state.status == "PQCreated" ? <TextEditor getEditorState={(event) => this.getEditorState(event)} /> : ""}
                {/* <div className="mail-detail collapse show" data-bs-target="#TextEditor1"
                id="TextEditor1" data-bs-toggle="collapse"><p>Mail detail</p></div>
                
             <TextEditor changeMailContent={(event) =>changeMailContent(event)} mailDescription={""} />
            */}


                <ConfirmDateModal confirmClick={() => this.confirmClick()} cancelConfirmClick={() => this.cancelClick()} isConfirm={this.state.isConfirm} />
                <PreviewSendMail cancelClickPreview={() => this.cancelClickPreview()}
                    statusSendMail={this.state.isPreview}
                    editorState={this.state.editorState}
                    sendMailClick={() => this.sendMailClick()}
                />
            </div>
        )
    }
}

const mapStateToProps = state => ({

    getDetailPurchaseReducer: state.getDetailPurchaseReducer,
    productPurchaseOrderReducer: state.productPurchaseOrderReducer
})
const connected = connect(mapStateToProps, { setDefailtProductPurchaseOrder, getProductPurchaseOrder, saveProductsPurchaseOrder, getDetailPurchaseOrder, confirmDetailPurchaseOrder, sendMailPriceQuote, confirmPurchaseORderByManager })(CreatePurchaseOrder)
export default withRouter(connected)