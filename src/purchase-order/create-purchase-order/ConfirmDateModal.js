import React, { useRef, useState } from 'react'
import './confirm-date-modal.css'
import { jsPDF } from 'jspdf'
import 'jspdf-autotable'
import supplier from '../../supplier/supplier';
import { useSelector } from 'react-redux';
import { number_to_price, pasePrice } from '../parsePrice';
import moment from 'moment';
export default function ConfirmDateModal(props) {
  // if (props.isConfirm) {
  const doc = new jsPDF();
  const { companyInfo } = useSelector((state) => ({
    companyInfo: state.client.companyInfo
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
        [`ORDER ID: ${props.infoPurchaseOrder.orderId}`],
        ['Date: ' + moment().format("DD-MM-YYYY")]
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

        [`Phone: ${props.supplier.phoneNumber}`],
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


        ['Street Address'],
        [companyInfo.address],
        [`Phone: ${companyInfo.phoneNumber} `],


      ],
    })





    // doc.autoTable({
    //   styles: {},
    //   headStyles: { fillColor: [41, 128, 186], textColor: 'white' },
    //   columnStyles: { 0: { halign: 'center' } }, // Cells in first column centered and green
    //   margin: { top: 90, },
    //   tableWidth: 180,
    //   theme: "grid",
    //   head: [['DELIVERY DATE', 'REQUESTED BY', 'APPROVED BY', 'DEPARTMENT']],
    //   body: [
    //     ['', '', '', ''],

    //   ],
    // })

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
        props.listProduct.map(product => ({
          ...product, price: pasePrice(product.price), totalAmount: pasePrice(product.totalAmount)
        }))
    })
    var finalY = doc.lastAutoTable.finalY + 5 || 10


    var finalY = doc.lastAutoTable.finalY || 10
    console.log(finalY)
    doc.setFontSize(11)
    doc.text("For questions concerning this invoice, please contact", 105, doc.internal.pageSize.height - 10, "center")
    doc.text(`${companyInfo.phoneNumber} Email: imssystemmail@gmail.com`, 105, doc.internal.pageSize.height - 5, "center")


    // doc.output('blob')
    return doc.output('datauristring')

    // sendEmailQuote(doc.output('blob'))
  }
  // function onChangeValue(event) {
  //   setContentMail(event.target.value)
  // }
  function checkForm() {
    if (isSendMail) {
      const form = document.getElementById("validContentMail");
      if (!form.checkValidity()) {

        form.classList.add("was-validated");
      }
      else {
        // let content = contentMail.current.value + "</br>" + `<iframe width="100%"  class="embed-responsive-item" src=${print() + "#toolbar=0"}></iframe>`
        props.confirmPurchaseOrder(isSendMail,doc.output('blob'), contentMail.current.value)

      }
    }
    else {
      props.confirmPurchaseOrder(isSendMail,"", "")

    }


  }
  const [isSendMail, setIsSendMail] = useState(false)
  const contentMail = useRef("")
  return (

    <div class="modal model-confirm-date" id="exampleModalCenter" tabindex="-1" aria-labelledby="exampleModalCenterTitle" aria-modal="true" role="dialog">
      <div class="modal-dialog modal-dialog-centered modal-dialog-confirm-date">
        <div class="modal-content modal-content-confirm-date">

          <div class="modal-body">


            <div class="form-check">
              <p>Do you want to send purchase order to supplier ?</p>
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
                <label for="exampleFormControlInput1" class="form-label">To email address:</label>
                <input type="email" class="form-control" disabled id="exampleFormControlInput1" value={props.supplier.email} placeholder="name@example.com" />
              </div>
              <form id="validContentMail" className="needs-validation">
                <div class="mb-3">
                  <label for="validationTextarea" class="form-label">Email content:</label>
                  <textarea class="form-control" ref={contentMail} id="validationTextarea" placeholder="Input your email content" rows="5" required></textarea>
                  <div class="invalid-feedback">
                    Please enter a message in the content mail.
                  </div>
                </div>

              </form>
              <iframe width="100%" height="800" class="embed-responsive-item" src={print() + "#toolbar=0"}></iframe></div>) : ""}



          </div>
          <div class="modal-footer">
            <button type="button" onClick={() => props.closeConfirmModal()} class="btn btn-secondary btn-cancel-preview" data-bs-dismiss="modal">Cancel</button>
            <button type="button" onClick={() => checkForm()} class="btn btn-primary">Confirm</button>
          </div>
        </div>
      </div>
    </div>
  )
  // }
  // return null
}
// props.confirmPurchaseOrder(isSendMail, print(), contentMail.current === null ? "" : contentMail.current.value)
