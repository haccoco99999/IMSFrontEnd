import React, { useEffect } from 'react'
import './PrinterReceipt.css'
// import {clickToPrevewPriceQuote, clickToSendMailPriceQuote} from '../action'
import { useDispatch } from 'react-redux'
import htmlToDraft from 'html-to-draftjs';
import draftToMarkdown from 'draftjs-to-markdown';

import { EditorState, convertToRaw, ContentState } from 'draft-js';
import { jsPDF } from 'jspdf'
import 'jspdf-autotable'
import QRCode from 'qrcode'
export default function PrintReceipt(props) {

    // console.log(props.editorState)
    // const contentBlock = htmlToDraft(props.mailDescription)

    if (props.isShowPrintReceipt) {
        const doc = new jsPDF();
        function textToBase64QRCode(text) {

            let urlCode
            QRCode.toDataURL(text, { type: 'png' }, function (err, url) {
                urlCode = url
            })
            return urlCode

        }
        function printDeliverNote() {


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
                    ['City, ST, Zip'],
                    ['Phone:(000) 000-0000'],
                    ['Fax: (000) 000-0000'],
                    ['Website'],

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
                head: [['DELIVERY NOTE']],
                body: [
                    ['Order Date'],
                    ['Order #'],
                    ['CustomerID'],
                    ['Delivery Method'],


                ],
            })

            var finalY = doc.lastAutoTable.finalY + 15 || 10

            doc.autoTable({
                styles: {},
                pageBreak: 'avoid',
                startY: finalY,
                headStyles: { fillColor: [41, 128, 186], textColor: 'white' },
                columnStyles: { 0: { halign: 'left', cellPadding: 1 } }, // Cells in first column centered and green
                margin: {},
                tableWidth: 90,
                theme: 'plain',
                head: [['Shiping Adress']],
                body: [
                    ['Company Name'],
                    ['Contact or Department'],
                    ['Street Address'],
                    ['City, ST, Zip'],
                    ['Phone:(000) 000-0000'],
                    ['Fax: (000) 000-0000'],

                ],
            })


            doc.addImage(textToBase64QRCode("123654568748"), 'png', 120, 50, 60, 60,);








            doc.autoTable({
                styles: {},
                headStyles: { fillColor: [41, 128, 186], textColor: 'white' },
                columnStyles: { 0: { halign: 'center' } }, // Cells in first column centered and green
                margin: { top: 90, },
                tableWidth: 180,
                theme: "grid",
                head: [['PRODUCT NO.', 'ITEM#', 'PRODUCT NAME', 'QTY', 'UNIT PRICE', 'TOTAL']],
                body: [
                    ['1', '145698456', 'BANANA', '2', '10', '20'],
                    ['1', '145698456', 'BANANA', '2', '10', '20'],
                    ['1', '145698456', 'BANANA', '2', '10', '20'],
                    ['1', '145698456', 'BANANA', '2', '10', '20'],
                    ['1', '145698456', 'BANANA', '2', '10', '20'],
                    ['1', '145698456', 'BANANA', '2', '10', '20'],
                    ['1', '145698456', 'BANANA', '2', '10', '20'],


                ],
            })
            var finalY = doc.lastAutoTable.finalY + 5 || 10


            var finalY = doc.lastAutoTable.finalY || 10
            console.log(finalY)
            doc.setFontSize(11)
            doc.text("For questions concerning this invoice, please contact", 105, doc.internal.pageSize.height - 10, "center")
            doc.text("Name,[321] 456-789 EMail: Inventory@gmail.com", 105, doc.internal.pageSize.height - 5, "center")




      
            return doc.output('blob')

        }

        useEffect(()=>{
            printPdf(window.URL.createObjectURL( printDeliverNote()))
        },[])


        // const html = props.contentEmail

        function printPdf(url) {
            var iframe

            iframe = document.createElement('iframe');
            iframe.setAttribute('type', 'application/pdf');

            iframe.src = url;
            document.body.appendChild(iframe);
            setTimeout(function () {
                iframe.focus();
                iframe.contentWindow.print();
            }, 100);


            //   iframe.onload = function() {
            //     setTimeout(function() {

            //     }, 1);
            //   };



        }
        function isLoaded() {
            let id = "pdfDocumentx"
                                
                               
                             
            const iframe = document.getElementById(id);
            const iframeWindow = iframe.contentWindow 

            iframe.focus();
            iframeWindow.print();
        }
        return (
            <div class="modal modal-preview-quote-request" id="exampleModalCenter" tabindex="-1" aria-labelledby="exampleModalCenterTitle" aria-modal="true" role="dialog">
                <div class="modal-dialog modal-dialog-centered modal-dialog-preview-quote-request">
                    <div class="modal-content modal-content-preview-quote-request">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalCenterTitle">Print</h5>
                            <button type="button" onClick={() => props.clickToCloseModal()} class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body" style={{ overflow: "auto" }}>
                            {/* <div dangerouslySetInnerHTML={{ __html: `${html}` }} /> */}
                            {/* <textarea className="design-textarea" disabled value={editorState && draftToMarkdown(convertToRaw(editorState.getCurrentContent()))} /> */}
                            {/* {htmlToDraft(props.mailDescription)} */}
                            {/* <div id="toilahhp"></div>
                        {print()} */}
                            {/* 
                            <embed src={print()} width="500" height="375"
                                type="application/pdf"></embed> */}

                            {/* <div class="embed-responsive embed-responsive-4by3"> */}
                            { }
                            <iframe id="pdfDocumentx" type="application/pdf" name="pdfDocument"
                             width="100%" height="100%" src={window.URL.createObjectURL( printDeliverNote())} class="embed-responsive-item" ></iframe>
                        


                        </div>
                        <div class="modal-footer">
                            <button type="button" onClick={() => props.clickToCloseModal()} class="btn btn-secondary btn-cancel-preview" data-bs-dismiss="modal">Cancel</button>
                            <button type="button" onClick={() => isLoaded()} class="btn btn-primary">Print</button>
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
