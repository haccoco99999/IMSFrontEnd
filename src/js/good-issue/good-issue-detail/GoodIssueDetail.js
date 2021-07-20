import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { getDetailGoodIssue } from './action'
import BootstrapTable from 'react-bootstrap-table-next';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import './GoodIssueDetail.css'
import NavigationBar from '../../navigation-bar-component/NavigationBar';
import RejectReceiptModal from '../../RejectReceiptModal/RejectReceiptModal';
import { createGoodIssue, updateGoodIssue , reactjsGoodIssue} from './action'
import PrintReceipt from './PrinterReceipt';

import { jsPDF } from 'jspdf'
import 'jspdf-autotable'
import QRCode from 'qrcode'

export default function DetailGoodIssue() {
    const doc = new jsPDF();
    const location = useLocation()
    const { GoodIssueDetail, token } = useSelector(state => ({

        GoodIssueDetail: state.DetailGoodIssue,
        token: state.client.token
    }))
    const [listGoodIssueProducts, setlistGoodIssueProducts] = useState([])
    const [eventPage, setEvenPage] = useState({
        reject: false,
    })

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getDetailGoodIssue({ issueId: location.state.id, token: "" }))
    }, [])
    useEffect(() => {
        setlistGoodIssueProducts(
            GoodIssueDetail.infoGoodIssueDetail.listGoodIssueProducts
        )
    }, [GoodIssueDetail])
    console.log(listGoodIssueProducts)

    console.log(GoodIssueDetail)

    function setListButtonNav(status) {
        if (status === "IssueRequisition") {
            return [
                {
                    isShow: true,
                    title: "Reject",
                    action: () => clickReject(),
                    style: {
                        background: "red"
                    }
                },

                {
                    isShow: true,
                    title: "Create good issue",
                    action: () => ClickCreateGoodIssue(),
                    style: {
                        "background-color": "#f9c421"
                    }
                },
            ]
        }
        else if (status === "Packing") {
            return [
                {
                    isShow: true,
                    title: "Shipping",
                    action: () => clickToShipping(),
                    style: {
                        background: "red"
                    }
                },
                {
                    isShow: true,
                    title: "print",
                    action: () => printDeliverNote(),
                   
                },
            ]

        }
        else if (status === "Shipping") {
            return [
                {
                    isShow: true,
                    title: "Confirm",
                    action: () => clickToConfirm(),
                    style: {
                        background: "red"
                    }
                },
            ]
        }
        else {
            return []
        }
    }

    const columns = [{
        dataField: 'sku',
        text: 'SKU'
    }, {
        dataField: 'nameProduct',
        text: 'Product Name'
    }, {
        dataField: 'quantity',
        text: 'Quantity'
    }];
    function clickReject(cancelReason) {
        if ( cancelReason !== undefined) {
            const data={
                issueNumber: location.state.id,
                cancelReason: cancelReason
            }
            dispatch(reactjsGoodIssue({data: data, token: token}))
        }
        setEvenPage((state) => ({
            reject: !state.reject
        }))
        // backPage()
    }
    function ClickCreateGoodIssue() {
        dispatch(createGoodIssue({ data:{issueNumber: location.state.id}, token: token }))
        backPage()
    }


   
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
            head: [['DELIVERY NOTE']],
            body: [
               
                ['Order #' + ['Created Date' + GoodIssueDetail.infoGoodIssueDetail.id],],
                ['Created Date' + GoodIssueDetail.infoGoodIssueDetail.createdDate],
                ['Delivery Date' + GoodIssueDetail.infoGoodIssueDetail.deliveryDate],
               
                ['Delivery Method' + GoodIssueDetail.infoGoodIssueDetail.deliverMethod],


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
            head: [['From:']],
            body: [
                ['CompanContacty Name'],
                [' or Department'],
                ['Street Address'],
                ['City, ST, Zip'],
                ['Phone:(595) 855-8556'],
                ['Fax: (8945) 4884-58845'],

            ],
        })

        doc.autoTable({
            styles: {},
            pageBreak: 'avoid',
            startY: finalY,
            headStyles: { fillColor: [41, 128, 186], textColor: 'white' },
            columnStyles: { 0: { halign: 'left', cellPadding: 1 } }, // Cells in first column centered and green
            margin: { left: 107, },
            tableWidth: 90,
            theme: 'plain',
            head: [['To']],
            body: [
                ['Customer Name ' + GoodIssueDetail.infoGoodIssueDetail.customerName],
             
                ['Street Address Vo VAn Kiet, HCMC'],
               
                ['Phone:' + GoodIssueDetail.infoGoodIssueDetail.customerPhoneNumber],
                ['Fax:'+ GoodIssueDetail.infoGoodIssueDetail.customerPhoneNumber],

            ],
        })


        doc.addImage(textToBase64QRCode(location.state.id), 'png', 150, 20, 40, 40,);








        doc.autoTable({
            styles: {},
            headStyles: { fillColor: [41, 128, 186], textColor: 'white' },
            columnStyles: { 0: { halign: 'center' } }, // Cells in first column centered and green
            margin: { top: 90, },
            tableWidth: 180,
            theme: "grid",
            columns: [
                { header: 'SKU', dataKey: 'sku' },
                { header: 'Product Name', dataKey: 'nameProduct' },
                { header: 'Quantity', dataKey: 'quantity' },
           
        ],
            body: 
                listGoodIssueProducts.map(product=> product),
        })
        var finalY = doc.lastAutoTable.finalY + 5 || 10


        var finalY = doc.lastAutoTable.finalY || 10
        console.log(finalY)
        doc.setFontSize(11)
        doc.text("For questions concerning this invoice, please contact", 105, doc.internal.pageSize.height - 10, "center")
        doc.text("Name,[321] 456-789 EMail: Inventory@gmail.com", 105, doc.internal.pageSize.height - 5, "center")




  
      
      
        var iframe

        iframe = document.createElement('iframe');
        iframe.setAttribute('type', 'application/pdf');

        iframe.src =   window.URL.createObjectURL( doc.output('blob'));
        document.body.appendChild(iframe);
        setTimeout(function () {
            iframe.focus();
            iframe.contentWindow.print();
        }, 100);


    }




    function clickToShipping() {
        let data = {

            issueNumber: GoodIssueDetail.infoGoodIssueDetail.id,
            changeStatusTo: "Shipping"

        }

        dispatch(updateGoodIssue({ data: data, token: token }))
        backPage()
    }
    function clickToConfirm() {
        let data = {

            issueNumber: GoodIssueDetail.infoGoodIssueDetail.id,
            changeStatusTo: "Confirm"

        }
        dispatch(updateGoodIssue({ data: data, token: token }))
        backPage()
    }

    const listButton = setListButtonNav(location.state.status)

    const expandRow = {
        renderer: row => (

            <div>
                {row.listPackages.map(packageItem => {
                    return (
                        <p>{packageItem.locationName}</p>
                    )
                })}

            </div>
        ),
        showExpandColumn: true
    };
    function backPage() {
        history.go(-1)
    }
    return (


        <div>
            <button onClick={() => printDeliverNote()}>PRINTER</button>
            <NavigationBar listButton={listButton}
                titleBar={GoodIssueDetail.infoGoodIssueDetail.id}
                actionGoBack={backPage}
                status={location.state.status} />
            <div className="info-detai-receipt-container container-good-issue-detail">
                <div className="info-detai-receipt">
                    <p>Create by: <span>{GoodIssueDetail.infoGoodIssueDetail.infoCreater.fullname }</span></p>
                    <div>
                        <p>Email : <span>{ GoodIssueDetail.infoGoodIssueDetail.infoCreater.email}</span></p>
                        <p>Phone No: <span>{ GoodIssueDetail.infoGoodIssueDetail.infoCreater.phoneNumber}</span></p>
                    </div>

                </div>
                <div className="info-detai-receipt">
                    <p>Customer : <span>{GoodIssueDetail.infoGoodIssueDetail.customerName}</span></p>
                    <div>
                        {/* <p>Email : <span>{ }</span></p> */}
                        <p>Phone No: <span>{GoodIssueDetail.infoGoodIssueDetail.customerPhoneNumber}</span></p>
                    </div>

                </div>
                <div className="info-detai-receipt">
                    <p>Create Date: <span>{ GoodIssueDetail.infoGoodIssueDetail.createdDate}</span></p>
                    <p>Delivery Date: <span>{GoodIssueDetail.infoGoodIssueDetail.deliveryDate}</span></p>


                </div>
                <div className="info-detai-receipt">
                    <p>Delivery method: <span>{GoodIssueDetail.infoGoodIssueDetail.deliverMethod}</span></p>

                </div>

            </div>


            <div className="container-good-issue-detail">
                <BootstrapTable
                    keyField='sku'
                    data={listGoodIssueProducts}
                    columns={columns}
                    expandRow={expandRow}
                    headerClasses="table-header-receipt"
                />
            </div>
            {/* <BootstrapTable classes="foo"
                keyField='id'
                data={listGoodIssueProducts}
                columns={columns}
                striped
                hover
                condensed
                noDataIndication="Table is Empty"
                rowEvents={rowEvents}
                hiddenRows={hiddenRowKeys}
                headerClasses="table-header-receipt"
            /> */}
            
            {/* <PrintReceipt isShowPrintReceipt={true}/> */}
            <RejectReceiptModal clickToCLoseReject={clickReject} isReject={eventPage.reject} />


            {/* <RejectReceiptModal
                clickToClose={clickReject}
                clickToSave={clickReject}
                isReject={eventPage.reject}
            /> */}
        </div>
    )
}