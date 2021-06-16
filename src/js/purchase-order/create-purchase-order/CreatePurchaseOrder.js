import React from 'react'
import TablePurchase from '../purchase-quote-order/Table-Purchase-Order'
import './CreatePurchaseOrder.css';
import TextEditor from '../../text-editor-compoent/text-editor-compoent';
import { getDetailPurchaseOrder, confirmDetailPurchaseOrder, confirmPurchaseORderByManager, saveProductsPurchaseOrder } from './action'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import NavigationBar from '../../navigation-bar-component/NavigationBar';
import InfoDetailReceipt from '../../info-detail-receipt/InfoDetailReceipt';
import ListProductsTable from '../../list-products-table/ListProductsTable';
import ConfirmDateModal from './ConfirmDateModal';
import PreviewSendMail from './preview-quote-request';
import sendMailPriceQuote from '../create-price-quote/action';

class CreatePurchaseOrder extends React.Component {
    constructor(props) {
        super(props)
        this.props.getDetailPurchaseOrder(this.props.location.state.orderID)
        let defaultState = {
            isPreview: false,
            editorState: {},
            orderID: this.props.location.state.orderID,
            status: this.props.location.state.status,

            purchaseOrderProductDraftData: null,
            purchaseOrderProduct:[]
        }
        let secondState = this.getStateShowButton(this.props.location.state.status)


        this.state = {
            ...defaultState,
            ...secondState,

        }
        this.inputChangeProduct = this.inputChangeProduct.bind(this)

    }
    UNSAFE_componentWillReceiveProps() {
        this.setState({
            purchaseOrderProduct: this.props.getDetailPurchaseReducer.detailPurchaseOrder.purchaseOrderProduct

        })
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
    saveEditClick() {
       const dataUpdate  = {
        purchaseOrderNumber : this.state.orderID,
            supplierId : this.props.getDetailPurchaseReducer.detailPurchaseOrder.supplier.id,
            orderItemInfos:
                this.state.purchaseOrderProductDraftData.map(product =>{
                    return{ productVariantId :product.productVariantId,
                    orderQuantity :product.orderQuantity,
                    unit: product.unit,
                    price : product.price ,
                    discountAmount : product.discountAmount,
                    totalAmount : product.totalAmount,
                }
                })
            
        }
        
        this.props.saveProductsPurchaseOrder(dataUpdate)
        if (this.state.status === "PQCreated") {
            this.setState({
                purchaseOrderProduct: this.state.purchaseOrderProductDraftData,
                purchaseOrderProductDraftData: null,
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
    editClick() {
        

        if (this.state.status === "PQCreated") {
            this.setState({
                purchaseOrderProductDraftData: this.props.getDetailPurchaseReducer.detailPurchaseOrder.purchaseOrderProduct,
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
        console.log("000000")
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
    inputChangeProduct(index, event){
        
        let tempt = [...this.state.purchaseOrderProductDraftData]
        tempt[index][event.target.name] = event.target.value
        this.setState({
            purchaseOrderProductDraftData: tempt
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
                action: () => this.saveEditClick(),
                style: {
                    background: "#4ca962"
                }
            } : null,
            this.checkStatusButton("CONFIRM_TO_MANAGER") ? {
                isShow: this.state.isConfirmToManager,
                title: "Confirm for manager",
                action: () => this.confirmClick(),
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



                <ListProductsTable 
                inputChangeProduct={this.inputChangeProduct}
                draftData={this.state.purchaseOrderProductDraftData}
                
                listColumn={["Product No", "Product Name", "Unit", "Quantity", "Unit Price", "Ammount"]} 
                listData={this.state.purchaseOrderProduct} />
                {this.state.status == "PQCreated" ? <TextEditor getEditorState={(event) => this.getEditorState(event)} /> : ""}
                {/* <div className="mail-detail collapse show" data-bs-target="#TextEditor1"
                id="TextEditor1" data-bs-toggle="collapse"><p>Mail detail</p></div>
                
             <TextEditor changeMailContent={(event) =>changeMailContent(event)} mailDescription={""} />
            */}


                <ConfirmDateModal confirmClick={() => this.sendConfirmClick()} cancelConfirmClick={() => this.cancelClick()} isConfirm={this.state.isConfirm} />
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

    getDetailPurchaseReducer: state.getDetailPurchaseReducer
})
const connected = connect(mapStateToProps, {saveProductsPurchaseOrder, getDetailPurchaseOrder, confirmDetailPurchaseOrder,sendMailPriceQuote, confirmPurchaseORderByManager })(CreatePurchaseOrder)
export default withRouter(connected)