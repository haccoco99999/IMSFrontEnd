import React, { useState, useEffect, useReducer } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import "../../product.css";
import { createProduct } from "../action";

const formReducer = (state, event) => {
  return {
    ...state,
    [event.name]: event.value,
  };
};
export default function () {
  let history = useHistory();
  let location = useLocation();
  let dispatch = useDispatch();
  const [formData, setFormData] = useReducer(formReducer, {});
  const [variantValues, setVariantValues] = useState([{}]);

  const dataLastPage = location.state.formData;
  const selectedCategory = location.state.categorySelected;

  const onChangeValue = (event) => {
    setVariantValues(
      variantValues.map((element, index) =>
        index == event.target.id
          ? {
              ...element,
              [event.target.name]: event.target.value,
            }
          : element
      )
    );
  };

  console.log(dataLastPage);
  console.log(selectedCategory);
  console.log(variantValues);

  function goBackClick() {
    history.goBack();
  }

  // function addAttribute() {
  //   setVariantValues((state) => [
  //     ...state,
  //     {
  //       sku: formrData.sku,
  //       price: formData.price,
  //       storageQuantity: formData.quantity,
  //     },
  //   ]);
  // }

  function onClickSave() {
    console.log(variantValues);
  }

  useEffect(() => {
    setVariantValues(location.state.variantValues);
  }, []);
  return (
    //   todo: gop chung 2 bang , sau do tach ra
    <div className="home_content overflow-scroll ">
      {/* todo: task heading */}
      {/* todo: gop chung 2 page voi 2 nut khâc nhau  */}
      <div className=" tab-fixed container-fluid  fixed-top">
        {/* todo: task heading */}
        <div className=" tab-fixed container-fluid  fixed-top">
          <div className=" d-flex mb-3 justify-content-end mt-4 ">
            <a className="me-2" onClick={goBackClick}>
              <h3>Back</h3>
            </a>
            <h2 className="id-color fw-bold me-auto">Create new Product</h2>
            <div>
              <button
                className="btn btn-primary button-tab me-3 text-white"
                onClick={onClickSave}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* content */}
      <div className="wrapper space-top">
        {/* show product details */}
        <h2 className="id-color fw-bold mb-3">{dataLastPage.name}</h2>
        <div class="d-flex justify-content-around  mb-3">
          {/* <div>
            <h5>Product ID</h5>
            <h5 className="id-color">282170181</h5>
          </div> */}
          <div>
            <h5>Category</h5>
            <h5 className="id-color">{selectedCategory.name}</h5>
          </div>
          <div>
            <h5>Brand</h5>
            <h5 className="id-color">{dataLastPage.brand}</h5>
          </div>
        </div>

        {/* <div className="wrapper-content shadow">
          <h4></h4>
          <form>
            <div class="mb-3">
              <div class="row g-3 align-items-center">
                <div class="col">
                  <label for="sku" class="col-form-label">
                    SKU
                  </label>{" "}
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Write product name here"
                    name="sku"
                    //     value={formData.name || ""}
                    //        onChange={handleChangeValue}
                    //aria-describedby="passwordHelpInline"
                  />
                </div>
                <div class="col">
                  <label for="barcode" class="col-form-label">
                    Barcode (optional)
                  </label>{" "}
                  <input
                    name="barcode"
                    //   value={formData.barcode || ""}
                    //  onChange={handleChangeValue}
                    type="tel"
                    id="barcode"
                    class="form-control"
                  />
                </div>
              </div>
            </div>

            <div class="mb-3">
              <div class="row g-3 align-items-center">
                <div class="col">
                  <label for="salesprice" class="col-form-label">
                    Sales price
                  </label>{" "}
                  <input
                    type="number"
                    id="salesprice"
                    class="form-control"
                    placeholder="Write product name here"
                    name="name"
                    //   value={formData.name || ""}
                    //   onChange={handleChangeValue}
                    //aria-describedby="passwordHelpInline"
                  />
                </div>
                <div class="col">
                  <label for="barcode" class="col-form-label">
                    Quantity
                  </label>{" "}
                  <input
                    name="quantity"
                    //        value={formData.barcode || ""}
                    //         onChange={handleChangeValue}
                    type="tel"
                    class="form-control"
                  />
                </div>
              </div>
            </div>
          </form>
        </div> */}
        <ComponentsDetailsVariants
          dataAtrribute={variantValues}
          onChangeValue={onChangeValue}
          productName={dataLastPage.name}
          
        />
      </div>
    </div>
  );
}

function ComponentsDetailsVariants(props) {
  return (
    <>
      {props.dataAtrribute.map((element, index) => (
        <div className="wrapper-content shadow mt-3">
          <h4 className="id-color">
            <span>{}</span>
          </h4>
          <form>
            <div class="mb-3">
              <div class="row g-3 align-items-center">
                <div class="col">
                  <label for="sku" class="col-form-label">
                    SKU
                  </label>{" "}
                  <input
                    id={index}
                    type="text"
                    class="form-control"
                    placeholder="Write product name here"
                    name="sku"
                    value={element.sku}
                    onChange={props.onChangeValue}
                  />
                </div>
                <div class="col">
                  <label for="barcode" class="col-form-label">
                    Barcode (optional)
                  </label>{" "}
                  <input
                    id={index}
                    name="barcode"
                    value={element.barcode}
                    onChange={props.onChangeValue}
                    type="tel"
                   
                    class="form-control"
                  />
                </div>
              </div>
            </div>

            <div class="mb-3">
              <div class="row g-3 align-items-center">
                <div class="col">
                  <label for="salesprice" class="col-form-label">
                    Sales price
                  </label>{" "}
                  <input
                    id={index}
                    type="number"
                    class="form-control"
                    name="salesprice"
                    value={element.salesprice}
                    onChange={props.onChangeValue}
                  />
                </div>
                <div class="col">
                  <label for="barcode" class="col-form-label">
                    Quantity
                  </label>{" "}
                  <input
                    id={index}
                    name="quantity"
                    type="number"
                    class="form-control"
                    value={element.quantity}
                    onChange={props.onChangeValue}
                  />
                </div>
              </div>
            </div>
          </form>
        </div>
      ))}
    </>
  );
}
