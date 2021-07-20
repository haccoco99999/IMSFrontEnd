import React, { useState, useEffect, useReducer, useRef } from "react";
import Swal from "sweetalert2";
//css
import "../product.css";
//components
import NavigationBar from "../../components/navbar/navbar-component";

export default function CreateNewProduct2() {
  const formRef = useRef();
  const [isValidated, setIsValidated] = useState(false);
  const formReducer = (state, event) => {
    return {
      ...state,
      [event.name]: event.value,
    };
  };
  const [formData, setFormData] = useReducer(formReducer, {});
  //todo:
  const listButton = setListButtonNav();
  function setListButtonNav() {
    return [
      {
        isShow: true,
        title: "Continue",
        action: (e) => onClickContinue(e),
        class: "btn-warning text-white",
        form: "myForm",
        type: "submit",
      },
    ];
  }
  const onClickContinue = (event) => {
    event.preventDefault();
    const f = document.getElementById("myForm");
    if (!f.checkValidity()) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      event.preventDefault();
      setIsValidated(true);
    }
    f.classList.add("was-validated");
  };

  return (
    <div>
      <NavigationBar
        listButton={listButton}
        titleBar="Create"
        // actionGoBack={goBackClick}
        status=""
      />
      <div className="wrapper space-top">
        <div className="wrapper-content shadow mt-3">
          <form
            id="myForm"
            class="row g-3 needs-validation form-floating"
            noValidate
            // onSubmit={handleSubmit}

            // ref={formRef}
          >
            <div class="col-md-3">
              <label for="validationCustom05" class="form-label">
                Zip
              </label>
              <input
                type="text"
                class="form-control"
                id="validationCustom05"
                required
              />
              <div class="invalid-feedback">Please provide a valid zip.</div>
            </div>
            <div class="col-12">
              <div class="form-check">
                <input
                  class="form-check-input"
                  type="checkbox"
                  value=""
                  id="invalidCheck"
                  required
                />
                <label class="form-check-label" for="invalidCheck">
                  Agree to terms and conditions
                </label>
                <div class="invalid-feedback">
                  You must agree before submitting.
                </div>
              </div>
            </div>
            {/* <div class="col-12">
              <button class="btn btn-primary" type="submit">
                Submit form
              </button>
            </div> */}
          </form>
        </div>
      </div>

      <div class="card">
        <div class="card-header">Featured</div>
        <div class="card-body">
          <h5 class="card-title">Special title treatment</h5>
          <p class="card-text">
            With supporting text below as a natural lead-in to additional
            content.
          </p>
          <a href="#" class="btn btn-primary">
            Go somewhere
          </a>
        </div>
      </div>
    </div>
  );
}
