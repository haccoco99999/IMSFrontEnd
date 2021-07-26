import React, { useState, useEffect, useReducer } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

//css
import "../supplier.css";
//components
import { createSupplierAction } from "./action";
import NavigationBar from "../../components/navbar/navbar-component";

const formReducer = (state, event) => {
  return {
    ...state,
    [event.name]: event.value,
  };
};
export default function CreateSupplier() {
  let history = useHistory();
  let dispatch = useDispatch();

  const [formData, setFormData] = useReducer(formReducer, {});
  const { token, messages } = useSelector((state) => ({
    token: state.client.token,
    messages: state.createSupplierReducer.messages,
  }));
  function goBackClick() {
    history.goBack();
  }

  function onSaveClick() {
    const data = {
      supplierName: formData.name,
      description: formData.description,
      address: formData.address,
      salePersonName: formData.sellername,
      phoneNumber: formData.phone,
      email: formData.email,
    };
    console.log(data);

    dispatch(createSupplierAction({ token: token, data: data }));
  }

  const handleChangeValue = (event) => {
    event.preventDefault();
    setFormData({
      name: event.target.name,
      value: event.target.value,
    });
  };

  const listButtons = setListButtonNav()

  function setListButtonNav() {
    return [{
      
    }]
  }

  useEffect(() => {
    if (messages !== "") {
      history.push("/homepage/supplier/details", { supplierId: messages });
    }
  }, [messages]);

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
            <button
              className="btn btn-primary button-tab button me-3"
              onClick={onSaveClick}
            >
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
                name="name"
                value={formData.name || ""}
                onChange={handleChangeValue}
              />
            </div>
            <div className="mt-3">
              <label for="search" class="form-label">
                Seller Name
              </label>
              <input
                type="text"
                class="form-control"
                name="sellername"
                value={formData.sellername || ""}
                onChange={handleChangeValue}
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
                    class="form-control"
                    name="email"
                    value={formData.email || ""}
                    onChange={handleChangeValue}
                  />
                </div>
                <div class="col">
                  <label for="inputphoneno" class="col-form-label">
                    Phone No.
                  </label>{" "}
                  <input
                    type="tel"
                    class="form-control"
                    name="phone"
                    value={formData.phone || ""}
                    onChange={handleChangeValue}
                    // aria-describedby="passwordHelpInline"
                  />
                </div>
              </div>
            </div>

            {/* Note  */}
            <div class="mb-3 mt-3">
              <label for="description" class="form-label">
                Description
              </label>
              <textarea
                class="form-control"
                name="description"
                rows="2"
                value={formData.description || ""}
                onChange={handleChangeValue}
              ></textarea>
            </div>
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
            onChange={handleChangeValue}
          />
        </div>
      </div>
    </div>
  );
}
