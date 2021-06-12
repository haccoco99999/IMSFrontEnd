import React from 'react'
import TablePurchase from '../purchase-quote-order/Table-Purchase-Order'
import './CreatePurchaseOrder.css';
import TextEditor from '../../text-editor-compoent/text-editor-compoent';
import getDetailPurchaseOrder from './action'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
class CreatePurchaseOrder extends React.Component {
    constructor(props) {
        super(props)
        this.props.getDetailPurchaseOrder(this.props.location.state.orderID)
    }
    render() {
        const {
            getDetailPurchaseReducer:{
                requesting,
                successful,
                messages,
                errors,
                detailPurchaseOrder,
            } 
        } = this.props
        return (
            <div>
                <div className="name-oder" >
                    <button type="button" name="" id="" class="btn btn-primary">Create Price quote request</button>
                    <h3>No.</h3>
                    <p>Warning</p>
                </div>
                <div className="info-purchase-order">


                    {/* 
                    <div className="info-create">
                        <p>Order ID: <select class="form-select select-order-id form-select-sm" aria-label=".form-select-sm example">
                            <option selected>Open this select menu</option>
                            <option value="1">One</option>
                            <option value="2">Two</option>
                            <option value="3">Three</option>
                        </select></p>
                        <p>Create Date: <span></span></p>


                    </div>
                    <div className="info-create">
                        <p>Create by: <span></span></p>
                        <div className="info-create-detail">
                            <p>Email : <span></span></p>
                            <p>Phone No: <span></span></p>
                        </div>

                    </div>

                    <div className="info-create">
                        <p>Supplier: <select class="form-select select-order-id form-select-sm" aria-label=".form-select-sm example">
                            <option selected>Open this select menu</option>
                            <option value="1">One</option>
                            <option value="2">Two</option>
                            <option value="3">Three</option>
                        </select></p>
                        


                    </div> */}

                    <div className="info-create">
                        <p>Create by: <span>{detailPurchaseOrder.transaction.createdBy.fullname}</span></p>
                        <div className="info-create-detail">
                            <p>Email : <span>{detailPurchaseOrder.transaction.createdBy.email}</span></p>
                            <p>Phone No: <span>{detailPurchaseOrder.transaction.createdBy.phoneNumber}</span></p>
                        </div>

                    </div>
                    <div className="info-create">
                        <p>Supplier: <span>{detailPurchaseOrder.supplier.supplierName}</span></p>
                        <div className="info-create-detail">
                            <p>Email : <span>{detailPurchaseOrder.supplier.email}</span></p>
                            <p>Phone No: <span>{detailPurchaseOrder.supplier.phoneNumber}</span></p>
                        </div>

                    </div>
                    <div className="info-date">
                        {/* <p>Create Date <span>{detailPurchaseOrder.transaction.createdDate.split("T")[0]}</span></p> */}
                      

                    </div>


                </div>
                <TablePurchase />
                {/* <div className="mail-detail collapse show" data-bs-target="#TextEditor1"
                id="TextEditor1" data-bs-toggle="collapse"><p>Mail detail</p></div>
                
             <TextEditor changeMailContent={(event) =>changeMailContent(event)} mailDescription={""} />
            */}

                {/* <div className="detail-purchase-container" >
                    <table class="table">
                        <thead>
                            <tr>
                                <th scope="col">Product No.</th>
                                <th scope="col">Product Name</th>
                                <th scope="col">Unit</th>
                                <th scope="col">Quanity</th>
                            </tr>
                        </thead>
                        <tbody>
                            {listProductQuoteOrder.map((product, index) =>
                                <tr>

                                    <th scope="row">{index + 1}</th>
                                    <td>{product.productVariant.name}</td>
                                    <td>{product.unit}</td>
                                    <td>{product.quantity}</td>
                                </tr>)}


                        </tbody>
                    </table>
                </div> */}
            </div>
        )
    }
}

const mapStateToProps = state => ({

    getDetailPurchaseReducer: state.getDetailPurchaseReducer
})
const connected = connect(mapStateToProps, { getDetailPurchaseOrder })(CreatePurchaseOrder)
export default withRouter(connected)