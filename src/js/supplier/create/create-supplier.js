import React, { useEffect, useReducer } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Swal from "sweetalert2";
//css
import "../supplier.css";
//components
import { createSupplierAction } from "./action";
import { RESET } from "./constants";
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
  const { token, messages, createSupplierReducer } = useSelector((state) => ({
    token: state.client.token,
    // messages: state.createSupplierReducer.messages,
    createSupplierReducer: state.createSupplierReducer,
  }));
  function goBackClick() {
    history.goBack();
  }
  function checkUndifined() {
    if (formData.description === undefined)
      setFormData({ name: "description", value: "" });
  }

  function onSaveClick(event) {
    event.preventDefault();
    const form = document.getElementById("productDetailsForm");
    if (!form.checkValidity()) {
      event.preventDefault();
      event.stopPropagation;
    } else {
      checkUndifined();
      const data = {
        supplierName: formData.name,
        description: formData.description,
        address: formData.address,
        salePersonName: formData.sellername,
        phoneNumber: formData.phone,
        email: formData.email,
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
          dispatch(createSupplierAction({ token: token, data: data }));

        }
      });

    }
    form.classList.add("was-validated");
  }

  const handleChangeValue = (event) => {
    event.preventDefault();
    setFormData({
      name: event.target.name,
      value: event.target.value,
    });
  };

  const listButton = setListButtonNav();

  function setListButtonNav() {
    return [
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

  useEffect(() => {
    return () => {
      dispatch({ type: RESET });
    };
  }, []);

  useEffect(() => {
    if (createSupplierReducer.requesting) {
      Swal.fire({
        title: "Progressing",
        html: "Waiting...",
        timerProgressBar: true,
        didOpen: () => {
          Swal.showLoading();
        },
      });
    } else if (createSupplierReducer.successful) {
      if (createSupplierReducer.errors) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Duplicate",
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
            history.push("/homepage/supplier/details", {
              supplierId: createSupplierReducer.messages,
            });
        });
    } else if (createSupplierReducer.errors) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Something went wrong!",
      });
    }
  }, [createSupplierReducer]);
 

  return (
    <div>
      {/* todo: task heading */}
      <NavigationBar
        actionGoBack={goBackClick}
        titleBar="Create supplier"
        status=""
        listButton={listButton}
        home="Supplier"
        currentPage="Create supplier "
      />
      {/* content */}

      <div className="wrapper">
        {/* content field 1  */}
        <div class="card">
          <div class="card-header">Supplier Information</div>
          <ul class="list-group list-group-flush">
            <li class="list-group-item">
              <form
                id="productDetailsForm"
                class="row g-3 needs-validation "
                noValidate
              >
                {/* Supplier name  */}
                <div className="mt-3">
                  <label for="search" class="form-label">
                    Name
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    name="name"
                    value={formData.name || ""}
                    onChange={handleChangeValue}
                    placeholder="etc. Nike Company"
                    required
                  />
                  <div className="invalid-feedback">
                    PLease input valid name
                  </div>
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
                        type="email"
                        class="form-control"
                        name="email"
                        value={formData.email || ""}
                        onChange={handleChangeValue}
                        placeholder="clarice@gmail.com"
                        pattern="^[a-z][a-z0-9_\.]{5,32}@[a-z0-9]{2,}(\.[a-z0-9]{2,4}){1,2}$"
                        required
                      />
                      <div class="invalid-feedback">
                        Please input valid email
                      </div>
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
                        pattern="((09|03|07|08|05|028|024)+([0-9]{8})\b)"
                        required
                        placeholder="0903321332"
                        // aria-describedby="passwordHelpInline"
                      />
                      <div class="invalid-feedback">
                        Please input valid phone number
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mb-3 mt-3">
                  <label for="inputEmail" class="col-form-label">
                    Address
                  </label>{" "}
                  <input
                    type="text"
                    name="address"
                    class="form-control"
                    value={formData.address || ""}
                    onChange={handleChangeValue}
                    placeholder="Your address"
                    required
                  />
                  <div className="invalid-feedback">
                    Please input valid address
                  </div>
                </div>
                {/* Note  */}
              </form>
              <div class="mb-3 mt-3">
                <label for="description" class="form-label">
                  Description (optional)
                </label>
                <textarea
                  class="form-control"
                  name="description"
                  rows="2"
                  value={formData.description || ""}
                  onChange={handleChangeValue}
                  placeholder="Type your description..."
                ></textarea>
              </div>
            </li>
            {/* <li class="list-group-item">A second item</li>
            <li class="list-group-item">A third item</li> */}
          </ul>
        </div>
      </div>
    </div>
  );
}
