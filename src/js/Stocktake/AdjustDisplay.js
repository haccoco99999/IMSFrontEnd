import React from "react";

import "./stocktake.css";

export default function AddjustDisplayTableModal() {
  return (
    <div>
      <div
        className="modal"
        tabIndex="-1"
        id="AddjustDisplayTableModal"
        data-bs-keyboard="false"
        data-bs-backdrop="static"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Adjust Display Table </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div class="form-check">
                <input
                  class="form-check-input"
                  type="checkbox"
                  value=""
                  id="checkSupplierID"
                />
                <label class="form-check-label" for="checkSupplierID">
                  Supplier ID
                </label>
              </div>
              <div class="form-check">
                <input
                  class="form-check-input"
                  type="checkbox"
                  value=""
                  id="checkSupplierName"
                />
                <label class="form-check-label" for="checkSupplierName">
                  Supplier Name
                </label>
              </div>
              <div class="form-check">
                <input
                  class="form-check-input"
                  type="checkbox"
                  value=""
                  id="checkEmail"
                />
                <label class="form-check-label" for="checkEmail">
                  Email
                </label>
              </div>
              <div class="form-check">
                <input
                  class="form-check-input"
                  type="checkbox"
                  value=""
                  id="checkCity"
                />
                <label class="form-check-label" for="checkCity">
                  City
                </label>
              </div>
              <div class="form-check">
                <input
                  class="form-check-input"
                  type="checkbox"
                  value=""
                  id="checkPhone"
                />
                <label class="form-check-label" for="checkPhone">
                  Phone No.
                </label>
              </div>
              <div class="form-check">
                <input
                  class="form-check-input"
                  type="checkbox"
                  value=""
                  id="checkCreatedBy"
                />
                <label class="form-check-label" for="checkCreatedBy">
                  Created By
                </label>
              </div>
              <div class="form-check">
                <input
                  class="form-check-input"
                  type="checkbox"
                  value=""
                  id="checkCreateDate"
                />
                <label class="form-check-label" for="checkCreateDate">
                  Create Date
                </label>
              </div>
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
