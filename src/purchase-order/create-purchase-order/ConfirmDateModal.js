import React, { useRef, useState } from 'react'
import './confirm-date-modal.css'
import { jsPDF } from 'jspdf'
import 'jspdf-autotable'
export default function ConfirmDateModal(props) {
  // if (props.isConfirm) {
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
        head: [['INVENTORY ABC']],
        body: [
          ['Street Address'],
          ['City, ST, Zip'],
          ['Phone:(098)) 456489-54'],
          ['Fax: (849) 080-5656'],
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
        head: [['PURCHASE ORDER']],
        body: [
          [`ORDER ID ${props.infoPriceQuote.orderId}`],
          ['04/26/2021'],
          // ['CUSTOMER ID:31654648'],


        ],
      })

      var finalY = doc.lastAutoTable.finalY + 15 || 10

      doc.autoTable({
        styles: {},
        pageBreak: 'avoid',
        startY: finalY,
        headStyles: { fillColor: [41, 128, 186], textColor: 'white' },
        columnStyles: { 0: { halign: 'left', cellPadding: 1 } }, // Cells in first column centered and green
        margin: { left: 107 },
        tableWidth: 90,
        theme: 'plain',
        head: [['SUPPLIER']],
        body: [
          [`Supplier name: ${props.infoPriceQuote.supplier.supplierName}`],

          [`Street Address ${props.infoPriceQuote.supplier.address}`],

          [`Phone Number: ${props.infoPriceQuote.supplier.phoneNumber}`],
          [`Email: ${props.infoPriceQuote.supplier.email}`],
          // ['Fax: (000) 000-0000'],

        ],
      })

      doc.autoTable({
        startY: finalY,
        styles: {},
        headStyles: { fillColor: [41, 128, 186], textColor: 'white' },
        columnStyles: { 0: { halign: 'left', cellPadding: 1 } }, // Cells in first column centered and green
        margin: { right: 107 },
        tableWidth: 90,
        theme: 'plain',
        pageBreak: 'avoid',

        head: [['DELIVERY ADDRESS']],
        body: [
          ['Company Name'],
          ['Contact or Department'],
          ['Street Address'],
          ['City, ST, Zip'],
          ['Phone:(000) 000-0000'],
          ['Fax: (000) 000-0000'],

        ],
      })





      doc.autoTable({
        styles: {},
        headStyles: { fillColor: [41, 128, 186], textColor: 'white' },
        columnStyles: { 0: { halign: 'center' } }, // Cells in first column centered and green
        margin: { top: 90, },
        tableWidth: 180,
        theme: "grid",
        head: [['DELIVERY DATE', 'REQUESTED BY', 'APPROVED BY', 'DEPARTMENT']],
        body: [
          ['', '', '', ''],

        ],
      })

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
          { header: 'Price', dataKey: 'price' },
          { header: 'Total Price', dataKey: 'totalAmount' },

        ],
        body:
          props.listProduct.map(product => product)
      })
      var finalY = doc.lastAutoTable.finalY + 5 || 10
      doc.autoTable({
        startY: finalY,
        styles: { halign: 'right' },
        headStyles: { fillColor: [41, 128, 186], textColor: 'white' },
        columnStyles: { 0: { halign: 'right', cellWidth: 25 } }, // Cells in first column centered and green
        margin: { left: 135, },
        tableWidth: 60,
        theme: "plain",

        body: [
          ["SUBTOTAL", ""],
          ["TAX"],
          ["SHIPPING", ""],
          ["OTHER", ""],
          ["TOTAL", ""],
        ],
      })
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

      // sendEmailQuote(doc.output('blob'))
    }
    const [isSendMail, setIsSendMail] = useState(false)
    const note = useRef("")
    return (

      <div class="modal model-confirm-date" id="exampleModalCenter" tabindex="-1" aria-labelledby="exampleModalCenterTitle" aria-modal="true" role="dialog">
        <div class="modal-dialog modal-dialog-centered modal-dialog-confirm-date">
          <div class="modal-content modal-content-confirm-date">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalCenterTitle">Confirm</h5>
              <button type="button" onClick={() => props.clickToCLoseConfirm(false)} class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">


              <div class="form-check">
                  <p>Do you want to send mail for supplier ?</p>
                <label class="form-check-label">
                  <input type="checkbox" class="form-check-input" value={isSendMail} onChange={() => setIsSendMail(!isSendMail)} id="" />
                  I agree
                </label>
              </div>

              {isSendMail ? (<div>

                <div class="mb-3">
                  <label for="exampleFormControlTextarea1" class="form-label">Content:</label>
                  <textarea ref={note} class="form-control" id="exampleFormControlTextarea1" rows="5"></textarea>
                </div>

                <iframe width="100%" height="800" class="embed-responsive-item" src={print() + "#toolbar=0"}></iframe></div>) : ""}



            </div>
            <div class="modal-footer">
              <button type="button" onClick={() => props.clickToCLoseConfirm(false)} class="btn btn-secondary btn-cancel-preview" data-bs-dismiss="modal">Cancel</button>
              <button type="button" onClick={() => props.clickToCLoseConfirm(true, print(), note.current.value)} class="btn btn-primary">Confirm</button>
            </div>
          </div>
        </div>
      </div>)
  // }
  // return null
}