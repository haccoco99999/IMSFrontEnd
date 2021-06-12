import React from 'react'
import './Table-Purchase-Order.css'
import searchPurchaseOrder from './action'
import { connect } from 'react-redux'
import {Route, withRouter, Switch } from 'react-router-dom'

class TablePurchase extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            keySearch: ''
        }
        this.onChangeInput = this.onChangeInput.bind(this)
        this. onClickToDetailPurchaseOrder = this. onClickToDetailPurchaseOrder.bind(this)
    }
    onChangeInput = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })

    }
    getListPurchaseOrder = () => {

        this.props.searchPurchaseOrder(this.state.keySearch)
    }
    onClickToDetailPurchaseOrder(orderID){
        this.props.history.push("/homepage/purchase/DetailPurchaseOrder",{orderID });
    }
    render() {
        const {
            listColumn,
        } = this.props
        return (
            <div className="purchase-container">
                <div class="form-group search-purchase">
                    <img onClick={this.getListPurchaseOrder} src="..\src\js\images\search.svg" alt="icon-search" />
                    <input name="keySearch" value={this.state.keySearch} onChange={(event) => this.onChangeInput(event)} type="text" class="form-control" placeholder="Search by Order ID or Supplier Name" />

                </div>

                <table class="table table-hover table-purchase">
                    <thead>
                        <tr>
                        {/* {listColumn.map(x => <h1>x</h1>)} */}
                            <th scope="col"><input type="checkbox" /></th>
                            <th scope="col">OrderID</th>
                            <th scope="col">Confirm by</th>
                            <th scope="col">Status</th>
                            <th scope="col">Total Price</th>
                            <th scope="col">Delivery date</th>
                            <th scope="col">Create date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.searchPurchaseOrderReducer.listPurchaseOrder.map(purchaseOrder => (
                        <tr onClick={() =>this.onClickToDetailPurchaseOrder(purchaseOrder.purchaseOrderNumber)}>
                            <th scope="row"><input type="checkbox" /></th>
                            <td>{purchaseOrder.purchaseOrderNumber}</td>
                            <td>{purchaseOrder.confirmedByName}</td>
                            <td>{purchaseOrder.status}</td>
                            <td>{purchaseOrder.totalPrice}</td>
                            <td>{purchaseOrder.deliveryDate.split("T")[0]}</td>
                            <td>{purchaseOrder.createdDate.split("T")[0]}</td>
                      
                        </tr>))}

                    </tbody>
                </table>
            </div>
        );

    }
}

const mapStateToProps = state => ({
    searchPurchaseOrderReducer: state.searchPurchaseOrderReducer
})

const connected = connect(mapStateToProps, { searchPurchaseOrder })(TablePurchase)
export default withRouter(connected)