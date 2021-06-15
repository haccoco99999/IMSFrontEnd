import React, { Component } from "react";

function FilterModal() {
  return (
    <>
      <div
        className="modal"
        tabIndex="-1"
        id="AddFilterModal"
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
            <div className="modal-body addaccountmodal-body">
              <div>
                <button
                  class="btn btn-toggle align-items-center rounded collapsed"
                  data-bs-toggle="collapse"
                  data-bs-target="#account-collapse"
                  aria-expanded="false"
                >
                  Account
                </button>
                <div class="collapse" id="account-collapse">
                  <div class="form-check">
                    <input
                      class="form-check-input "
                      type="radio"
                      name="AccountRadioBtn"
                      id="AccountRadioBtn1"
                    />
                    <label class="form-check-label" for="AccountRadioBtn1">
                      Active
                    </label>
                  </div>
                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="radio"
                      name="AccountRadioBtn"
                      id="AccountRadioBtn2"
                    />
                    <label class="form-check-label" for="AccountRadioBtn2">
                      Deactive
                    </label>
                  </div>
                </div>
              </div>

              <div>
                <button
                  class="btn btn-toggle align-items-center rounded collapsed"
                  data-bs-toggle="collapse"
                  data-bs-target="#role-collapse"
                  aria-expanded="false"
                >
                  Role
                </button>
                <div className="collapse" id="role-collapse">
                  <div class="form-check">
                    <input
                      class="form-check-input "
                      type="radio"
                      name="RoleRadioBtn"
                      id="RoleRadioBtn1"
                    />
                    <label class="form-check-label" for="RoleRadioBtn1">
                      Accountant
                    </label>
                  </div>
                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="radio"
                      name="RoleRadioBtn"
                      id="RoleRadioBtn2"
                    />
                    <label class="form-check-label" for="RoleRadioBtn2">
                      Stockkeeper
                    </label>
                  </div>
                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="radio"
                      name="RoleRadioBtn"
                      id="RoleRadioBtn3"
                    />
                    <label class="form-check-label" for="RoleRadioBtn3">
                      Salesman
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <div className="modal-footer d-flex mb-3">
              <a type="button" className="me-auto text-decoration-none">
                Reset Default
              </a>
              <button
                type="button"
                className="btn btn-default "
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
    </>
  );
}

export default FilterModal;
