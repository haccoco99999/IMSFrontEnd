import React from 'react'
import './list-products-table.css'
export default function ListProductsTable(props) {
    

    return (<div className="list-receipt-table-container">
        <div class="form-group search-purchase">
            <img  src="..\src\js\images\search.svg" alt="icon-search" />
            <input name="keySearch"  type="text" class="form-control" placeholder="Search by Order ID or Supplier Name" />

        </div>

        <table class="table table-hover receipt-table">
            <thead>
                <tr>
                    {props.listColumn != null ? props.listColumn.map(column => <th scope="col">{column}</th>) : ""}
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
            {/* onClick={() =>props.onRowClick(purchaseOrder.purchaseOrderNumber)} */}

                {props.listData != null ? props.listData.map((item, index) => (
                    <tr >
                        {/* <th scope="row"><input type="checkbox" /></th> */}
                        <td>{index +1 }</td>
                        <td>{item.productVariant.name}</td>
                        <td>{item.unit}</td>
                        <td><input value={item.orderQuantity} type="text" /></td>
                        <td> <input value={item.price} type="text" /></td>
                        <td>{item.totalAmount}</td>

                    </tr>)) : <tr>No data</tr>}

            </tbody>
        </table>
    </div>)
}