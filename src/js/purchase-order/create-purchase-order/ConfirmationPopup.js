import React from 'react'
import './confirmation-popup.css'
import { useDispatch } from 'react-redux'
export default function ConfirmationPopup(props) {
    const dispatch = useDispatch()

    return (
        <div class="modal modal-true" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered .modal-dialog-true" role="document">
                <div class="modal-content modal-content-show .model-content-true">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalCenterTitle">Modal title</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        Update Sucess Full
                    </div>
                    <div class="modal-footer modal-footer-error-true">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal" >Next</button>

                    </div>
                </div>
            </div>
        </div>
    )

    return null


}