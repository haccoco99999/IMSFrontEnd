import React, { useState } from 'react'
import './preview-quote-request.css'
// import {clickToPrevewPriceQuote, clickToSendMailPriceQuote} from '../action'
import { useDispatch, useSelector } from 'react-redux'
// import htmlToDraft from 'html-to-draftjs';
// import draftToMarkdown from 'draftjs-to-markdown';

// import { EditorState, convertToRaw, ContentState } from 'draft-js';
import { jsPDF } from 'jspdf'
import 'jspdf-autotable'
import moment from 'moment'
export default function PreviewSendMail(props) {

    // console.log(props.editorState)
    // const contentBlock = htmlToDraft(props.mailDescription)

    // if (props.statusSendMail) {
    const { companyInfo } = useSelector((state) => ({ companyInfo: state.client.companyInfo }))
    const doc = new jsPDF();
    function print() {


        doc.autoTable({
            styles: {},
            pageBreak: 'avoid',
            startY: 10,
            headStyles: { fontSize: 18, halign: 'left' },
            columnStyles: { 0: { halign: 'left', cellPadding: 1 } },
            margin: {},
            tableWidth: 90,
            theme: 'plain',
            head: [[companyInfo.companyName]],
            body: [
                ['Street Address:'],
                [companyInfo.address],
                [`Phone: ${companyInfo.phoneNumber}`],



            ],
        })
        doc.autoTable({
            styles: {},
            pageBreak: 'avoid',
            startY: 10,
            headStyles: { fontSize: 18, halign: 'left' },
            columnStyles: { 0: { halign: 'left', cellPadding: 1 } },
            margin: { left: 107 },
            tableWidth: 90,
            theme: 'plain',
            head: [['PRICE QUOTE REQUEST']],
            body: [
                ['Quote ID:' + props.infoPriceQuote.orderId],
                ['Date: ' + moment().format("DD-MM-YYYY")],
                ['Requested By: ' + props.infoPriceQuote.infoUserPurchaseOrder.name],


            ],
        })

        var finalY = doc.lastAutoTable.finalY + 15 || 10






        doc.autoTable({
            styles: {},
            headStyles: { fillColor: [41, 128, 186], textColor: 'white' },
            columnStyles: { 0: { halign: 'center' } }, // Cells in first column centered and green
            margin: { top: 90, },
            tableWidth: 180,
            theme: "grid",
            columns: [
                { header: 'SKU', dataKey: 'sku' },
                { header: 'Product Name', dataKey: 'name' },
                { header: 'Quantity', dataKey: 'orderQuantity' },

            ],
            body:
                props.listProduct.map(product => product)
            // ['1', 'Donna', 'dmoore0@furl.net', 'China', '211.56.242.221'],
            // ['2', 'Janice', 'jhenry1@theatlantic.com', 'Ukraine', '38.36.7.199'],
            // [
            //     '3',
            //     'Ruth',
            //     'rwells2@constantcontact.com',
            //     'Trinidad and Tobago',
            //     '19.162.133.184',
            // ],
            // ['4', 'Jason', 'jray3@psu.edu', 'Brazil', '10.68.11.42'],
            // ['5', 'Jane', 'jstephens4@go.com', 'United States', '47.32.129.71'],
            // ['6', 'Adam', 'anichols5@com.com', 'Canada', '18.186.38.37'],
            // ['6', 'Adam', 'anichols5@com.com', 'Canada', '18.186.38.37'],

            ,
        })
        var finalY = doc.lastAutoTable.finalY + 5 || 10


        var finalY = doc.lastAutoTable.finalY || 10
        console.log(finalY)
        doc.setFontSize(11)
        doc.text("For questions concerning this invoice, please contact", 105, doc.internal.pageSize.height - 10, "center")
        doc.text(`${companyInfo.phoneNumber} Email: imssystemmail@gmail.com`, 105, doc.internal.pageSize.height - 5, "center")


        return doc.output('datauristring')




    }





    const html = props.contentEmail


    return (
        <div class="modal modal-preview-quote-request" id="exampleModalCenter" tabindex="-1" aria-labelledby="exampleModalCenterTitle" aria-modal="true" role="dialog">
            <div class="modal-dialog modal-dialog-centered modal-dialog-preview-quote-request">
                <div class="modal-content modal-content-preview-quote-request">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalCenterTitle">Preview</h5>
                        <button type="button" onClick={() => props.closePreview()} class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body" style={{ overflow: "auto" }}>
                        <div class="form-group">
                            <label for="">Name:</label>
                            <input type="text"
                                class="form-control" name="" id="" aria-describedby="helpId" placeholder=""  value={props.supplierInfo.supplierName} disabled />
                        </div>
                        <div class="form-group">
                            <label for="">To email address:</label>
                            <input type="text"
                                class="form-control" name="" id="" aria-describedby="helpId" placeholder="" value={props.supplierInfo.email} disabled />
                        </div>
                        {/* <div class="form-group">
                            <label for="">Subject:</label>
                            <input type="text"
                                class="form-control" name="" id="" aria-describedby="helpId" placeholder="" value={`Price Quote Request From ${companyInfo.companyName} ${moment().format("DD-MM-YYYY")}`} disabled />
                        </div> */}

                        <div class="form-group">
                            <label for="">Mail Content:</label>
                            <div dangerouslySetInnerHTML={{ __html: `${html}` }} />
                        </div>

                        <iframe width="100%" height="800" class="embed-responsive-item" src={print() + "#toolbar=0"}></iframe>



                    </div>
                    <div class="modal-footer">
                        <button type="button" onClick={() => props.closePreview()} class="btn btn-secondary btn-cancel-preview" data-bs-dismiss="modal">Cancel</button>
                        <button type="button" onClick={() => props.clostPreviewSendMail(doc.output('blob'))} class="btn btn-primary">Send email to Supplier</button>
                    </div>
                </div>
            </div>
        </div>
    )


}

