import React, { Component } from "react";

function AccountDetailsModal() {
  return (
    <>
      <div
        className="modal"
        tabIndex="-1"
        id="AccountDetailsModal"
        data-bs-keyboard="false"
        data-bs-backdrop="static"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Details</h5>
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
                  <input type="text" class="form-control" id="email-address"
                   value="Tammmmse130115@fpt.vn"
                  />
                </div>
                <div class="mb-3">
                  <label for="full-name" class="col-form-label">
                    Full Name
                  </label>
                  <input type="text" class="form-control" id="full-name" 
                  value="Mao Nguyễn Minh Tâm"
                  />
                </div>
                <div class="mb-3">
                  <label for="phone-no" class="col-form-label">
                    Phone No
                  </label>
                  <input type="text" class="form-control" id="phone-no"
                  value="0909000002"
                  />
                </div>
                <div class="mb-3">
                  <label for="address" class="col-form-label">
                    Address
                  </label>
                  <input type="text" class="form-control" id="address" 
                  value="__"
                  />
                </div>
                <div class="mb-3">
                  <label for="role" class="col-form-label">
                    Role
                  </label>

                  <select
                    class="form-select"
                    aria-label="Default select example"
                  >

                    <option value="1">Accountant</option>
                    <option value="2">Stockkeeper</option>
                    <option value="3">Salesman</option>
                  </select>

                 <div class="mb-3">
                 <label for="status" class="col-form-label">
                    Status
                  </label>
                 <select
                    class="form-select"
                    aria-label="Default select example"
                    
                  >
  
                    <option class="table-acc-status-active" selected value="opt1">Active</option>
                    <option class="table-acc-status-deactive" value="opt2">Deactive</option>
                    <option  value="opt3">Block</option>
                  </select>
                 </div>
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
    </>
  );
}
export default AccountDetailsModal;
