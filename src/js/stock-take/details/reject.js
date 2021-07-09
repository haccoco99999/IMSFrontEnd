import React from "react";

import "../stocktake.css";

export default function RejectModal() {
  return (
    <div>
      <div
        className="modal"
        tabIndex="-1"
        id="RejectModal"
        data-bs-keyboard="false"
        data-bs-backdrop="static"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Reject </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form>
                <div class="mb-3">
                  <label for="exampleFormControlTextarea1" class="form-label">
                    Description
                  </label>
                  <textarea
                    class="form-control"
                    id="exampleFormControlTextarea1"
                    rows="3"
                  ></textarea>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-default"
                data-bs-dismiss="modal"
              >
                No
              </button>
              <button
                type="button"
                className="btn btn-default button-save--modal text-white"
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
