import React, { useEffect, useReducer } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import Swal from "sweetalert2";
//css
import "../product.css";
//components
import { updateVariantAction } from "./action";
import { RESET } from "./constants";
import NavigationBar from "../../components/navbar/navbar-component";
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

  const [formData, setFormData] = useReducer(formReducer, {
    sku: "",
  });

  const { token, updateVariantReducer } = useSelector((state) => ({
    token: state.client.token,
    updateVariantReducer: state.updateVariantReducer,
    // messages: state.getDetailsProductReducer.messages,
  }));

  const handleChangeValue = (event) => {
    event.preventDefault();

    setFormData({
      name: event.target.name,
      value: event.target.value,
    });
  };

  //todo: list nav button
  const listButton = setListButtonNav();
  function setListButtonNav() {
    return [
      {
        isShow: true,
        title: "Save",
        action: (e) => onClickSave(e),
        class: "btn-primary",
        form: "variantForm",
        type: "submit",
      },
    ];
  }

  function goBackClick() {
    history.goBack();
  }

  function onClickSave(event) {
    event.preventDefault();
    const form = document.getElementById("variantForm");
    if (!form.checkValidity()) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      event.preventDefault();
      const data = {
        productId: location.state.productId,
        // isVariantType: location.state.variantType,
        isVariantType: true,
        productVariantsUpdate: [
          {
            id: null,
            name: formData.name,
            price: 0,
            // barcode: formData.barcode,
            sku: formData.sku,
            // unit: location.state.productUnit,
          },
        ],
      };
      console.log(data);
      dispatch(updateVariantAction({ token: token, data: data }));
    }

    form.classList.add("was-validated");
  }

  //todo:function nav

  useEffect(() => {
    return () => {
      dispatch({ type: RESET });
    };
  }, []);
  useEffect(() => {
    if (updateVariantReducer.requesting) {
      Swal.fire({
        title: "Progressing",
        html: "Waiting...",
        timerProgressBar: true,
        didOpen: () => {
          Swal.showLoading();
        },
      });
    } else if (updateVariantReducer.successful) {
      if (updateVariantReducer.errors) {
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
            history.push("/homepage/product/details", {
              productId: location.state.productId,
              // fromPage: "ManagerPage",
            });
        });
    } else if (updateVariantReducer.errors) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Something went wrong!",
      });
    }
  }, [updateVariantReducer]);
  return (
    <>
      <NavigationBar
        listButton={listButton}
        titleBar="Add Variant"
        actionGoBack={goBackClick}
        status=""
        home="Product"
        currentPage="Product details"
        level3={true}
        level3Page="Add variant"
      />
      {/* content */}
      <div className="wrapper">
        <div class="card">
          <h5 class="card-header fw-bold">Variant Information</h5>
          <div class="card-body">
            <div class="mb-3">
              <div class="row g-3 align-items-center">
                <form
                  id="variantForm"
                  class="row g-3 needs-validation "
                  noValidate
                >
                  <div class="col">
                    <label for="name" class="col-form-label">
                      Variant Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      class="form-control"
                      placeholder="Write product name here"
                      name="name"
                      value={formData.name || ""}
                      onChange={handleChangeValue}
                      required
                    />
                    <div class="invalid-feedback">Please input valid name</div>
                  </div>
                </form>
                {/* <div class="col">
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
                      required
                    />
                    <div class="invalid-feedback">Please input valid price</div>
                  </div> */}

                <div class="col">
                  <label for="name" class="col-form-label">
                    SKU (optional)
                  </label>
                  <input
                    type="text"
                    id="name"
                    class="form-control"
                    name="sku"
                    value={formData.sku || ""}
                    onChange={handleChangeValue}
                  />
                </div>
                {/* <div class="col">
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
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
