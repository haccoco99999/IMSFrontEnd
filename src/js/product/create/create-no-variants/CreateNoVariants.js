import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";

//css
import "../../product.css";

//components
import { createProduct } from "../action";
import NavigationBar from "../../../components/navbar/navbar-component";

// const formReducer = (state, event) => {
//   return {
//     ...state,
//     [event.name]: event.value,
//   };
// };

export default function CreateNoVariants(props) {
  let history = useHistory();
  // let dispatch = useDispatch();
  // let location = useLocation();

  // const [formData, setFormData] = useReducer(props.formReducer, {});

  // const dataLastPage = location.state.formData;
  // const selectedCategory = location.state.categorySelected;

  // const { messages } = useSelector((state) => ({
  //   messages: state.createProductReducer.messages,
  // }));

  const handleChangeValueFormData = (event) => {
    event.preventDefault();

    // setFormData({
    //   name: event.target.name,
    //   value: event.target.value,
    // });
    props.setFormDataManager(event.target.name, event.target.value);
  };

  function goBackClick() {
    // history.goBack();
    props.prevStep();
  }

  const onClickSave = (event) => {
    event.preventDefault();
    const form = document.getElementById("productDetailsForm");
    if (!form.checkValidity()) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      event.preventDefault();
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
            price: props.formData.price,
            salePrice: props.formData.saleprice,
            barcode: props.formData.barcode,
            sku: props.formData.sku,
          },
        ],
      };
      console.log("Data output:", data);
      // dispatch(createProduct({ data: data, token: token }));
    }
    form.classList.add("was-validated");

    // console.log("DATA:", data);
    // console.log("UNIT:", formData.unit);
    // console.log(JSON.stringify(data));

    // console.log(formData);
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
        form: "productDetailsForm",
        type: "submit",
      },
    ];
  }

  useEffect(() => {
    if (props.messages !== "")
      history.push("/homepage/product/details", {
        productId: props.messages,
      });
  }, [props.messages]);
  //   todo: gop chung 2 bang , sau do tach ra
  return (
    <div>
      <NavigationBar
        listButton={listButton}
        titleBar="No Variant"
        actionGoBack={goBackClick}
        status=""
      />
      {/* content */}

      <div className="wrapper space-top">
        {/* show product details */}

        <div class="card">
          <h5 class="card-header">Product Information</h5>
          <div class="card-body">
            <form
              id="productDetailsForm"
              class="row g-3 needs-validation "
              noValidate
            >
              <div class="mb-3">
                <div class="row g-3 align-items-center">
                  <div class="col">
                    <label for="sku" class="col-form-label">
                      SKU (optional)
                    </label>{" "}
                    <input
                      type="text"
                      class="form-control"
                      placeholder="eg. 312456962"
                      name="sku"
                      value={props.formData.sku || ""}
                      onChange={handleChangeValueFormData}
                    />
                  </div>
                  <div class="col">
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
                  </div>
                </div>
              </div>

              <div class="mb-3">
                <div class="row g-3 align-items-center">
                  <div class="col">
                    <label for="price" class="col-form-label">
                      Price
                    </label>
                    <div className="input-group has-validation">
                      <input
                        name="price"
                        value={props.formData.price || ""}
                        onChange={handleChangeValueFormData}
                        type="number"
                        class="form-control"
                        required
                      />
                      <span class="input-group-text">VND</span>
                      <div class="invalid-feedback">
                        Please input valid price
                      </div>
                    </div>
                  </div>
                  <div class="col">
                    <label for="saleprice" class="col-form-label">
                      Sale Price
                    </label>
                    <div className="input-group has-validation">
                      <input
                        name="saleprice"
                        value={props.formData.saleprice || ""}
                        onChange={handleChangeValueFormData}
                        type="number"
                        class="form-control"
                        required
                      />
                      <span class="input-group-text">VND</span>
                      <div class="invalid-feedback">
                        Please input valid sale price
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>

        {/* <h2 className="id-color fw-bold mb-3">{dataLastPage.name}</h2>
        <div class="d-flex justify-content-around  mb-3">
          <div>
            <h5>Product ID</h5>
            <h5 className="id-color">282170181</h5>
          </div>
          <div>
            <h5>Category</h5>
            <h5 className="id-color">{selectedCategory.name}</h5>
          </div>
          <div>
            <h5>Brand</h5>
            <h5 className="id-color">{dataLastPage.brand}</h5>
          </div>
        </div>

        content 

        <div className="wrapper-content shadow">
          
        </div> */}
      </div>
    </div>
  );
}
