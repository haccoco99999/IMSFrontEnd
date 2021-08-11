import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useLocation } from 'react-router-dom'
import { getDetailGoodIssue } from './action'
import BootstrapTable from 'react-bootstrap-table-next';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import './GoodIssueDetail.css'
// import NavigationBar from '../../navigation-bar-component/NavigationBar';
import NavigationBar from '../../components/navbar/navbar-component';
import RejectReceiptModal from '../../RejectReceiptModal/RejectReceiptModal';
import { createGoodIssue, updateGoodIssue, reactjsGoodIssue } from './action'
import PrintReceipt from './PrinterReceipt';
import Swal from 'sweetalert2'

import { jsPDF } from 'jspdf'
import 'jspdf-autotable'
import QRCode from 'qrcode'
import { CREATE_GOOD_ISSUE_CLEAN, GET_GOOD_ISSUE_DETAIL_CLEAN, REJECT_GOOD_ISSUE_CLEAN, UPDATE_GOOD_ISSUE_CLEAN } from './contants';
import { InfoPurchaseOrderLoader, TableLoading } from '../../components/loading/loading-component';
import RejectWrapper from '../../components/reject-wrapper/reject-component';

export default function DetailGoodIssue() {
    const doc = new jsPDF();
    const location = useLocation()
    const { GoodIssueDetail, token, RejectGoodIssueStatus, createGoodIssueStatus, upadateGoodIssueStatus } = useSelector(state => ({
        RejectGoodIssueStatus: state.RejectGoodIssue,
        createGoodIssueStatus: state.createGoodIssue,
        upadateGoodIssueStatus: state.upadateGoodIssue,
        GoodIssueDetail: state.DetailGoodIssue,
        token: state.client.token
    }))
    const history = useHistory()
    const [infoRejectOrder, setInfoRejectOrder] = useState({})
    const [listGoodIssueProducts, setlistGoodIssueProducts] = useState([])
    const [eventPage, setEvenPage] = useState({
        reject: false,
    })
    const [classStatus, setClassStatus] = useState("")
    const [status, setStatus] = useState("")
    const dispatch = useDispatch()
    console.log(status)
    useEffect(() => {

        dispatch(getDetailGoodIssue({ issueId: location.state.id, token: token }))
        return () => {
            dispatch({ type: GET_GOOD_ISSUE_DETAIL_CLEAN })
        }

    }, [])
    useEffect(() => {
        setlistGoodIssueProducts(
            GoodIssueDetail.infoGoodIssueDetail.listGoodIssueProducts
        )
        setInfoRejectOrder({ ...GoodIssueDetail.infoGoodIssueDetail.infoRejectOrder })
        setStatus(GoodIssueDetail.infoGoodIssueDetail.status)
    }, [GoodIssueDetail])
    useEffect(() => {

        if (status === "IssueRequisition") {
            setClassStatus("bg-secondary");
        } else if (status === "Packing") {

            setClassStatus("bg-warning");
        } else if (status === "Completed") {

            setClassStatus("bg-secondary");
        } else if (status === "Shipping" || status === "Cancel") {

            setClassStatus("bg-danger");
        } else {

            setClassStatus("bg-warning text-dark");
        }

    }, [status])
    useEffect(() => {
        if (RejectGoodIssueStatus.requesting) {
            Swal.fire({
                title: 'Rejecting!',
                html: 'Watting...',
                timerProgressBar: true,
                didOpen: () => {
                    Swal.showLoading()

                },

            })
        }
        else if (RejectGoodIssueStatus.successful) {

            Swal.fire(
                'Reject Success!',
                'Click to Close!',
                'success'

            )
            dispatch({ type: "EDIT_PRICE_QUOTE_RESET" })
            dispatch({ type: REJECT_GOOD_ISSUE_CLEAN })
        }
        else if (RejectGoodIssueStatus.errors) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong, cannot reject!',

            })
            dispatch({ type: REJECT_GOOD_ISSUE_CLEAN })
        }
        ///Show Create Good Issue
        if (createGoodIssueStatus.requesting) {
            Swal.fire({
                title: 'Creating Goods Issue !',
                html: 'Watting...',
                timerProgressBar: true,
                didOpen: () => {
                    Swal.showLoading()

                },

            })
        }
        else if (createGoodIssueStatus.successful) {

            Swal.fire(
                'Create Goods Issue Success!',
                'Click to Close!',
                'success'

            )
            dispatch({ type: CREATE_GOOD_ISSUE_CLEAN })
        }
        else if (createGoodIssueStatus.errors) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong, cannot create!',

            })
            dispatch({ type: CREATE_GOOD_ISSUE_CLEAN })
        }
        //Shipping, Confirm
        let nameStatus
        if (status === "Shipping") {
            nameStatus = "Confirming"
        }

        else if (status === "Packing") {
            nameStatus = "Shipping"

        }
        if (upadateGoodIssueStatus.requesting) {
            Swal.fire({
                title: `Creating ${nameStatus} !`,
                html: 'Watting...',
                timerProgressBar: true,
                didOpen: () => {
                    Swal.showLoading()

                },

            })
        }
        else if (upadateGoodIssueStatus.successful) {

            Swal.fire(
                ` ${nameStatus} Success!`,
                'Click to Close!',
                'success'

            )
            dispatch({ type: UPDATE_GOOD_ISSUE_CLEAN })

        }
        else if (upadateGoodIssueStatus.errors) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: `Something went wrong,  ${nameStatus}`,

            })
            dispatch({ type: UPDATE_GOOD_ISSUE_CLEAN })
        }

    }, [RejectGoodIssueStatus, createGoodIssueStatus, upadateGoodIssueStatus])


    function setListButtonNav(status) {
        if (status === "IssueRequisition") {
            return [
                {
                    isShow: true,
                    title: "Reject",
                    action: () => clickReject(),
                    class: "btn-danger"
                },

                {
                    isShow: true,
                    title: "Create good issue",
                    action: () => ClickCreateGoodIssue(),
                    class: "btn-primary",
                },
            ]
        }
        else if (status === "Packing") {
            return [
                {
                    isShow: true,
                    title: "Shipping",
                    action: () => clickToShipping(),
                    class: "btn-warning",
                },
                {
                    isShow: true,
                    title: "print",
                    action: () => printDeliverNote(),
                    class: "btn-secondary",
                },
            ]

        }
        else if (status === "Shipping") {
            return [
                {
                    isShow: true,
                    title: "Confirm",
                    action: () => clickToConfirm(),
                    class: "btn-primary"
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
        if (cancelReason !== undefined) {
            const data = {
                issueNumber: GoodIssueDetail.infoGoodIssueDetail.id,
                cancelReason: cancelReason
            }
            dispatch(reactjsGoodIssue({ data: data, token: token }))
        }
        setEvenPage((state) => ({
            reject: !state.reject
        }))
        // backPage()
    }
    function ClickCreateGoodIssue() {
        dispatch(createGoodIssue({ data: { issueNumber: GoodIssueDetail.infoGoodIssueDetail.id }, token: token }))
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
                ['Fax:' + GoodIssueDetail.infoGoodIssueDetail.customerPhoneNumber],

            ],
        })


        doc.addImage(textToBase64QRCode(GoodIssueDetail.infoGoodIssueDetail.id), 'png', 150, 20, 40, 40,);








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
                listGoodIssueProducts.map(product => product),
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

        iframe.src = window.URL.createObjectURL(doc.output('blob'));
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

    const listButton = setListButtonNav(status)

    const expandRow = {

        renderer: row => (

            <div>

                {row.listPackages.map(packageItem => {
                    return (

                        <div className="ps-3">
                            <div class="ms-2 me-auto">
                                <div class="fw-bold">Location: {packageItem.locationName}   <span class="badge text-danger fs-5"><i class="bi bi-geo-alt-fill"></i></span></div>
                                Barcode Location: {packageItem.locationBar} Quantity: {packageItem.quantity}
                            </div>

                        </div>

                    )
                })}







            </div>
        ),
        expanded: status === "Packing" ? listGoodIssueProducts.map(item => item.sku) : [],
        nonExpandable: status !== "Packing" ? listGoodIssueProducts.map(item => item.sku) : []
        // expandHeaderColumnRenderer: ({ isAnyExpands }) => {
        //     if (isAnyExpands) {
        //         return <b>-</b>;
        //     }
        //     return <b>+</b>;
        // },
        // expandColumnRenderer: ({ expanded }) => {
        //     if (expanded) {
        //         return (
        //             <b>-</b>
        //         );
        //     }
        //     return (
        //         <b>...</b>
        //     );
        // }
    };
    function backPage() {
        history.go(-1)
    }


    //     <div className="info-detai-receipt-container container-good-issue-detail">
    //     <div className="info-detai-receipt">
    //         <p>Create by: <span>{GoodIssueDetail.infoGoodIssueDetail.infoCreater.fullname}</span></p>
    //         <div>
    //             <p>Email : <span>{GoodIssueDetail.infoGoodIssueDetail.infoCreater.email}</span></p>
    //             <p>Phone No: <span>{GoodIssueDetail.infoGoodIssueDetail.infoCreater.phoneNumber}</span></p>
    //         </div>

    //     </div>
    //     <div className="info-detai-receipt">
    //         <p>Customer : <span>{GoodIssueDetail.infoGoodIssueDetail.customerName}</span></p>
    //         <div>
    //             {/* <p>Email : <span>{ }</span></p> */}
    //             <p>Phone No: <span>{GoodIssueDetail.infoGoodIssueDetail.customerPhoneNumber}</span></p>
    //         </div>

    //     </div>
    //     <div className="info-detai-receipt">
    //         <p>Create Date: <span>{GoodIssueDetail.infoGoodIssueDetail.createdDate}</span></p>
    //         <p>Delivery Date: <span>{GoodIssueDetail.infoGoodIssueDetail.deliveryDate}</span></p>


    //     </div>
    //     <div className="info-detai-receipt">
    //         <p>Delivery method: <span>{GoodIssueDetail.infoGoodIssueDetail.deliverMethod}</span></p>

    //     </div>

    // </div>
    return (


        <div>
            <NavigationBar listButton={listButton}
                titleBar={GoodIssueDetail.infoGoodIssueDetail.id}
                actionGoBack={backPage}
                classStatus={classStatus}
                status={status}
                currentPage={"Detail Good Issue"}
                home={"Goods Issue"}

            />

            <div class="d-grid gap-2">
                {status === "Cancel" ? <RejectWrapper
                    name={infoRejectOrder.name}
                    phoneNumber={infoRejectOrder.phoneNumber}
                    email={infoRejectOrder.email}
                    reason={infoRejectOrder.reason}
                    data={infoRejectOrder.createdDate}


                /> : ""}
                <div className="p-3">
                    <div className="card">
                        <div class="card-header p-0">
                            <div class="d-flex ">
                                <div class="me-auto p-2">Info Order:</div>

                            </div>
                        </div>
                        {GoodIssueDetail.successful ? <div class="card-body row">
                            <div className="col-md-9">
                                {status === "IssueRequisition" ?
                                    <div className="info-detai-receipt">
                                        <p className="fw-bold">Create by: <span className="fw-normal">{GoodIssueDetail.infoGoodIssueDetail.infoCreater.fullname}</span></p>
                                        <div>
                                            <p className="fw-bold">Email : <span className="fw-normal">{GoodIssueDetail.infoGoodIssueDetail.infoCreater.email}</span></p>
                                            <p className="fw-bold">Phone No: <span className="fw-normal">{GoodIssueDetail.infoGoodIssueDetail.infoCreater.phoneNumber}</span></p>
                                        </div>

                                    </div>
                                    : ""}

                                <div className="info-detai-receipt">
                                    <p className="fw-bold">Customer : <span className="fw-normal">{GoodIssueDetail.infoGoodIssueDetail.customerName}</span></p>
                                    <div>
                                        {/* <p>Email : <span>{ }</span></p> */}
                                        <p className="fw-bold">Phone No: <span className="fw-normal">{GoodIssueDetail.infoGoodIssueDetail.customerPhoneNumber}</span></p>
                                    </div>

                                </div>
                                <div className="info-detai-receipt">
                                    <p className="fw-bold">Create Date: <span className="fw-normal">{GoodIssueDetail.infoGoodIssueDetail.createdDate}</span></p>
                                    <p className="fw-bold">Delivery Date: <span className="fw-normal">{GoodIssueDetail.infoGoodIssueDetail.deliveryDate}</span></p>


                                </div>
                                <div className="info-detai-receipt">
                                    <p className="fw-bold">Delivery method: <span className="fw-normal">{GoodIssueDetail.infoGoodIssueDetail.deliverMethod}</span></p>

                                </div>

                            </div>

                            {/* <div className="col-md-3">
                                <div className="card">
                                    <div className="card-header">
                                        {GoodIssueDetail.infoGoodIssueDetail.id}</div>
                                    <div className="card-body">
                                        <img src={textToBase64QRCode(GoodIssueDetail.infoGoodIssueDetail.id)} />
                                    </div>
                                </div>


                            </div> */}


                        </div>
                            : <InfoPurchaseOrderLoader />
                        }
                    </div>
                </div>

                <div className="p-3">
                    <div className="card">
                        <div class="card-header p-0">
                            <div class="d-flex ">
                                <div class="me-auto p-2">List Products Order:</div>

                            </div>
                        </div>
                        <div class="card-body">

                            <BootstrapTable
                                keyField='sku'
                                data={listGoodIssueProducts}
                                columns={columns}
                                expandRow={expandRow}
                                noDataIndication={() => <TableLoading />}
                            />

                        </div>
                    </div>
                </div>
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
            {eventPage.reject ? <RejectReceiptModal clickToCLoseReject={clickReject} /> : ""}


            {/* <RejectReceiptModal
                clickToClose={clickReject}
                clickToSave={clickReject}
                isReject={eventPage.reject}
            /> */}
        </div>
    )
}