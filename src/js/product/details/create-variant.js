import React, { useEffect, useState, useReducer } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";

//css
import "../product.css";
//components
import { updateVariantAction } from "./action";

const formReducer = (state, event) => {
  return {
    ...state,
    [event.name]: event.value,
  };
};
export default function CreateVariant() {
  let history = useHistory();
  let location = useLocation();
  let dispatch = useDispatch();

  const [formData, setFormData] = useReducer(formReducer, {});

  const { token, messages } = useSelector((state) => ({
    token: state.client.token,
    messages: state.getDetailsProductReducer.messages,
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
      productId: location.state.productId,
      isVariantType: location.state.variantType,
      productVariantsUpdate: [
        {
          id: null,
          name: formData.name,
          price: formData.price,
          barcode: formData.barcode,
          sku: formData.sku,
          //   unit: location.state.productUnits,
          unit: "unit",
        },
      ],
    };
    console.log(data);
    dispatch(updateVariantAction({ token: token, data: data }));

  }

  useEffect(() => {
    if (messages === "Update Variant success") {
      history.push("/homepage/product/details", {
        productId: location.state.productId,
        // fromPage: "ManagerPage",
      });
    }
  }, [messages]);
  return (
    <>
      <div className=" tab-fixed container-fluid  fixed-top">
        <div className=" d-flex mb-3 justify-content-end mt-4 ">
          <a className="me-2" onClick={goBackClick}>
            <h3>Back</h3>
          </a>
          <h2 className="id-color fw-bold me-auto">
            {location.state.productId}/Create Variants
          </h2>
          <div>
            {/* <button
              className="btn btn-danger button-tab text-white button me-3"
              onClick={onClickDelete}
            >
              Delete
            </button> */}
            <button className="btn btn-danger button-tab text-white button me-3">
              Add Variant
            </button>

            <button
              className="btn btn-primary button-tab button me-3"
              //   disabled={isDisabled}
              onClick={onClickSave}
            >
              Save
            </button>
          </div>
        </div>
        {/* content */}
        <div className="wrapper space-top">
          <div className="wrapper-content shadow">
            <form>
              <div class="mb-3">
                <div class="row g-3 align-items-center">
                  <div class="col">
                    <label for="name" class="col-form-label">
                      Variant Name
                    </label>{" "}
                    <input
                      type="text"
                      id="name"
                      class="form-control"
                      placeholder="Write product name here"
                      name="name"
                      value={formData.name || ""}
                      onChange={handleChangeValue}
                    />
                  </div>
                  <div class="col">
                    <label for="name" class="col-form-label">
                      Barcode
                    </label>{" "}
                    <input
                      type="text"
                      id="barcode"
                      class="form-control"
                      name="barcode"
                      value={formData.barcode || ""}
                      onChange={handleChangeValue}
                    />
                  </div>
                </div>
              </div>
              <div class="mb-3">
                <div class="row g-3 align-items-center">
                  <div class="col">
                    <label for="name" class="col-form-label">
                      SKU
                    </label>{" "}
                    <input
                      type="text"
                      id="name"
                      class="form-control"
                      name="sku"
                      value={formData.sku || ""}
                      onChange={handleChangeValue}
                    />
                  </div>{" "}
                  <div class="col">
                    <label for="name" class="col-form-label">
                      Price
                    </label>{" "}
                    <input
                      type="number"
                      id="price"
                      class="form-control"
                      name="price"
                      value={formData.price || ""}
                      onChange={handleChangeValue}
                    />
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
