import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { getDetailGoodIssue } from './action'
import BootstrapTable from 'react-bootstrap-table-next';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import './GoodIssueDetail.css'
import NavigationBar from '../../navigation-bar-component/NavigationBar';
import  RejectReceiptModal  from './RejectReceiptModal';
import {createGoodIssue,updateGoodIssue} from './action'
export default function DetailGoodIssue() {
    const location = useLocation()
    const {GoodIssueDetail, token} = useSelector(state => ({
        
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
        else{
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
    function clickReject(data) {
        if(data !== null || data !== undefined){
            console.log("ok dispatch")
        }
        setEvenPage((state) =>({
            reject : !state.reject
        }))
    }
    function ClickCreateGoodIssue() {
        dispatch(createGoodIssue({data: "creating" , token:token}))
    }
   
    function clickToShipping(){
        let data = {
            
                issueNumber: GoodIssueDetail.infoGoodIssueDetail.id,
                changeStatusTo: "Shipping"
              
        }
      
       dispatch(updateGoodIssue({data: data, token:token}))
    }
    function clickToConfirm(){
        let data = {
            
            issueNumber: GoodIssueDetail.infoGoodIssueDetail.id,
            changeStatusTo: "Confirm"
          
    }
        dispatch(updateGoodIssue({data: data , token:token}))
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
    function backPage(){
        history.go(-1)
    }
    return (


        <div>

            <div className="info-detai-receipt-container container-good-issue-detail">
                <div className="info-detai-receipt">
                    <p>Create by: <span>{ }</span></p>
                    <div>
                        <p>Email : <span>{ }</span></p>
                        <p>Phone No: <span>{ }</span></p>
                    </div>

                </div>
                <div className="info-detai-receipt">
                    <p>Customer : <span>{GoodIssueDetail.infoGoodIssueDetail.customerName }</span></p>
                    <div>
                        {/* <p>Email : <span>{ }</span></p> */}
                        <p>Phone No: <span>{ GoodIssueDetail.infoGoodIssueDetail.customerPhoneNumber}</span></p>
                    </div>

                </div>
                <div className="info-detai-receipt">
                    <p>Create Date: <span>{ }</span></p>
                    <p>Delivery Date: <span>{GoodIssueDetail.infoGoodIssueDetail.deliveryDate }</span></p>


                </div>
                <div className="info-detai-receipt">
                    <p>Delivery method: <span>{ GoodIssueDetail.infoGoodIssueDetail.deliverMethod}</span></p>

                </div>

            </div>
         
            <NavigationBar listButton={listButton}
            titleBar={GoodIssueDetail.infoGoodIssueDetail.id}
            actionGoBack={backPage} 
            status={location.state.status}/>
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
             <RejectReceiptModal 
             clickToClose={clickReject} 
             clickToSave={clickReject} 
             isReject={eventPage.reject}
             />
        </div>
    )
}