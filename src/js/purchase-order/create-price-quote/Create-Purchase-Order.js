import React, { useEffect } from 'react';
import 'bootstrap/js/dist/carousel'
import './create-purchase-order.css'
import TextEditor from '../../text-editor-compoent/text-editor-compoent';
import 'bootstrap/js/dist/collapse'
import draftToHtml from 'draftjs-to-html';
import {  convertToRaw  } from 'draft-js';

import PreviewPriceQuote from './preview-quote-request';
import {clickToPrevewPriceQuote} from '../action'
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';

import sendMailPriceQuote from './action'
export function CreatePurchaseOrder(props) {
    let dispatch = useDispatch();
    let [editorState, setEditorState ] =useState();
    let {statusPreview, isSendMail} =useSelector(state => ({
        statusPreview: state.controlPurchaseQuotePage.isClickToPreviewPriceQuote,
        isSendMail:state.controlPurchaseQuotePage.isClickToSendMailPriceQuote,
    }
    ))

    let [state, setSate] = useState(useSelector(state => (
        state.detailPriceQuote.priceQuoteOrder
    )))
    
    useEffect(() => {
       if(isSendMail){
        const formData = new FormData();
        formData.append('PriceQuoteNumberGet',state.priceQuoteNumber)
        formData.append('To','hungppse130422@fpt.edu.vn')
        formData.append('Content', draftToHtml(convertToRaw(editorState.getCurrentContent()))  )
        formData.append('Subject','Gui MAil')
        console.log(formData)
          dispatch(sendMailPriceQuote({priceQuote: formData}))
       }

    },[isSendMail])
    const minus = (quantity, index) => {
        state.purchaseOrderProduct[index].orderQuantity = quantity-1
        console.log(state.purchaseOrderProduct[index].orderQuantity )
        setSate(
           { ...state}
        )
    }
    const plus = (quantity, index) =>{
        state.purchaseOrderProduct[index].orderQuantity = quantity+1
        console.log(state.purchaseOrderProduct[index].orderQuantity )
        setSate(
           { ...state}
        )
    }
    const changeMailContent = (contentMail) =>{
        
        // state.mailDescription = contentMail
        // setSate(
        //     { ...state}
        //  )
       
        setEditorState(contentMail)
        console.log(editorState)
       
    }
    const clickToSendMail= () =>{
        dispatch(clickToPrevewPriceQuote());
    }
    

    return (
        <div>

            <div className="menu-back-create-purchase-order"><h4>Back</h4></div>
            <div className="name-oder-edit" >
                <button onClick={clickToSendMail} type="button" name="" id="" class="btn btn-primary">Submit</button>
                <h3>No.SGH12006</h3>

            </div>

            <div className="detail-edit-container" >
                <table class="table">
                    <thead>
                        <tr>
                            <th scope="col">Product No.</th>
                            <th scope="col">Product Name</th>
                            <th scope="col">Unit</th>
                            <th scope="col">Quanity</th>
                        </tr>
                    </thead>
                    <tbody>
                        {state.purchaseOrderProduct.map((product, index) =>
                            <tr>

                                <th scope="row">{index + 1}</th>
                                <td>{product.productVariant.name}</td>
                                <td>{product.unit}</td>
                                <td><span className="edit-quanity" onClick={minus.bind(null, product.orderQuantity, index)}>-</span>{product.orderQuantity}<span className="edit-quanity" onClick={plus.bind(null, product.orderQuantity, index)}>+</span></td>
                            </tr>)}




                    </tbody>
                </table>
            </div>
            <div className="add-product"><p>Add</p></div>
            <div className="mail-detail collapse show" data-bs-target="#TextEditor"
                id="TextEditor" data-bs-toggle="collapse"><p>Mail detail</p></div>

            <div className="text-edit-container collapse " id="TextEditor" >  <TextEditor changeMailContent={(event) =>changeMailContent(event)} mailDescription={state.mailDescription} /></div>
            <PreviewPriceQuote editorState={editorState} statusSendMail={statusPreview}/>
        </div>

    );
}

export default CreatePurchaseOrder