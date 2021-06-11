import React from "react";

import "./stocktake.css";

export default function AddMultipleModal() {
  return (
    <div>
      <div
        className="modal "
        tabIndex="-1"
        id="AddMultipleModal"
        data-bs-keyboard="false"
        data-bs-backdrop="static"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Add Multiple </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              {/* todo:Check 1 */}
              <div class="form-check ">
                <input
                  class="form-check-input "
                  type="checkbox"
                  value=""
                  id="flexCheckDefault"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapsediv1"
                />
                <label class="form-check-label  btn-toggle" for="flexCheckDefault">
                  Dell Ultrasharp
                </label>
              </div>
              <div id="collapsediv1" class="collapse">
                <div class="d-flex justify-content-center">
                  <div class="form-check d-inline">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      value=""
                      id="test1"
                    />
                    <label class="form-check-label" for="test1">
                      View product
                    </label>
                  </div>

                  <div class="form-check d-inline">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      value=""
                      id="test2"
                    />
                    <label class="form-check-label" for="flexCheckDefatest2ult">
                      Create new product
                    </label>
                  </div>
                  <div class="form-check d-inline">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      value=""
                      id="test2"
                    />
                    <label class="form-check-label" for="flexCheckDefatest2ult">
                      Update product
                    </label>
                  </div>
                </div>

                <div class="d-flex justify-content-center">
                  <div class="form-check d-inline">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      value=""
                      id="test1"
                    />
                    <label class="form-check-label" for="test1">
                      Delete product
                    </label>
                  </div>

                  <div class="form-check d-inline">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      value=""
                      id="test2"
                    />
                    <label class="form-check-label" for="flexCheckDefatest2ult">
                      Print product
                    </label>
                  </div>

                  {/*empty*/}
                  <div class=" d-inline"></div>
                </div>
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
                className="btn btn-default button-save--modal text-white"
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
