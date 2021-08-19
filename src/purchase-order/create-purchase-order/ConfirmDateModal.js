import React, { useRef, useState } from 'react'
import './confirm-date-modal.css'
import { jsPDF } from 'jspdf'
import 'jspdf-autotable'
import supplier from '../../supplier/supplier';
import { useSelector } from 'react-redux';
export default function ConfirmDateModal(props) {
  // if (props.isConfirm) {
  const doc = new jsPDF();
  const {companyInfo}= useSelector((state) =>({
    client: state.client.companyInfo
  }))
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
        ['Street Address'],
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
        [`Supplier name: ${props.supplier.supplierName}`],

        [`Street Address ${props.supplier.address}`],

        [`Phone Number: ${props.supplier.phoneNumber}`],
        [`Email: ${props.supplier.email}`],
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
    

    var finalY = doc.lastAutoTable.finalY || 10
    console.log(finalY)
    doc.setFontSize(11)
    doc.text("For questions concerning this invoice, please contact", 105, doc.internal.pageSize.height - 10, "center")
    doc.text("Name,[321] 456-789 EMail: Inventory@gmail.com", 105, doc.internal.pageSize.height - 5, "center")



    return doc.output('datauristring')

    // sendEmailQuote(doc.output('blob'))
  }
  function onChangeValue(event){
    setContentMail(event.target.value)
  }
  const [isSendMail, setIsSendMail] = useState(false)
  const [contentMail, setContentMail] = useState("")
  return (

    <div class="modal model-confirm-date" id="exampleModalCenter" tabindex="-1" aria-labelledby="exampleModalCenterTitle" aria-modal="true" role="dialog">
      <div class="modal-dialog modal-dialog-centered modal-dialog-confirm-date">
        <div class="modal-content modal-content-confirm-date">

          <div class="modal-body">


            <div class="form-check">
              <p>Do you want to send purchase order for supplier ?</p>
              <label class="form-check-label">
                <input type="checkbox" class="form-check-input" value={isSendMail} onChange={() => setIsSendMail(!isSendMail)} id="" />
                I agree
              </label>
            </div>

            {isSendMail ? (<div>
              <div class="mb-3">
                <label for="exampleFormControlInput1" class="form-label">Name:</label>
                <input disabled value={props.supplier.supplierName} class="form-control" id="exampleFormControlInput1" placeholder="name@example.com" />
              </div>
              <div class="mb-3">
                <label for="exampleFormControlInput1" class="form-label">To email address</label>
                <input type="email" class="form-control" disabled id="exampleFormControlInput1" value={props.supplier.email} placeholder="name@example.com" />
              </div>

              <div class="mb-3">
                <label for="exampleFormControlTextarea1" class="form-label">Content:</label>
                <textarea onChange={contentMail} onChange={(e) => onChangeValue(e)} class="form-control" id="exampleFormControlTextarea1" rows="5"></textarea>
              </div>

              <iframe width="100%" height="800" class="embed-responsive-item" src={print() + "#toolbar=0"}></iframe></div>) : ""}



          </div>
          <div class="modal-footer">
            <button type="button" onClick={() => props.closeConfirmModal()} class="btn btn-secondary btn-cancel-preview" data-bs-dismiss="modal">Cancel</button>
            <button type="button" onClick={() => props.confirmPurchaseOrder(isSendMail, print(), contentMail)} class="btn btn-primary">Confirm</button>
          </div>
        </div>
      </div>
    </div>
  )
  // }
  // return null
}