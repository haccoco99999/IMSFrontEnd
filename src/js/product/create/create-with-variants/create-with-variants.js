import React, { useState, useEffect, useReducer } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import "../../product.css";
//components
import { createProduct } from "../action";
import Table from "../../../list-products-table/ListProductsTable";

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
  const [variantValues, setVariantValues] = useState([]);

  const [listValueColumn, setListValueColumn] = useState([
    {
      name: "Variants Name",
      input: true,
    },
    {
      sku: "SKU",
      input: true,
    },
    {
      barcode: "Barcode",
      input: true,
    },

    {
      unit: "Unit",
    },
    {
      storageQuantity: "Quantity",
      input: true,
    },
    {
      price: "Price",
      input: true,
    },
  ]);

  const [listData, setListData] = useState([]);

  const dataLastPage = location.state.formData;
  const selectedCategory = location.state.categorySelected;

  function onChangeValueVariants(event) {
    setVariantValues(
      variantValues.map((element, index) =>
        index == event.target.id
          ? {
              ...element,
              [event.target.name]: event.target.value,
              // totalAmount:
              //   [event.target.name] === "storageQuantity"
              //     ? event.target.value * element.price
              //     : event.target.value * element.storageQuantity,
            }
          : element
      )
    );
  }

  function clickToAddVariants(row) {
    let productVariants = {
      name: "",
      price: 0,
      barcode: "",
      sku: "",
      unit:dataLastPage.unit ,
      storageQuantity: 0,
    };
    setVariantValues([...variantValues, productVariants]);
  }

  function clickDeleteVariant(id) {
    setVariantValues(
      variantValues.filter((_,index) => index !== id)
    );
  }

  function goBackClick() {
    history.goBack();
  }

  function onClickSave() {
    console.log(variantValues);
    const data = {
      name: dataLastPage.name,
      brandName: dataLastPage.brand,
      categoryId: selectedCategory.id,
      isVariantType: true,
      productVariants: variantValues,
    };
    console.log(JSON.stringify(data));
    //dispatch(createProduct({ data: data, token: token }));
  }

  // useEffect(() => {
  //   setVariantValues(location.state.variantValues);
  // }, []);
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

        <div className="wrapper-content shadow">
          <button onClick={clickToAddVariants} className="btn btn-primary">
            Add
          </button>
          <Table
            listColumn={listValueColumn}
            listData={variantValues}
            clickToAddProduct={clickToAddVariants}
            onChangeValueProduct={onChangeValueVariants}
            clickDeleteProduct={clickDeleteVariant}
          />
        </div>
      </div>
    </div>
  );
}
