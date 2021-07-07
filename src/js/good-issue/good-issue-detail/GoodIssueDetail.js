import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { getDetailGoodIssue } from './action'
import BootstrapTable from 'react-bootstrap-table-next';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';

export default function DetailGoodIssue() {
    const location = useLocation()
    const GoodIssueDetail = useSelector(state => state.DetailGoodIssue)
    const [listGoodIssueProducts, setlistGoodIssueProducts] = useState([])
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getDetailGoodIssue({ issueId: "GOP2RW9OOR", token: "" }))
    }, [])
    useEffect(() => {
        setlistGoodIssueProducts(
            GoodIssueDetail.infoGoodIssueDetail.listGoodIssueProducts
        )
    }, [GoodIssueDetail])
    console.log(listGoodIssueProducts)

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
    return (
        <div>
            <BootstrapTable
                keyField='sku'
                data={listGoodIssueProducts}
                columns={columns}
                expandRow={expandRow}
            />
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

        </div>
    )
}