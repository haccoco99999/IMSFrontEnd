import React, { Component } from "react";
import ReactDOM from "react-dom";

function AddAccountModal() {
  return (
    <div>
      <div
        className="modal"
        tabIndex="-1"
        id="AddAccountModal"
        data-bs-keyboard="false"
        data-bs-backdrop="static"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Add New</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body addaccountmodal-body">
              <form>
                <div class="mb-3">
                  <label for="remail-address" class="col-form-label">
                    Email Address
                  </label>
                  <input type="text" class="form-control" id="email-address" />
                </div>
                <div class="mb-3">
                  <label for="full-name" class="col-form-label">
                    Full Name
                  </label>
                  <input type="text" class="form-control" id="full-name" />
                </div>
                <div class="mb-3">
                  <label for="phone-no" class="col-form-label">
                    Phone No
                  </label>
                  <input type="text" class="form-control" id="phone-no" />
                </div>
                <div class="mb-3">
                  <label for="address" class="col-form-label">
                    Address
                  </label>
                  <input type="text" class="form-control" id="address" />
                </div>
                <div class="mb-3">
                  <label for="role" class="col-form-label">
                    Role
                  </label>

                  <select
                    class="form-select"
                    aria-label="Default select example"
                  >
                    <option selected disabled>
                      Select Role
                    </option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                  </select>
                </div>
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

export default AddAccountModal;
