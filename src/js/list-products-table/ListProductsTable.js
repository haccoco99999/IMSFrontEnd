import React, { useEffect, useState } from 'react'
import './list-products-table.css'
import { ReactSearchAutocomplete } from 'react-search-autocomplete'

export default function ListProductsTable(props) {
   


  

    let arrayHeaders = []

    return (<div className="list-receipt-table-container">
       


        {/* <ReactSearchAutocomplete
                    inputDebounce = {500}
                 
                    onSearch={handleOnSearch}
                    onHover={handleOnHover}
                    onSelect={handleOnSelect}
                    onFocus={handleOnFocus}
                    autoFocus
                /> */}



        <table class="table table-hover table-customize">
            <thead>
                <tr>

                    {props.listColumn != null ? props.listColumn.map(column => {

                        arrayHeaders.push(Object.entries(column).map(item => item[0]))
                        return <th> {Object.entries(column)[0][1]}</th>
                    }

                    ) : ""}

                </tr>
            </thead>
            <tbody>
                {/* onClick={() =>props.onRowClick(purchaseOrder.purchaseOrderNumber)} */}


                {props.listData !== null ? props.listData.map((product, index) =>

                    // <tr key={index} >


                    //     <td>{index + 1}</td>
                    //     <td>{item.name}</td>
                    //     <td>{item.unit}</td>
                    //     <td><input id={index} name={"orderQuantity"} value={item.orderQuantity} onChange={(e)=>props.onChangeValueProduct(e)}  type="number"/></td>
                    //     <td> <input id={index} name={"price"} value={item.price} onChange={props.onChangeValueProduct} type="number" /></td>
                    //     <td>{item.totalAmount}</td>

                    // </tr>
                    <tr>
                        {

                            arrayHeaders.map(header => {

                                if (header.includes("input")) {
                                    return <td><input id={index} className="input-table" disabled={props.disabled} name={header[0]} onChange={props.onChangeValueProduct} value={Object.entries(product)[Object.entries(product).map(item => item[0]).indexOf(header[0])][1]} /> </td>
                                }
                                else {
                                    return <td>{Object.entries(product)[Object.entries(product).map(item => item[0]).indexOf(header[0])][1]} </td>
                                }


                            })
                           
                        }
                        {!props.disabled? <td style={{color:"red"}} onClick={() =>props.clickDeleteProduct(product.productVariantId)}>Delete</td>: ""} 
                        </tr>
                ) : <tr>No data</tr>



                }

            </tbody>
        </table>

        {/* <input type="text" name="city" list="citynames" onClick={}/>
        <datalist id="citynames">
            <option value="Boston" />
            <option value="Cambridge" />
        </datalist> */}

        {/* <input type="text" />
        <button onClick={() => confirmByManagerAPI("MO569812R")} >Add</button> */}

    </div>)
}