import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";

//css
import "../supplier.css";

import {
  getDetailsSupplierAction,
  updateDetailsSupplierAction,
  deleteSupplierAction,
} from "./action";
import NavigationBar from "../../components/navbar/navbar-component";

export default function SupplierDetails() {
  let history = useHistory();
  let location = useLocation();
  let dispatch = useDispatch();

  const { supplierStore, token, messages } = useSelector((state) => ({
    supplierStore: state.getDetailsSupplierReducer.supplierDetails,
    messages: state.getDetailsSupplierReducer.messages,
    token: state.client.token,
  }));
  const [supplier, setSupplier] = useState({});

  const [returnData, setReturnData] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);

  function goBackClick() {
    history.goBack();
  }
  function onClickEdit() {
    setIsDisabled(false);
  }
  function onClickCancel() {
    setIsDisabled(true);

    setSupplier(supplierStore);
  }
  function onClickSave() {
    const data = {
      supplierId: supplier.id,
      supplierName: supplier.supplierName,
      description: supplier.description,
      address: supplier.address,
      salePersonName: supplier.salePersonName,
      phoneNumber: supplier.phoneNumber,
      email: supplier.email,
    };

    console.log(data);
    dispatch(updateDetailsSupplierAction({ data: data, token: token }));
  }
  function onClickDelete() {
    dispatch(
      deleteSupplierAction({ id: location.state.supplierId, token: token })
    );
  }
  function onChangeValue(event) {
    setSupplier({ ...supplier, [event.target.name]: event.target.value });
  }

  //todo: function Nav Button
  const listButton = setListButtonNav(isDisabled);
  function setListButtonNav(isDisabled) {
    if (isDisabled) {
      return [
        {
          isShow: true,
          title: "Delete",
          action: () => onClickDelete(),
          // action: () => testSWAL(),
          class: "btn-danger ",
          // style: {},
        },

        {
          isShow: true,
          title: "Edit",
          action: () => onClickEdit(),
          // action: () => clicktTest(),
          class: "btn-warning text-white",
          // style: {},
        },
      ];
    } else {
      return [
        {
          isShow: true,
          title: "Delete",
          action: () => onClickDelete(),
          // action: () => testSWAL(),
          class: "btn-danger ",
          // style: {},
        },
        {
          isShow: true,
          title: "Cancel",
          action: () => onClickCancel(),
          // action: () => testSWAL(),
          class: "btn-secondary ",
          // style: {},
        },
        {
          isShow: true,
          title: "Save",
          action: () => onClickSave(),
          // action: () => clicktTest(),
          class: "btn-primary",
          // style: {},
        },
      ];
    }
  }

  useEffect(() => {
    dispatch(
      getDetailsSupplierAction({
        id: location.state.supplierId,
        token: token,
      })
    );
  }, []);

  useEffect(() => {
    if (supplierStore !== null) {
      setReturnData(true);
      setSupplier(supplierStore);
    }
  }, [supplierStore]);

  useEffect(() => {
    if (messages === "Update Success") {
      dispatch(
        getDetailsSupplierAction({
          id: location.state.supplierId,
          token: token,
        })
      );
    } else if (messages === "Delete Success") {
      history.push("/homepage/supplier");
    }
  }, [messages]);

  console.log(supplier);

  return (
    <div>
      {/* todo: task heading */}
      {/* <div className=" tab-fixed container-fluid  fixed-top">
        <div className=" d-flex mb-3 justify-content-end mt-4 ">
          <a className="me-2" onClick={goBackClick}>
            <h3>Back</h3>
          </a>
          <h2 className="id-color fw-bold me-auto">Details</h2>
          <div>
            <button
              className="btn btn-danger button-tab text-white button me-3"
              onClick={onClickDelete}
            >
              Delete
            </button>
            {isDisabled ? (
              <button
                className="btn btn-warning button-tab text-white button me-3"
                onClick={onClickEdit}
              >
                Edit
              </button>
            ) : (
              <button
                className="btn btn-secondary button-tab text-white button me-3"
                onClick={onClickCancel}
              >
                Cancel
              </button>
            )}

            <button
              className="btn btn-primary button-tab button me-3"
              disabled={isDisabled}
              onClick={onClickSave}
            >
              Save
            </button>
          </div>
        </div>
      </div> */}

      <NavigationBar
        listButton={listButton}
        titleBar="Details"
        actionGoBack={goBackClick}
        status=""
      />
      {/* content */}
      {returnData && (
        <div className="wrapper space-top">
          {/* content field 1  */}
          <div className="wrapper-content shadow">
            <div className="title-heading mt-2">
              <span>Supplier Details</span>
            </div>
            <form>
              {/* Supplier name  */}
              <div className="mt-3">
                <label for="supplierName" class="form-label">
                  Supplier Name
                </label>
                <input
                  type="text"
                  class="form-control"
                  name="supplierName"
                  value={supplier.supplierName}
                  disabled={isDisabled}
                  readOnly={isDisabled}
                  onChange={onChangeValue}
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
                      name="email"
                      class="form-control"
                      value={supplier.email}
                      disabled={isDisabled}
                      readOnly={isDisabled}
                      onChange={onChangeValue}
                    />
                  </div>
                  <div class="col">
                    <label for="phone" class="col-form-label">
                      Phone No.
                    </label>{" "}
                    <input
                      type="tel"
                      name="phoneNumber"
                      class="form-control"
                      value={supplier.phoneNumber}
                      disabled={isDisabled}
                      readOnly={isDisabled}
                      onChange={onChangeValue}
                    />
                  </div>
                </div>
              </div>
              {/* Note  */}
              <div class="mb-3 mt-3">
                <label for="note" class="form-label">
                  Note
                </label>
                <textarea
                  class="form-control"
                  name="description"
                  rows="3"
                  value={supplier.description}
                  disabled={isDisabled}
                  readOnly={isDisabled}
                  onChange={onChangeValue}
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
              value={supplier.address}
              disabled={isDisabled}
              readOnly={isDisabled}
              onChange={onChangeValue}
            />
          </div>
        </div>
      )}
    </div>
  );
}
