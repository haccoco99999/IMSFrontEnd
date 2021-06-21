import React, { useEffect } from "react";
import "./list-products-table.css";
import { useState } from "react";
export default function ListProductsTable(props) {
  // function onChangeInput(index, event) {

  //     setlistProduct(
  //         [...listProduct], listProduct[index][event.target.name] = event.target.value
  //     )
  // }

  // useEffect(() => {

  //     setlistProduct(
  //         [...props.listData]
  //     )
  // }, [props.listData])
  // useEffect(() => {
  //     if (props.isSave) {
  //         props.saveEditFlow(listProduct)
  //     }
  // }, [props.isSave])

  // async function confirmByManagerAPI(SKU) {
  //     let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjkyZThlZGFjLWFkNTQtNGFlNi1hZTIyLTBlMGM1MDJkYTYxMSIsIm5iZiI6MTYyMzk5MDE0NCwiZXhwIjoxNjI0NTk0OTQ0LCJpYXQiOjE2MjM5OTAxNDR9.FUFJu7BGnJISrJ-N_aYrB9yWsSdREP1TePeYDHtwdZo"
  //     const updateUrl = `https://imspublicapi.herokuapp.com/api/product/search/${SKU}&page=1&size=10`
  //     let json = await fetch(updateUrl, {
  //         method: 'GET',
  //         headers: {
  //             "Authorization": "Bearer " + token,
  //             "Content-Type": "application/json",
  //             "Origin": ""
  //         },
  //         credentials: "include",

  //     })

  //         .then(response => response.json())
  //         .then(json => json)
  //         .catch((error) => { throw error })

  //     console.log(json)

  //     let product = {
  //         id: json.paging.resultList[0].productId,
  //         orderId: "71689",
  //         productVariantId: json.paging.resultList[0].id,
  //         orderQuantity: 0,
  //         unit: "OF 37 49 53 G",
  //         price: 1787.37,
  //         discountAmount: 7508.84,
  //         totalAmount: 32303.08,
  //         name: json.paging.resultList[0].name,
  //     }

  //     listProduct.push(product)
  //     setlistProduct(
  //         [...listProduct]
  //     )
  // }
  let arrayHeaders = [];

  return (
    <div className="list-receipt-table-container">
      <div class="form-group search-purchase">
        <img src="..\src\js\images\search.svg" alt="icon-search" />
        <input
          name="keySearch"
          type="text"
          class="form-control"
          placeholder="Search by Order ID or Supplier Name"
        />
      </div>

      <table class="table table-hover table-customize">
        <thead>
          <tr>
            {props.listColumn != null
              ? props.listColumn.map((column) => {
                  arrayHeaders.push(
                    Object.entries(column).map((item) => item[0])
                  );
                  return <th> {Object.entries(column)[0][1]}</th>;
                })
              : ""}
          </tr>
        </thead>
        <tbody>
          {/* onClick={() =>props.onRowClick(purchaseOrder.purchaseOrderNumber)} */}
          {console.log(props.listData)}

          {props.listData !== null ? (
            props.listData.map((product, index) => (
              // <tr key={index} >

              //     <td>{index + 1}</td>
              //     <td>{item.name}</td>
              //     <td>{item.unit}</td>
              //     <td><input id={index} name={"orderQuantity"} value={item.orderQuantity} onChange={(e)=>props.onChangeValueProduct(e)}  type="number"/></td>
              //     <td> <input id={index} name={"price"} value={item.price} onChange={props.onChangeValueProduct} type="number" /></td>
              //     <td>{item.totalAmount}</td>

              // </tr>
              <tr>
                {arrayHeaders.map((header) => {
                  if (header.includes("input")) {
                    return (
                      <td>
                        <input
                          id={index}
                          className="input-table"
                          disabled={props.disabled}
                          name={header[0]}
                          onChange={props.onChangeValueProduct}
                          value={
                            Object.entries(product)[
                              Object.entries(product)
                                .map((item) => item[0])
                                .indexOf(header[0])
                            ][1]
                          }
                        />{" "}
                      </td>
                    );
                  } else {
                    return (
                      <td>
                        {
                          Object.entries(product)[
                            Object.entries(product)
                              .map((item) => item[0])
                              .indexOf(header[0])
                          ][1]
                        }{" "}
                      </td>
                    );
                  }
                })}
              </tr>
            ))
          ) : (
            <tr>No data</tr>
          )}
        </tbody>
      </table>
      {/* <input type="text" />
        <button onClick={() => confirmByManagerAPI("MO569812R")} >Add</button> */}
    </div>
  );
}
