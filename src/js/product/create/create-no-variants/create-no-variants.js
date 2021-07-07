import React, { useState, useEffect, useReducer } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

//css
import "../../product.css";

//components
import { createProduct } from "../action";

const formReducer = (state, event) => {
  return {
    ...state,
    [event.name]: event.value,
  };
};

export default function () {
  let history = useHistory();
  let dispatch = useDispatch();
  let location = useLocation();
  const [formData, setFormData] = useReducer(formReducer, {});

  const dataLastPage = location.state.formData;
  const selectedCategory = location.state.categorySelected;

  const { token, messages } = useSelector((state) => ({
    token: state.client.token,
    messages: state.createProductReducer.messages,
  }));

  const handleChangeValue = (event) => {
    event.preventDefault();

    setFormData({
      name: event.target.name,
      value: event.target.value,
    });
  };

  function goBackClick() {
    history.goBack();
  }

  function onClickSave() {
    const data = {
      name: dataLastPage.name,
      brandName: dataLastPage.brand,
      categoryId: selectedCategory.id,
      isVariantType: false,
      productVariants: [
        {
          name: dataLastPage.name,
          price: formData.price,
          salePrice: formData.salesprice,
          barcode: formData.barcode,
          sku: formData.sku,
          unit: formData.unit,
        },
      ],
    };

    console.log(JSON.stringify(data));
    dispatch(createProduct({ data: data, token: token }));
  }
  useEffect(() => {
    if (messages !== "")
      history.push("/homepage/product/details", {
        productId: messages,
      });
  }, [messages]);
  //   todo: gop chung 2 bang , sau do tach ra
  return (
    <div className="home_content ">
      {/* todo: task heading */}
      <div className=" tab-fixed container-fluid  fixed-top">
        <div className=" d-flex mb-3 justify-content-end mt-4 ">
          {/* testing */}
          <a className="me-2" onClick={goBackClick}>
            <h3>Back</h3>
          </a>
          <h2 className="id-color fw-bold me-auto">Create new Product</h2>
          <div>
            {/* <button className="btn btn-default button-tab">Cancel</button> */}

            <button
              className="btn btn-primary button-tab me-3 text-white"
              onClick={onClickSave}
            >
              Save
            </button>
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

        {/* content  */}

        <div className="wrapper-content shadow">
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
                    placeholder=""
                    name="sku"
                    value={formData.sku || ""}
                    onChange={handleChangeValue}
                  />
                </div>
                <div class="col">
                  <label for="barcode" class="col-form-label">
                    Barcode (optional)
                  </label>{" "}
                  <input
                    name="barcode"
                    value={formData.barcode || ""}
                    onChange={handleChangeValue}
                    type="text"
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
                    Price
                  </label>{" "}
                  <input
                    name="price"
                    value={formData.price || ""}
                    onChange={handleChangeValue}
                    type="number"
                    class="form-control"
                  />
                </div>
                <div class="col">
                  <label for="quantity" class="col-form-label">
                    Sale Price
                  </label>{" "}
                  <input
                    name="saleprice"
                    value={formData.saleprice || ""}
                    onChange={handleChangeValue}
                    type="number"
                    class="form-control"
                  />
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
