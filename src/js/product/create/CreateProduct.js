import React, { useState, useEffect, useReducer, useRef } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Modal } from "bootstrap";
import Swal from "sweetalert2";
//css
import "../product.css";

//components
import NavigationBar from "../../components/navbar/navbar-component";
import BrandSelectModal from "../components/brand-component";
import { createProduct } from "./action";
export default function CreateProductComponent(props) {
  let history = useHistory();
  let dispatch = useDispatch();
  //@params:formData declare data
  // const [formData, setFormData] = props.formData;
  //todos: declare to get all Brand and category
  // const [categorySelected, setCategorySelected] = useState({
  //   id: "",
  //   name: "",
  // });
  const [selectedBrand, setSelectedBrand] = useState({
    id: "",
    brandName: "",
    brandDescription: "",
  });
  //todo: declare Ref
  const modalRef = useRef();
  const showModal = () => {
    const modalEle = modalRef.current;
    const bsModal = new Modal(modalEle, {
      backdrop: "static",
      keyboard: false,
    });
    bsModal.show();
  };
  const hideModal = () => {
    const modalEle = modalRef.current;
    const bsModal = Modal.getInstance(modalEle);
    bsModal.hide();
  };
  //todo: declare navigation bar
  const listButtons = setListButtonNav();
  function setListButtonNav() {
    if (!props.isSelectVariantType)
      return [
        {
          isShow: true,
          title: "Save",
          action: (e) => onClickSave(e),
          class: "btn-primary",
          form: "productDetailsForm",
          type: "submit",
        },
      ];
    else
      return [
        {
          isShow: true,
          title: "Continue",
          action: (e) => onClickContinue(e),
          class: "btn-warning text-white",
          form: "productDetailsForm",
          type: "submit",
        },
      ];
  }
  //todo: function
  const handleChangeValueFormData = (event) => {
    event.preventDefault();

    // setFormData({
    //   name: event.target.name,
    //   value: event.target.value,
    // });
    props.setFormDataManager(event.target.name, event.target.value);
  };

  const handleChangeCategory = (e) => {
    const index = e.target.selectedIndex;
    const el = e.target.childNodes[index];
    props.setFormDataManager("categoryId", el.getAttribute("id"));
    props.setFormDataManager("categoryName", el.getAttribute("value"));
    // setCategorySelected({
    //   id: el.getAttribute("id"),
    //   name: el.getAttribute("value"),
    // });
    // setFormData({
    //   name: "categoryId",
    //   value: el.getAttribute("id"),
    // });
    // setFormData({
    //   name: "categoryName",
    //   value: el.getAttribute("value"),
    // });
  };

  const onClickContinue = (event) => {
    event.preventDefault();
    const form = document.getElementById("productDetailsForm");
    if (!form.checkValidity()) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      event.preventDefault();
      props.nextStep();
      console.log(props.formData);
    }
    form.classList.add("was-validated");
  };

  //todo:declare brand modal
  function handleOnSelectLocation(row, isSelect) {
    if (isSelect) {
      setSelectedBrand({
        id: row.id,
        brandName: row.brandName,
        brandDescription: row.brandDescription,
      });
    }
  }
  function onSelectLocationClick() {
    hideModal();
    props.setFormDataManager("brand", selectedBrand.brandName);
    // setFormData({
    //   name: "brand",
    //   value: selectedBrand.brandName,
    // });
  }
  function goBackClick() {
    history.goBack();
  }

  // function checkUndifined() {

  // }

  const onClickSave = (event) => {
    event.preventDefault();
    const form = document.getElementById("productDetailsForm");
    if (!form.checkValidity()) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      event.preventDefault();
      // checkUndifined();

      // if (props.formData.sku === undefined) {
      //   props.setFormDataManager("sku", "");
      // }
      // if (props.formData.barcode === undefined)
      //   props.setFormDataManager("barcode", "");

      const data = {
        name: props.formData.name,
        brandName: props.formData.brand,
        brandDescription: "",
        unit: props.formData.unit,
        categoryId: props.formData.categoryId,
        isVariantType: false,
        productVariants: [
          {
            name: props.formData.name,
            price: 0,
            salePrice: 0,
            // barcode: props.formData.barcode,
            sku: props.formData.sku,
          },
        ],
      };
      console.log("Data output:", data);
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
          dispatch(createProduct({ data: data, token: props.token }));
        }
      });
    }
    form.classList.add("was-validated");

    // console.log("DATA:", data);
    // console.log("UNIT:", formData.unit);
    // console.log(JSON.stringify(data));

    // console.log(formData);
  };
  return (
    <div>
      <NavigationBar
        listButton={listButtons}
        titleBar="Create product"
        actionGoBack={goBackClick}
        status=""
        home="Product"
        currentPage="Create product"
      />
      <div className="wrapper">
        {/* content 1 */}
        <div class="card">
          <h5 class="card-header">Product Information</h5>
          <div class="card-body">
            <form
              id="productDetailsForm"
              class="row g-3 needs-validation "
              noValidate
            >
              <div className="mb-3">
                <div className="row g-3 align-items-center">
                  <div className="col">
                    <label for="name" className="col-form-label">
                      Product Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      className="form-control"
                      placeholder="Shirt, t-shirts, etc."
                      name="name"
                      value={props.formData.name || ""}
                      onChange={handleChangeValueFormData}
                      required
                    />
                    <div class="invalid-feedback">
                      Please choose a product name
                    </div>
                  </div>
                </div>
              </div>

              <div className="mb-3">
                <div className="row g-3 align-items-center">
                  <div class="col">
                    <label for="category" class="col-form-label">
                      Category
                    </label>{" "}
                    <select
                      name="category"
                      class="form-select"
                      aria-label="Default select"
                      defaultValue={props.formData.categoryName || ""}
                      onChange={handleChangeCategory}
                      required
                    >
                      <option value="" disabled>
                        Select category
                      </option>

                      {props.listCategories.map((category) => (
                        <option
                          key={category.id}
                          id={category.id}
                          value={category.categoryName}
                        >
                          {category.categoryName}
                        </option>
                      ))}
                    </select>
                    <div class="invalid-feedback">Please select a category</div>
                  </div>
                  <div class="col-auto">
                    <label for="brand" class="col-form-label">
                      Brand
                    </label>{" "}
                    <div className="input-group has-validation">
                      <input
                        name="brand"
                        type="text"
                        id="brand"
                        className="form-control"
                        value={props.formData.brand || ""}
                        onChange={handleChangeValueFormData}
                        placeholder="eg. Nike"
                        required
                      />
                      <button
                        className="btn btn-outline-secondary"
                        type="button"
                        id="button-addon2"
                        onClick={showModal}
                      >
                        Search more
                      </button>
                      <div className="invalid-feedback">
                        Please select a brand
                      </div>
                    </div>
                  </div>
                  <div className="col-auto">
                    <label for="unit" class="col-form-label">
                      Unit
                    </label>
                    <input
                      name="unit"
                      type="text"
                      id="unit"
                      className="form-control"
                      value={props.formData.unit || ""}
                      onChange={handleChangeValueFormData}
                      required
                    />
                    <div className="invalid-feedback">Please choose a unit</div>
                  </div>
                </div>
              </div>
            </form>
            {!props.isSelectVariantType && (
              <div class="mb-3">
                <div class="row g-3 align-items-center">
                  <div class="col">
                    <label for="sku" class="col-form-label">
                      SKU (optional)
                    </label>
                    <input
                      type="text"
                      class="form-control"
                      placeholder="eg. 312456962"
                      name="sku"
                      value={props.formData.sku || ""}
                      onChange={handleChangeValueFormData}
                    />
                  </div>
                  {/* <div class="col">
                    <label for="barcode" class="col-form-label">
                      Barcode (optional)
                    </label>{" "}
                    <input
                      name="barcode"
                      value={props.formData.barcode || ""}
                      onChange={handleChangeValueFormData}
                      type="text"
                      id="barcode"
                      class="form-control"
                      placeholder="eg. 1012345678910"
                    />
                  </div> */}
                </div>
              </div>
            )}

            <div className="mb-3">
              <div className="mb-3 form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="variants"
                  defaultChecked={props.isSelectVariantType}
                  onClick={props.onChangeVariantType}
                />
                <label className="form-check-label" for="variants">
                  Products has many attributes.
                </label>
                <div id="checkBoxHelp" className="form-text">
                  Product variants are used to manage products having different
                  variants like size, color,...
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <BrandSelectModal
        modalRef={modalRef}
        hideModal={hideModal}
        listBrand={props.listBrands}
        onSelectLocationClick={onSelectLocationClick}
        handleOnSelect={handleOnSelectLocation}
      />
    </div>
  );
}
