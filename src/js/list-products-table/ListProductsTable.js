import React, { useEffect } from 'react'
import './list-products-table.css'
import { useState } from 'react'
export default function ListProductsTable(props) {

    // let [listProduct, setlistProduct] = useState( props.listData);
    // const changeQuantity= (item, event)=>{
    //     setlistProduct(
    //         this.setlistProduct(
    //             [...listProduct, item.orderQuantity = event.target.value]
    //         )
    //     )
    // }
    // function onChangeInput(index,event){
      
       
        
    //     setlistProduct(
    //        [...listProduct],listProduct[index][event.target.name] = event.target.value
    //     )
    // }
    // console.log(listProduct)
    // useEffect(()=>{
    //   setlistProduct(
    //       props.listData
    //   )
    // },[props.listData])
    console.log(props.draftData)
    console.log(props.draftData === null)
    let listProduct = props.draftData === null?  props.listData : props.draftData 

    return (<div className="list-receipt-table-container">
        <div class="form-group search-purchase">
            <img  src="..\src\js\images\search.svg" alt="icon-search" />
            <input name="keySearch"  type="text" class="form-control" placeholder="Search by Order ID or Supplier Name" />

        </div>

        <table class="table table-hover receipt-table">
            <thead>
                <tr>
                    {props.listColumn != null ? props.listColumn.map(column => <th scope="col">{column}</th>) : ""}
                   
                </tr>
            </thead>
            <tbody>
            {/* onClick={() =>props.onRowClick(purchaseOrder.purchaseOrderNumber)} */}

                {listProduct != null ? listProduct.map((item, index) => (
                    <tr >
                        {/* <th scope="row"><input type="checkbox" /></th> */}
                        <td>{index +1 }</td>
                        <td>{item.name}</td>
                        <td>{item.unit}</td>
                        <td><input name={"orderQuantity"} value={item.orderQuantity} onChange={(e)=> props.inputChangeProduct(index,e)} type="text" /></td>
                        <td> <input name={"price"}  value={item.price} onChange={(e)=> props.inputChangeProduct(index,e)} type="text" /></td>
                        <td>{item.totalAmount}</td>

                    </tr>)) : <tr>No data</tr>}

            </tbody>
        </table>
    </div>)
}