import React from "react";
import { useHistory } from "react-router-dom";

//css
import "../supplier.css";

export default function () {
  let history = useHistory();

  function goBackClick() {
    history.goBack();
  }
  return (
    <div className=" home_content overflow-scroll">
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
              <input type="text" class="form-control" id="search" />
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
                    //aria-describedby="passwordHelpInline"
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
                    // aria-describedby="passwordHelpInline"
                  />
                </div>
              </div>
            </div>

            {/* Note  */}
            <div class="mb-3 mt-3">
              <label for="note" class="form-label">
                Note
              </label>
              <textarea class="form-control" id="note" rows="3"></textarea>
            </div>
          </form>
        </div>

        {/* content field 2  */}
        <div className="wrapper-content mt-3 shadow">
          <div className="title-heading mt-2">
            <span>Address</span>
          </div>
          <form>
            <div class="row g-3 align-items-center">
              <div class="col">
                <label for="inputEmail" class="col-form-label">
                  City
                </label>{" "}
                <select class="form-select" aria-label="Default select example">
                  <option selected disabled>
                    Select Role
                  </option>
                  <option value="1">One</option>
                  <option value="2">Two</option>
                  <option value="3">Three</option>
                </select>
              </div>
              <div class="col">
                <label for="inputphoneno" class="col-form-label">
                  District
                </label>{" "}
                <select class="form-select" aria-label="Default select example">
                  <option selected disabled>
                    Select Role
                  </option>
                  <option value="1">One</option>
                  <option value="2">Two</option>
                  <option value="3">Three</option>
                </select>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
