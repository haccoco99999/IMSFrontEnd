import React from "react";
import "./fillter.css";

export default function FilterModal() {
  return (
    <div>
      <div
        className="modal"
        tabIndex="-1"
        id="FilterModal"
        data-bs-keyboard="false"
        data-bs-backdrop="static"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Filter</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form>

                {/* select option */}
                <div class="mb-3">
                  <label for="role" class="col-form-label">
                    Select your options
                  </label>

                  <select
                    class="form-select"
                    aria-label="Default select example"
                  >
                    <option selected>- No. Selected -</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                  </select>
                </div>

                {/* select supplier name  */}
                <div class="mb-3">
                  <label for="role" class="col-form-label">
                    Supplier Name
                  </label>

                  <select
                    class="form-select"
                    aria-label="Default select example"
                  >
                    <option selected>- No. Selected -</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                  </select>
                </div>

                {/* create date  */}
                <div>
                  <div class="mb-3">
                    {/* <label for="address" class="col-form-label">
                    Create Date
                  </label>
                  <input type="date" class="form-control" id="address" /> */}
                  </div>
                  <div class="row g-3 align-items-center">
                    <label for="role" class="col-form-label">
                      Create Date
                    </label>
                    <div class="col">
                      {/* <label for="inputEmail" class="col-form-label">
                    
                  </label>{" "} */}
                      <input
                        type="date"
                        id="fromTime"
                        class="form-control"
                        //aria-describedby="passwordHelpInline"
                      />
                    </div>
                    <div class="col">
                      {/* <label for="inputphoneno" class="col-form-label">
                    Phone No.
                  </label>{" "} */}
                      <input
                        type="date"
                        id="toTime"
                        class="form-control"
                        // aria-describedby="passwordHelpInline"
                      />
                    </div>
                  </div>
                </div>
                {/* phone no  */}
                <div class="mb-3">
                  <label for="role" class="col-form-label">
                    Supplier Phone No.
                  </label>

                  <select
                    class="form-select"
                    aria-label="Default select example"
                  >
                    <option selected>- No. Selected -</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                  </select>
                </div>

                {/* email */}
                <div class="mb-3">
                  <label for="role" class="col-form-label">
                    Supplier Email
                  </label>

                  <select
                    class="form-select"
                    aria-label="Default select example"
                  >
                    <option selected>- No. Selected -</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                  </select>
                </div>

                {/* id  */}
                <div class="mb-3">
                  <label for="role" class="col-form-label">
                    Supplier ID
                  </label>

                  <select
                    class="form-select"
                    aria-label="Default select example"
                  >
                    <option selected>- No. Selected -</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                  </select>
                </div>
                {/* add  */}
                <a
              class="btn btn-default me-md-2 add"
              // data-bs-target="#"
              // data-bs-toggle="modal"
            >
              {/* <AddAccountModal isShowing={isShowing} hide={toggle} /> */}
              <svg
                class="svg-icon"
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="#4caf50"
                class="bi bi-plus-lg"
                viewBox="0 0 20 20"
              >
                <path d="M8 0a1 1 0 0 1 1 1v6h6a1 1 0 1 1 0 2H9v6a1 1 0 1 1-2 0V9H1a1 1 0 0 1 0-2h6V1a1 1 0 0 1 1-1z"></path>
              </svg>
               Add
            </a>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-default"
                data-bs-dismiss="modal"
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn btn-default addaccountmodal-done "
              >
                Done
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
