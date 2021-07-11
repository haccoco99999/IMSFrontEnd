import React from 'react'
import './preview-quote-request.css'
// import {clickToPrevewPriceQuote, clickToSendMailPriceQuote} from '../action'
import {useDispatch} from 'react-redux'
import htmlToDraft from 'html-to-draftjs';

import draftToMarkdown from 'draftjs-to-markdown';
import { convertToRaw } from 'draft-js';
export default function PreviewSendMail (props) {

    // console.log(props.editorState)
    // const contentBlock = htmlToDraft(props.mailDescription)
        if(props.statusSendMail){
            console.log(props.editorState)
        return (
            <div class="modal modal-preview-quote-request" id="exampleModalCenter" tabindex="-1" aria-labelledby="exampleModalCenterTitle" aria-modal="true" role="dialog">
                <div class="modal-dialog modal-dialog-centered modal-dialog-preview-quote-request">
                    <div class="modal-content modal-content-preview-quote-request">
                        <div class="modal-header">
                            <h5 class="modal-title"  id="exampleModalCenterTitle">Preview</h5>
                            <button type="button" onClick={()=>props.clostPreviewSendMail(false)} class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                           <textarea className="design-textarea" disabled value= { props.editorState? (props.editorState && draftToMarkdown(convertToRaw(props.editorState.getCurrentContent()))): ""} />
                            {/* {htmlToDraft(props.mailDescription)} */}
                        </div>
                        <div class="modal-footer">
                            <button type="button" onClick={()=>props.clostPreviewSendMail(false)}  class="btn btn-secondary btn-cancel-preview" data-bs-dismiss="modal">Cancel</button>
                            <button type="button"   onClick={()=>props.clostPreviewSendMail(true)}  class="btn btn-primary">Send email to vendor</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
    else{
        return "";
    }
    
}
