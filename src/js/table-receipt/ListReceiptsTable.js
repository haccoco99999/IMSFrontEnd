import React, { useState } from 'react'
import './list-receipts-table.css'
import { ReactSearchAutocomplete } from 'react-search-autocomplete'
import { useDispatch } from 'react-redux'
export default function ListReceiptTable(props) {
    let dispatch = useDispatch()
    const x = "purchaseOrderNumber"
    let rowCount = [10,25,50]
    let [listItemSearch, setListItemSearch] = useState([])
    let arrayHeaders = []
    let indexHeaders = props.listData[0] == null ? [] : indexHeaders = Object.entries(props.listData[0]).map(item => item[0])
    let [keySearch, setKeySearch] = useState("")
    function inputChangeSearch(event) {
        setKeySearch(
            event.target.value
        )

    }
    function toSentence(words) {

        var result = words.replace(/([A-Z])/g, " $1");
        var finalResult = result.charAt(0).toUpperCase() + result.slice(1);
        return finalResult;
    }





    function editHeader(header) {
        var editedHeader = header
        Object.entries(props.listHeaderEdit).map(titleHeader => {

            if (header === titleHeader[0]) {
                editedHeader = titleHeader[1]
            }

        })
        return editedHeader
    }


    async function getSuggestionPurchaseOder(keySearch) {
        let json = await fetch(`https://imspublicapi.herokuapp.com/api/po/els/${keySearch}`, {

            method: 'GET',
            headers: {
                "Authorization": "Bearer " + "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImM3ODY3NmY2LTc1NTUtNGU3ZS05OWQ5LWE4OTcxZGI4NWU5MiIsIm5iZiI6MTYyMzU0NjI4MSwiZXhwIjoxNjI0MTUxMDgxLCJpYXQiOjE2MjM1NDYyODF9.m13k9zu5PBwB92rbqUdOBl7Mlb4jnmzPucrBPXUMafU",
                "Content-Type": "application/json",
                "Origin": ""
            },
            credentials: "include",

        })

            .then(response => response.json())
            .then(json => json)
            .catch((error) => { throw error })

        setListItemSearch(
            json.suggestions.map((item, index) => {
                return {
                    id: index,
                    name: item,
                }
            })
        )
    }





    const items = [
        {
            id: 0,
            name: 'Cobol'
        },
        {
            id: 1,
            name: 'JavaScript'
        },
        {
            id: 2,
            name: 'Basic'
        },
        {
            id: 3,
            name: 'PHP'
        },
        {
            id: 4,
            name: 'Java'
        }
    ]
    const handleOnSearch = (string, results) => {
        // onSearch will have as the first callback parameter
        // the string searched and for the second the results.
        getSuggestionPurchaseOder(string)
        // console.log(string, results,"hello hanđleOnsaeảch")
    }

    const handleOnHover = (result) => {
        // the item hovered
        console.log(result)
    }

    const handleOnSelect = (item) => {
        // the item selected{ 

        props.clickToSearch(item.name)
    }

    const handleOnFocus = (item) => {
        console.log("focus")
    }

    return (
        <div className="list-receipt-table-container">
            <div className="tool-bar-table">
                <div className="form-group search-purchase">
                    <img onClick={props.clickToSearch} src="..\src\js\images\search.svg" alt="icon-search" />
                <input name="searchQuery" type="text" value={props.keySearch} onChange={props.setKeySearch} className="form-control"  placeholder="Search by Order ID or Supplier Name" />
                    {/* <ReactSearchAutocomplete
                        inputDebounce={500}
                        items={listItemSearch}
                        onSearch={handleOnSearch}
                        onHover={handleOnHover}
                        onSelect={handleOnSelect}
                        onFocus={handleOnFocus}
                        autoFocus
                    /> */}
                </div>
                <div className="list-icon-tool-bar">
                    <div className="icon-tool-bar"><i class='bx bx-rotate-right'></i></div>
                    <div className="icon-tool-bar"><i class='bx bx-filter'></i></div>
                    <div className="icon-tool-bar"><i class='bx bx-cog'></i></div>

                </div>

            </div>
            <div className="table-container">
                <table className="table table-hover table-striped receipt-table">
                    <thead className="thead-column">
                        <tr>
                            {Object.entries(props.listColumn).map(titleHeader => {
                                if (titleHeader[1]) {
                                    arrayHeaders.push(titleHeader[0])
                                }
                            })}
                            {arrayHeaders != null ? arrayHeaders.map((column, index) => <th key={index} data-sortable="true" scope="col">{toSentence(editHeader(column))}</th>) : ""}
                            <th>Action</th>
                        </tr>

                    </thead>
                    <tbody>
                        {props.listData != null ? props.listData.map((purchaseOrder, index) => (
                            <tr key={index} >


                                {arrayHeaders.map(header => {

                                    return <td>{Object.entries(purchaseOrder)[Object.entries(purchaseOrder).map(item => item[0]).indexOf(header)][1]}</td>
                                })}

                                <th>
                                 <i  onClick={() => props.deleteItemn(index)} class='bx bxs-trash' ></i>
                                 <i onClick={() => props.onRowClick(purchaseOrder)} class='bx bxs-edit' ></i> 
                                </th>


                            </tr>
                        )
                        ) : <tr>No data</tr>}
                  


                        {
                            props.listData.length !== 20 ? Array.apply(null, Array(20- props.listData.length)).map((val, idx) => (<tr><th colspan="100"><p></p></th></tr>)) : ""
                        }
                        {/* {props.listData != null && props.listData.length < props.sizePerPage ? Array(rowCount- props.listData.length).map(() => <tr></tr>) : ""} */}

                    </tbody>
                </table>
            </div>
            <div className="paging-container">

                <div className="left-size-paging">
                    <select className="select-row-table">
                        {rowCount.map(value => <option value={value}>{value}</option>)}
                        
                    </select>
                    <span>Showing result {props.currentPage} - {props.pageCount} out of {props.currentPage}</span>
                </div>
                <div className="button-paging">
                    <img onClick={() => props.backPagingClick()} src="..\src\js\images\left-arrow.svg" /> {props.currentPage}
                    <img onClick={() => props.nextPagingClick()} src="..\src\js\images\right-arrow.svg" />
                </div>
            </div>
        </div>)
}