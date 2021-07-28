import React from 'react'
import './toast-message.css'
export default function ToastMessage() {
    return (
        <div class="modal " style={{display:'block'}} id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered  toast-customize-dialog" role="document">
            <div class="modal-content toast-container ">
              
                <div class="toast-message-body ">
                <i class='bx bx-check-circle'></i>
                <p>Success</p>
                </div>

                <div class="toast-message-body loading-animation">
                <i class='bx bx-loader-alt' ></i>
                <p>Loading</p>
                </div>

                <div class="toast-message-body ">
                <i class='bx bx-x-circle'></i>
                <p>Fail</p>
                </div>
              
            </div>
        </div>
    </div>

    )
}