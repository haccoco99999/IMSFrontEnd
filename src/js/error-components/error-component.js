import React from 'react'
import './error-component.css'
import {useDispatch} from 'react-redux'
export default function ErrorMessages(props) {
    const dispatch = useDispatch()
   if(props.error != ""){
       return   (
        <div class="modal modal-error-true" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered modal-error-dialog-true" role="document">
                <div class="modal-content modal-content-show model-content-error-true">

                    <div class="modal-body">
                        {props.error}
                    </div>
                    <div class="modal-footer modal-footer-error-true">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal" onClick={() => dispatch({type: "CLEAER_UPDATE_PROFILE"})} >Close</button>

                    </div>
                </div>
            </div>
        </div>
    )
   }
   return null


}