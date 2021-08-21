import React, { useState } from 'react'
import "./RejectReceiptModal.css"
export default function RejectReceiptModal(props){
 
      const [cancelReason, setCancelReason] = useState("")
      function onChangeValueCancelReason(event){
        setCancelReason(
          event.target.value
        )
      }
    return (
        <div>
        <div className="modal  modal-reject-receipt"   >
          <div className="modal-dialog " >
            <div className="modal-content ">
              <div className="modal-header">
                <h5 className="modal-title">Reject</h5>
                <button
                 
                  className="btn-close"
                    onClick={() => props.clickToCLoseReject(undefined)}
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <div class="form-group">
                  <label for="">Description</label>
                  <textarea value={props.cancelReason} onChange={onChangeValueCancelReason} class="form-control" name="cancelReason" id="" rows="5"></textarea>
                </div>


              </div>
              <div className="modal-footer">
                <button
                 onClick={() => props.clickToCLoseReject(undefined)}
                  type="button"
                  className="btn btn-default">
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => props.clickToCLoseReject(cancelReason)}
                  className="btn btn-default text-white button-save--modal " >
                  Done
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
 
}