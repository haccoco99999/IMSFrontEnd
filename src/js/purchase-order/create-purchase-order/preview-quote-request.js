import React, { useState } from 'react'
import './preview-quote-request.css'
// import {clickToPrevewPriceQuote, clickToSendMailPriceQuote} from '../action'
import { useDispatch, useSelector } from 'react-redux'
import htmlToDraft from 'html-to-draftjs';
import draftToMarkdown from 'draftjs-to-markdown';

import { EditorState, convertToRaw, ContentState } from 'draft-js';
import { jsPDF } from 'jspdf'
import 'jspdf-autotable'
export default function PreviewSendMail(props) {

    // console.log(props.editorState)
    // const contentBlock = htmlToDraft(props.mailDescription)

    if (props.statusSendMail) {
        const user = useSelector((state) => state.client)
        const doc = new jsPDF();
        console.log(user)
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
                head: [['INVENTORY ABC']],
                body: [
                    ['Street Address'],
                    ['HCM, QUAN 1, 1111'],
                    ['Phone:(086) 111-8596'],
                    ['Fax: (189) 856-4258'],
                    ['Email: Inventory@gmail.com'],

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
                    ['Quote #:' + props.infoPriceQuote.orderId],
                    ['Date: ' + new Date().toISOString().slice(0, 10)],
                    ['Request By: ' + user.fullname],
                    ['Quote expires: ' + props.infoPriceQuote.deadline]

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

            doc.autoTable({
                startY: finalY,
                styles: { halign: 'center' },
                head: [['Comments or Special Instructions']],
                headStyles: { fillColor: 'gray', textColor: 'white' },
                columnStyles: { 0: { halign: 'left', cellWidth: 100, minCellHeight: 30, } }, // Cells in first column centered and green
                margin: {},
                tableWidth: 60,
                theme: "grid",

                body: [
                    ["lorem ipsum dolor sit amet consectetur adipiscing elit. aliquam tincidunt elementum sem non luctus lorem ipsum dolor sit amet consectetur adipiscing elit. aliquam tincidunt elementum sem non luctus"]
                ],
            })
            var finalY = doc.lastAutoTable.finalY || 10
            console.log(finalY)
            doc.setFontSize(11)
            doc.text("For questions concerning this invoice, please contact", 105, doc.internal.pageSize.height - 10, "center")
            doc.text("Name,[321] 456-789 EMail: Inventory@gmail.com", 105, doc.internal.pageSize.height - 5, "center")


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
                            <div className="form-text">
                                From:
                            </div>
                            <label className="form-check-label" >
                                {"InventoryABC@gmail.com"}
                            </label>
                            <div className="form-text">
                                TO:
                            </div>
                            <label className="form-check-label" >
                                {props.supplierInfo.email}
                            </label>
                            <div className="form-text">
                                Subject:
                            </div>
                            <label className="form-check-label" >
                                {"Send Price QUote"}
                            </label>
                            <div className="form-text">
                                Content:
                            </div>
                            <label className="form-check-label" >
                            <div dangerouslySetInnerHTML={{ __html: `${html}` }} />

                            </label>
                           
                            <iframe width="100%" height="100%" class="embed-responsive-item" src={print() + "#toolbar=0"}></iframe>



                        </div>
                        <div class="modal-footer">
                            <button type="button" onClick={() => props.closePreview()} class="btn btn-secondary btn-cancel-preview" data-bs-dismiss="modal">Cancel</button>
                            <button type="button" onClick={() => props.clostPreviewSendMail(doc.output('blob'), props.isResend)} class="btn btn-primary">Send email to vendor</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
    else {
        return "";
    }

}
// doc.output('blob')
