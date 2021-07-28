import React from 'react'
import './info-detail-receipt.css'
export default function InfoDetailReceipt(props) {
    console.log(props.applicationUser)
    return (<div className="info-detai-receipt-container">
        <div className="info-detai-receipt">
            <p>Create by: <span>{props.applicationUser.name}</span></p>
            <div>
                <p>Email : <span>{props.applicationUser.email}</span></p>
                <p>Phone No: <span>{props.applicationUser.phoneNumber}</span></p>
            </div>

        </div>
        <div className="info-detai-receipt">
            <p>Supplier : <span>{props.supplier.id}</span></p>
            <div>
                <p>Email : <span>{props.supplier.email}</span></p>
                <p>Phone No: <span>{props.supplier.phoneNumber}</span></p>
            </div>

        </div>
        <div className="info-detai-receipt">
            <p>Create Date: <span>{}</span></p>
            <p>Deadline: <span>{}</span></p>
           

        </div>
     
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