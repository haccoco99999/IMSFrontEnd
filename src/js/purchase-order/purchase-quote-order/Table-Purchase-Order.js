import React from 'react'
import './Table-Purchase-Order.css'
import searchPurchaseOrder from './action'
import { connect } from 'react-redux'
import { Route, withRouter, Switch } from 'react-router-dom'
import Autocomplete from 'react-autocomplete';
class TablePurchase extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            keySearch: ''
        }
        this.onChangeInput = this.onChangeInput.bind(this)
        // this. onClickToDetailPurchaseOrder = this. onClickToDetailPurchaseOrder.bind(this)
    }
    onChangeInput = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })

    }
    getListPurchaseOrder = () => {

        this.props.searchPurchaseOrder(this.state.keySearch)
    }

    render() {
        const {
            listColumn,
            listData,
        } = this.props
        return (
            <div className="purchase-container">
                <div class="form-group search-purchase">
                    <img onClick={this.getListPurchaseOrder} src="..\src\js\images\search.svg" alt="icon-search" />
                    <input name="keySearch" value={this.state.keySearch} onChange={(event) => this.onChangeInput(event)} type="text" class="form-control" placeholder="Search by Order ID or Supplier Name" />

                </div>


                {/* <Autocomplete
                    getItemValue={(item) => item.label}
                    items={[
                        { label: 'apple' },
                        { label: 'banana' },
                        { label: 'pear' }
                    ]}
                    renderMenu={item => (
                        <div className="dropdown">
                          {item}
                        </div>
                      )}
                    renderItem={(item, isHighlighted) =>
                        <div style={{ background: isHighlighted ? 'lightgray' : 'white' }}>
                            {item.label}
                        </div>
                    }
                    value={this.state.keySearch}
                    onChange={(event, keySearch) => this.setState({keySearch: keySearch})}
                    onSelect={(keySearch) => value = keySearch}
                /> */}

                <table class="table table-hover table-purchase">
                    <thead>
                        <tr>
                            {listColumn != null ? listColumn.map(column => <th scope="col">{column}</th>) : ""}
                            {/* <th scope="col"><input type="checkbox" /></th> */}
                            {/* <th scope="col">OrderID</th>
                            <th scope="col">Confirm by</th>
                            <th scope="col">Status</th>
                            <th scope="col">Total Price</th>
                            <th scope="col">Delivery date</th>
                            <th scope="col">Create date</th> */}
                        </tr>
                    </thead>
                    <tbody>
                        {listData != null ? listData.map(purchaseOrder => (
                            <tr onClick={() => this.props.onRowClick(purchaseOrder.purchaseOrderNumber)}>
                                {/* <th scope="row"><input type="checkbox" /></th> */}
                                <td>{purchaseOrder.purchaseOrderNumber}</td>
                                <td>{purchaseOrder.confirmedByName}</td>
                                <td>{purchaseOrder.status}</td>
                                <td>{purchaseOrder.totalPrice}</td>
                                <td>{purchaseOrder.deliveryDate.split("T")[0]}</td>
                                <td>{purchaseOrder.createdDate.split("T")[0]}</td>

                            </tr>)) : <tr>No data</tr>}

                    </tbody>
                </table>
            </div>
        );

    }
}

const mapStateToProps = state => ({

})

const connected = connect(mapStateToProps, { searchPurchaseOrder })(TablePurchase)
export default withRouter(connected)