import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import Swal from "sweetalert2";
//css
import "../supplier.css";

import {
  getDetailsSupplierAction,
  updateDetailsSupplierAction,
  deleteSupplierAction,
} from "./action";
import { CLEAR_MESSAGE } from "./constants";
import NavigationBar from "../../components/navbar/navbar-component";
import { InfoPurchaseOrderLoader, TableLoading } from "../../components/loading/loading-component";
export default function SupplierDetails() {
  let history = useHistory();
  let location = useLocation();
  let dispatch = useDispatch();

  const {
    supplierStore,
    token,
    messages,
    updateSupplierReducer,
    deleteSupplierReducer,
    getDetailsSupplierReducer,
  } = useSelector((state) => ({
    supplierStore: state.getDetailsSupplierReducer.supplierDetails,
    // messages: state.getDetailsSupplierReducer.messages,
    token: state.client.token,
    updateSupplierReducer: state.updateSupplierReducer,
    deleteSupplierReducer: state.deleteSupplierReducer,
    getDetailsSupplierReducer: state.getDetailsSupplierReducer,
  }));
  const [supplier, setSupplier] = useState({});

  const [returnData, setReturnData] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);

  function goBackClick() {
    // history.goBack();
    history.replace("/homepage/supplier");
  }
  function onClickEdit() {
    setIsDisabled(false);
  }
  function onClickCancel() {
    setIsDisabled(true);

    setSupplier(supplierStore);
  }

  function onSaveClick(event) {
    event.preventDefault();
    const form = document.getElementById("productDetailsForm");
    if (!form.checkValidity()) {
      event.preventDefault();
      // event.stopPropagation;
    } else {
      let needCheckName = false;
      let needCheckEmail = false;
      if (supplier.supplierName !== supplierStore.supplierName)
        needCheckName = true;
      if (supplier.email !== supplierStore.email) needCheckEmail = true;

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

      Swal.fire({
        title: "Are you sure",
        text: "Do you want to save?",
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: " #d33",
        confirmButtonText: "Confirm",
        reverseButtons: true,
      }).then((result) => {
        if (result.isConfirmed) {
          dispatch(
            updateDetailsSupplierAction({
              data: data,
              token: token,
              needCheckName: needCheckName,
              needCheckEmail: needCheckEmail,
            })
          );
        }
      });
    }
    form.classList.add("was-validated");
  }
  function onClickDelete() {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: " #3085d6",
      confirmButtonText: "Delete",
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(
          deleteSupplierAction({ id: location.state.supplierId, token: token })
        );
        // Swal.fire("Deleted!", "Your stocktake has been deleted.", "success");
      }
    });
  }
  function onChangeValue(event) {
    setSupplier({ ...supplier, [event.target.name]: event.target.value });
  }

  //todo: function Nav Button
  const listButton = setListButtonNav(isDisabled);
  function setListButtonNav(isDisabled) {
    if (isDisabled) {
      return [
        // {
        //   isShow: true,
        //   title: "Delete",
        //   action: () => onClickDelete(),
        //   // action: () => testSWAL(),
        //   class: "btn-danger ",
        //   // style: {},
        // },

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
        // {
        //   isShow: true,
        //   title: "Delete",
        //   action: () => onClickDelete(),
        //   // action: () => testSWAL(),
        //   class: "btn-danger ",
        //   // style: {},
        // },
        {
          isShow: true,
          title: "Revert",
          action: () => onClickCancel(),
          // action: () => testSWAL(),
          class: "btn-secondary ",
          // style: {},
        },
        {
          isShow: true,
          title: "Save",
          class: " btn-primary",
          action: (e) => onSaveClick(e),
          type: "submit",
          form: "productDetailsForm",
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
    return () => {
      dispatch({ type: CLEAR_MESSAGE });
    };
  }, []);

  useEffect(() => {
    if (supplierStore !== null) {
      setSupplier(supplierStore);
    }
  }, [supplierStore]);

  useEffect(() => {
    if (updateSupplierReducer.requesting) {
      Swal.fire({
        title: "Progressing",
        html: "Waiting...",
        timerProgressBar: true,
        didOpen: () => {
          Swal.showLoading();
        },
      });
    } else if (updateSupplierReducer.successful) {
      if (updateSupplierReducer.errors) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: updateSupplierReducer.messages,
          showCancelButton: false,
          confirmButtonColor: "#3085d6",
        });
      } else
        Swal.fire({
          icon: "success",
          title: "Your work has been saved",
          showCancelButton: false,
          confirmButtonColor: "#3085d6",
        }).then((result) => {
          if (result.isConfirmed)
            dispatch(
              getDetailsSupplierAction({
                id: location.state.supplierId,
                token: token,
              })
            );
        });
    } else if (updateSupplierReducer.errors) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Something went wrong!",
      });
    }
  }, [updateSupplierReducer]);

  useEffect(() => {
    if (deleteSupplierReducer.requesting) {
      Swal.fire({
        title: "Progressing",
        html: "Waiting...",
        timerProgressBar: true,
        didOpen: () => {
          Swal.showLoading();
        },
      });
    } else if (deleteSupplierReducer.successful) {
      Swal.fire({
        icon: "success",
        title: "Your work has been saved",
        showCancelButton: false,
        confirmButtonColor: "#3085d6",
      }).then((result) => {
        if (result.isConfirmed) history.push("/homepage/supplier");
      });
    } else if (deleteSupplierReducer.errors) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Something went wrong!",
      });
    }
  }, [deleteSupplierReducer]);

  useEffect(() => {
    if (getDetailsSupplierReducer.successful) setReturnData(true);
  }, [getDetailsSupplierReducer]);

  return (
    <div>
   
        <>
          <NavigationBar
            listButton={listButton}
            titleBar="Supplier details"
            actionGoBack={goBackClick}
            status=""
            home="Supplier"
            currentPage="Supplier details"
          />

          <div className="wrapper">
            <div className="card">
              <div class="card-header">Supplier Information</div>
              {returnData ? (
              <ul class="list-group list-group-flush">
                <li class="list-group-item">
                  <form
                    id="productDetailsForm"
                    class="row g-3 needs-validation "
                    noValidate
                  >
                    <div className="mt-3">
                      <label for="supplierName" class="form-label">
                        Name
                      </label>
                      <input
                        type="text"
                        class="form-control"
                        name="supplierName"
                        value={supplier.supplierName}
                        disabled={isDisabled}
                        readOnly={isDisabled}
                        onChange={onChangeValue}
                        required
                        placeholder="etc. Nike Company"
                      />
                      <div class="invalid-feedback">
                        Please input valid name
                      </div>
                    </div>
                    <div className="mt-3">
                      <label for="search" class="form-label">
                        Seller Name <span class="text-secondary" >(optional) </span>
                      </label>
                      <input
                        type="text"
                        class="form-control"
                        name="salePersonName"
                        value={supplier.salePersonName}
                        onChange={onChangeValue}
                        disabled={isDisabled}
                        readOnly={isDisabled}
                        placeholder="Type seller name"
                        required
                      />
                      <div className="invalid-feedback">
                        PLease input valid seller name
                      </div>
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
                            pattern="^[a-z][a-z0-9_\.]{5,32}@[a-z0-9]{2,}(\.[a-z0-9]{2,4}){1,2}$"
                            required
                            placeholder="clarice@gmail.com"
                          />
                          <div class="invalid-feedback">
                            Please input valid email
                          </div>
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
                            pattern="((09|03|07|08|05|028|024)+([0-9]{8})\b)"
                            required
                            placeholder="0903321332"
                          />
                          <div class="invalid-feedback">
                            Please input valid phone number
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="mb-3 mt-3">
                      <label for="note" class="form-label">
                        Address 
                      </label>
                      <input
                        type="text"
                        name="address"
                        class="form-control"
                        value={supplier.address}
                        disabled={isDisabled}
                        readOnly={isDisabled}
                        onChange={onChangeValue}
                      />
                      <div class="invalid-feedback">Please input address</div>
                    </div>
                  </form>
                  {/* Note  */}
                  <div class="mb-3 mt-3">
                    <label for="note" class="form-label">
                      Note <span class="text-secondary" >(optional) </span>
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
                </li>
              </ul> ) : (<> <InfoPurchaseOrderLoader /> </>)}
            </div>
          </div>
        </>
    
    </div>
  );
}
