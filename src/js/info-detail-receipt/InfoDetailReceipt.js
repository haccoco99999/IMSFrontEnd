import React from 'react'
import './info-detail-receipt.css'
export default function InfoDetailReceipt(props) {

    return (<div className="info-detai-receipt-container">
        <div className="info-detai-receipt">
            <p>Create by: <span>{props.createdBy.fullname}</span></p>
            <div>
                <p>Email : <span>{props.createdBy.email}</span></p>
                <p>Phone No: <span>{props.createdBy.phoneNumber}</span></p>
            </div>

        </div>
        <div className="info-detai-receipt">
            <p>Supplier : <span>{props.supplier.supplierName}</span></p>
            <div>
                <p>Email : <span>{props.supplier.email}</span></p>
                <p>Phone No: <span>{props.supplier.salePersonName}</span></p>
            </div>

        </div>
        <div className="info-detai-receipt">
            <p>Create Date: <span>{props.date.createDate}</span></p>
            <p>Deadline: <span>{props.date.deadline}</span></p>
           

        </div>
        {/* <div className="info-create">
            <p>Supplier: <span>Huýupplier</span></p>
            <div className="info-create-detail">
                <p>Email : <span>HuyBeo@gmail.com</span></p>
                <p>Phone No: <span>111111-111</span></p>
            </div>

        </div> */}
        {/* <div className="info-date">
            <p>Create Date <span>10/2/2020</span></p>


        </div> */}
    </div>)
}

{/* <InfoDetailReceipt
createdBy={
    {
        fullname: "Huy Béo",
        email: "HuyBeo@gmail.com",
        phone: "0125584",
    }
}
supplier={
    {
        fullname: "Huy Béo",
        email: "HuyBeo@gmail.com",
        phone: "0125584",
    }
}
date={
    {
        createDate: "10/20/2016",
        deadline: "20/28/200",
       
    }
}
/> */}