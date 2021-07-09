import React from 'react'
import './info-detail-receipt.css'
export default function InfoDetailReceipt(props) {

    return (<div className="info-detai-receipt-container">
        <div className="info-detai-receipt">
            <p>Create by: <span>{}</span></p>
            <div>
                <p>Email : <span>{}</span></p>
                <p>Phone No: <span>{}</span></p>
            </div>

        </div>
        <div className="info-detai-receipt">
            <p>Supplier : <span>{}</span></p>
            <div>
                <p>Email : <span>{}</span></p>
                <p>Phone No: <span>{}</span></p>
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