import React, { useState, useEffect, useReducer } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

//css
import "../supplier.css";

import { createSupplierAction } from "./action";

const formReducer = (state, event) => {
  return {
    ...state,
    [event.name]: event.value,
  };
};
export default function () {
  let history = useHistory();
  let dispatch = useDispatch();

  const [formData, setFormData] = useReducer(formReducer, {});

  function goBackClick() {
    history.goBack();
  }

  function onSaveClick() {
    const data = {
      supplierName: "string",
      description: "string",
      address: "string",
      salePersonName: "string",
      phoneNumber: "string",
      email: "string",
    };
  }

  const handleChangeValue = (event) => {
    event.preventDefault();
    setFormData({
      name: event.target.name,
      value: event.target.value,
    });
  };
  return (
    <div>
      {/* todo: task heading */}
      <div className=" tab-fixed container-fluid  fixed-top">
        <div className=" d-flex mb-3 justify-content-end mt-4 ">
          <a className="me-2" onClick={goBackClick}>
            <h3>Back</h3>
          </a>
          <h2 className="id-color fw-bold me-auto">Create new supplier</h2>
          <div>
            <button className="btn btn-danger button-tab button me-3">
              Cancel
            </button>
            <button className="btn btn-primary button-tab button me-3">
              Save
            </button>
          </div>
        </div>
      </div>

      {/* content */}

      <div className="wrapper space-top">
        {/* content field 1  */}
        <div className="wrapper-content shadow">
          <div className="title-heading mt-2">
            <span>Supplier Details</span>
          </div>
          <form>
            {/* Supplier name  */}
            <div className="mt-3">
              <label for="search" class="form-label">
                Supplier Name
              </label>
              <input
                type="text"
                class="form-control"
                id="search"
                name="name"
                value={formData.name || ""}
              />
            </div>
            <div className="mt-3">
              <label for="search" class="form-label">
                Seller Name
              </label>
              <input
                type="text"
                class="form-control"
                id="search"
                name="sellername"
                value={formData.sellername || ""}
              />
            </div>
            {/* Email &&  Phone No  */}
            <div className="mt-3">
              <div class="row g-3 align-items-center">
                <div class="col">
                  <label for="inputEmail" class="col-form-label">
                    Email
                  </label>{" "}
                  <input
                    type="text"
                    id="inputEmail"
                    class="form-control"
                    name="email"
                    value={formData.email || ""}
                  />
                </div>
                <div class="col">
                  <label for="inputphoneno" class="col-form-label">
                    Phone No.
                  </label>{" "}
                  <input
                    type="tel"
                    id="inputphoneno"
                    class="form-control"
                    name="phone"
                    value={formData.phone || ""}
                    // aria-describedby="passwordHelpInline"
                  />
                </div>
              </div>
            </div>

            {/* Note  */}
            {/* <div class="mb-3 mt-3">
              <label for="note" class="form-label">
                Note
              </label>
              <textarea class="form-control" id="note" rows="3"></textarea>
            </div> */}
          </form>
        </div>

        {/* content field 2  */}
        <div className="wrapper-content mt-3 shadow">
          <div className="title-heading mt-2">
            <span>Address</span>
          </div>
          <input
            type="text"
            name="address"
            class="form-control"
            value={formData.address || ""}
            // value={supplier.address}
            // disabled={isDisabled}
            // readOnly={isDisabled}
            // onChange={onChangeValue}
          />
        </div>
      </div>
    </div>
  );
}
