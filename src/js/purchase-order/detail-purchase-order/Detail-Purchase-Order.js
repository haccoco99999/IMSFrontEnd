import React, { useEffect } from 'react';
import 'bootstrap/js/dist/carousel'
import './detail-purchse-order.css'
import { useHistory, useLocation } from "react-router-dom";
import getDetailPriceQuote from './action'
import { useDispatch, useSelector } from 'react-redux'
// import { createSelector } from 'reselect'
export function DetailPurhcaseOrder(props) {
    
    let history = useHistory();
    let location = useLocation();
    let dispatch = useDispatch();
    let { detailPriceQuote, priceQuoteOrder, listProductQuoteOrder } = useSelector(state => ({
        detailPriceQuote: state.detailPriceQuote,
        priceQuoteOrder: state.detailPriceQuote.priceQuoteOrder,
        listProductQuoteOrder: state.detailPriceQuote.priceQuoteOrder.purchaseOrderProduct
    }))





    useEffect(() => {
        dispatch(getDetailPriceQuote({ id: location.state.priceQuoteOrderNumber },[]));

    },[])
    function handleClick() {
        history.push("/homepage/purchase/CreatePurchaseOrder");
    }


    return (
        <div>
            <div className="name-oder" >
                <button onClick={handleClick} type="button" name="" id="" class="btn btn-primary">Create Price quote request</button>
                <h3>No.{priceQuoteOrder.priceQuoteNumber}</h3>
                <p>Warning</p>
            </div>
            <div className="info-purchase-order">

               

                <div className="info-create">
                    <p>Create by: <span>{priceQuoteOrder.transaction.createdBy.fullname}</span></p>
                    <div className="info-create-detail">
                        <p>Email : <span>{priceQuoteOrder.transaction.createdBy.email}</span></p>
                        <p>Phone No: <span>{priceQuoteOrder.transaction.createdBy.phoneNumber}</span></p>
                    </div>

                </div>
                <div className="info-create">
                    <p>Supplier: <span>{priceQuoteOrder.supplier.salePersonName}</span></p>
                    <div className="info-create-detail">
                        <p>Email : <span>{priceQuoteOrder.supplier.email}</span></p>
                        <p>Phone No: <span>{priceQuoteOrder.supplier.phoneNumber}</span></p>
                    </div>

                </div>
                <div className="info-date">
                    <p>Create Date <span>{priceQuoteOrder.transaction.createdDate.split("T")[0]}</span></p>
                    <p>Deadline  <span>{priceQuoteOrder.deadline.split("T")[0]}</span></p>

                </div>


            </div>

            <div className="detail-purchase-container" >
                <table class="table">
                    <thead>
                        <tr>
                            <th scope="col">Product No.</th>
                            <th scope="col">Product Name</th>
                            <th scope="col">Unit</th>
                            <th scope="col">Quanity</th>
                        </tr>
                    </thead>
                    <tbody>
                        {listProductQuoteOrder.map((product, index) =>
                            <tr>
                        
                                <th scope="row">{index+1}</th>
                                <td>{product.productVariant.name}</td>
                                <td>{product.unit}</td>
                                <td>{product.quantity}</td>
                            </tr>)}

                
                    </tbody>
                </table>
            </div>
        </div>

    );
}
