import React from 'react'
import TablePurchase from '../purchase-quote-order/Table-Purchase-Order'
import './CreatePurchaseOrder.css';
import TextEditor from '../../text-editor-compoent/text-editor-compoent';
import {getDetailPurchaseOrder, confirmDetailPurchaseOrder} from './action'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import NavigationBar from '../../navigation-bar-component/NavigationBar';
import InfoDetailReceipt from '../../info-detail-receipt/InfoDetailReceipt';
import ListProductsTable from '../../list-products-table/ListProductsTable';
import ConfirmDateModal from './ConfirmDateModal';
class CreatePurchaseOrder extends React.Component {
    constructor(props) {
        super(props)
        this.props.getDetailPurchaseOrder(this.props.location.state.orderID)
        this.state={
            isConfirm: false,
            showEdit: true,
            showConfirm: true,
            showCancel: false,
            showSave: false,

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
    cancelEditClick(){
        this.setState({
            showEdit:!this.state.showEdit,
            showConfirm:!this.state.showConfirm,
            showCancel:!this.state.showCancel,
            showSave:!this.state.showSave,
        })
    }
    saveEditClick(){
        this.setState({
            showEdit:!this.state.showEdit,
            showConfirm:!this.state.showConfirm,
            showCancel:!this.state.showCancel,
            showSave:!this.state.showSave,
        })
    }
    editClick(){
        this.setState({
            showEdit:!this.state.showEdit,
            showConfirm:!this.state.showConfirm,
            showCancel:!this.state.showCancel,
            showSave:!this.state.showSave,
        })
    }
    confirmClick() {
        
        this.setState({
            isConfirm:!this.state.isConfirm
        })
    }
    sendConfirmClick() {
            this.props.confirmDetailPurchaseOrder("bac")
        
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
            

            {
                isShow: this.state.showEdit,
                title: "Edit",
                action: () => this.editClick(),
                style: {
                    "background-color": "#f9c421"
                }
            },
            {
                isShow:this.state.showCancel,
                title: "Cancel",
                action: () => this.cancelEditClick(),
                style: {
                    background: "red"
                }
            },
            {
                isShow:this.state.showSave,
                title: "Save",
                action: () => this.saveEditClick(),
                style: {
                    background: "#4ca962"
                }
            },
            {
                isShow: this.state.showConfirm,
                title: "Confirm for manager",
                action: () => this.confirmClick(),
                style: {
                    background: "#4e9ae8"
                }
            }
        ]

        return (
            <div>
               
                <NavigationBar actionGoBack={() => this.goBackClick()}
                    titleBar="hunghanhphuc"
                    listButton={listButton}
                />
                <InfoDetailReceipt
                    createdBy={detailPurchaseOrder.transaction.createdBy}
                    supplier={detailPurchaseOrder.supplier }
                    date={
                        {
                            createDate: "10/20/2016",
                            deadline: "20/28/200",
                           
                        }
                    }
                />
           
             
                
                <ListProductsTable listColumn={["Product No", "Product Name", "Unit", "Quantity", "Unit Price", "Ammount"]} listData={detailPurchaseOrder.purchaseOrderProduct} />
                {/* <div className="mail-detail collapse show" data-bs-target="#TextEditor1"
                id="TextEditor1" data-bs-toggle="collapse"><p>Mail detail</p></div>
                
             <TextEditor changeMailContent={(event) =>changeMailContent(event)} mailDescription={""} />
            */}

           
                <ConfirmDateModal confirmClick={() => this.sendConfirmClick()} cancelConfirmClick={() =>this.cancelClick()} isConfirm={this.state.isConfirm}/>
            </div>
        )
    }
}

const mapStateToProps = state => ({

    getDetailPurchaseReducer: state.getDetailPurchaseReducer
})
const connected = connect(mapStateToProps, { getDetailPurchaseOrder, confirmDetailPurchaseOrder })(CreatePurchaseOrder)
export default withRouter(connected)