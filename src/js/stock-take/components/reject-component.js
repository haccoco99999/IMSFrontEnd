import React, { useState } from "react";

import "../stocktake.css";

export default function RejectModal(props) {
  const [reason, setReason] = useState("");
  function onCancelClick() {
    setReason("");
    props.hideModal();
  }
  function onClickConfirm() {
    console.log(reason);
    props.onRejectClick(reason);
  }
  return (
    <div>
      <div
        className="modal fade"
        tabIndex="-1"
        id="RejectModal"
        data-bs-keyboard="false"
        data-bs-backdrop="static"
        ref={props.modalRef}
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title fw-bold">Reject </h5>
              <button
                type="button"
                className="btn-close"
                onClick={props.hideModal}
                // data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form>
                <div class="mb-3">
                  <label for="exampleFormControlTextarea1" >
                    Reason
                  </label>
                  <textarea
                    class="form-control"
                    id="exampleFormControlTextarea1"
                    rows="3"
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                  ></textarea>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-default"
                // data-bs-dismiss="modal"
                onClick={onCancelClick}
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn btn-default button-save--modal text-white"
                onClick={onClickConfirm}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
