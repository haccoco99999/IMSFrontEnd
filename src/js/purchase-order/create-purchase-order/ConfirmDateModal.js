import React from 'react'
import './confirm-date-modal.css'
export default function ConfirmDateModal(props) {
    if(props.isConfirm){
    return (
        
        <div class="modal model-confirm-date" id="exampleModalCenter" tabindex="-1" aria-labelledby="exampleModalCenterTitle" aria-modal="true" role="dialog">
            <div class="modal-dialog modal-dialog-centered modal-dialog-confirm-date">
                <div class="modal-content modal-content-confirm-date">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalCenterTitle">Confirm</h5>
                        <button type="button" onClick={()=>props.cancelConfirmClick()} class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="col">
                            <label for="role" class="col-form-label">
                                Delivery Date
                            </label>
                            <input type="date" id="fromTime" class="form-control" /> </div>

                        <div class="mb-3">
                            <label for="exampleFormControlTextarea1" class="form-label">Note</label>
                            <textarea class="form-control" id="exampleFormControlTextarea1" rows="5"></textarea>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button"  onClick={()=>props.cancelConfirmClick()} class="btn btn-secondary btn-cancel-preview" data-bs-dismiss="modal">Cancel</button>
                        <button type="button"  onClick={()=>props.confirmClick()}  class="btn btn-primary">Confirm to send mail</button>
                    </div>
                </div>
            </div>
        </div>)
    }
    return null
}