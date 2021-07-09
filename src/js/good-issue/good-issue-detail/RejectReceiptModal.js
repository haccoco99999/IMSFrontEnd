import React from 'react'
import "./RejectReceiptModal.css"
export default function RejectReceiptModal(props){
    if(props.isReject){
    return (
        <div>
        <div className="modal  modal-reject-receipt"   >
          <div className="modal-dialog " >
            <div className="modal-content ">
              <div className="modal-header">
                <h5 className="modal-title">Reject</h5>
                <button
                 
                  className="btn-close"
                    onClick={() => props.clickToClose(null)}
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <div class="form-group">
                  <label for="">Description</label>
                  <textarea class="form-control" name="" id="" rows="5"></textarea>
                </div>


              </div>
              <div className="modal-footer">
                <button
                 onClick={() => props.clickToClose(null)}
                  type="button"
                  className="btn btn-default">
                  Cancel
                </button>
                <button
                  type="button"
             
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
    else{
        return ""
    }
}