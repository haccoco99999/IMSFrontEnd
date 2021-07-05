import React, { useState, useEffect, useReducer } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
//css
import "../stocktake.css";
//components
import AddMultiple from "./add-multiple";
import TableProduct from "../../list-products-table/ListProductsTable";
import SearchComponent from "../../search-component/SearchComponent";
export default function create() {
  let history = useHistory();

  function goBackClick() {
    history.goBack();
  }
  function clickToAddProduct(productRaw) {
    let product = {
      id: productRaw.productId,
      orderId: "",
      productVariantId: productRaw.id,
      orderQuantity: 1,
      unit: productRaw.unit,
      price: productRaw.price,
      discountAmount: 0,
      totalAmount: productRaw.price * 1,
      name: productRaw.name,
    };
    console.log(product);
    setPurchaseOrderProduct([...purchaseOrderProduct, product]);
  }
  function onChangeValueProduct(event) {
    setPurchaseOrderProduct(
      purchaseOrderProduct.map((element, index) =>
        index == event.target.id
          ? {
              ...element,
              [event.target.name]: event.target.value,
              totalAmount:
                [event.target.name] === "orderQuantity"
                  ? event.target.value * element.price
                  : event.target.value * element.orderQuantity,
            }
          : element
      )
    );
  }
  return (
    <div>
      {/* todo: task heading */}
      {/* todo: gop chung 2 page voi 2 nut khâc nhau  */}
      <div className=" tab-fixed container-fluid  fixed-top">
        {/* todo: task heading */}
        <div className=" tab-fixed container-fluid  fixed-top">
          <div className=" d-flex mb-3 justify-content-end mt-4 ">
            <a className="me-2" onClick={goBackClick}>
              <h3>Back</h3>
            </a>
            <h2 className="id-color fw-bold me-auto">Create Stock take</h2>
            <div>
              <button className="btn btn-default button-tab">Cancel</button>
              <button className="btn btn-primary button-tab me-3 text-white">
                Submit
              </button>
              <button className="btn btn-primary button-tab me-3 text-white">
                Save
              </button>
            </div>
          </div>
        </div>

        {/* content */}
        <div className="wrapper space-top">
          <div className="shadow wrapper-content">
            {/* <div class="row g-3 align-items-center mt-3">
                
                <div className="col">

                </div>

               
                <div class="col-auto">
                  <button
                    type="button"
                    class="btn btn-default btn-outline-dark"
                    data-bs-target="#AddMultipleModal"
                    data-bs-toggle="modal"
                  >
                    Add multiple
                  </button>
                </div>
              </div> */}

            <div className="mt-3">
              <div className="title-heading mt-2">
                <span>Select your product</span>
              </div>
              <SearchComponent clickToAddProduct={clickToAddProduct} />
              <div className="mt-3"></div>
            </div>
          </div>
        </div>
      </div>
      <AddMultiple />
    </div>
  );
}
