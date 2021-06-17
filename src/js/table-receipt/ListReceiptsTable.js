import React from "react";
import "./list-receipts-table.css";

export default function ListReceiptTable(props) {
  const x = "purchaseOrderNumber";
  let arrayHeaders = [];

  let indexHeaders = props.listData != null ? 
    props.listData[0] == null
      ? []
      : (indexHeaders = Object.entries(props.listData[0]).map(
          (item) => item[0]
        )): [];

  function toSentence(words) {
    var result = words.replace(/([A-Z])/g, " $1");
    var finalResult = result.charAt(0).toUpperCase() + result.slice(1);
    return finalResult;
  }
  function editHeader(header) {
    var editedHeader = header;
    Object.entries(props.listHeaderEdit).map((titleHeader) => {
      if (header === titleHeader[0]) {
        editedHeader = titleHeader[1];
      }
    });
    return editedHeader;
  }

  return (
    <div className="list-receipt-table-container">
      <div className="form-group search-purchase">
        <img src="..\src\js\images\search.svg" alt="icon-search" />
        <input
          name="keySearch"
          type="text"
          className="form-control"
          placeholder="Search by Order ID or Supplier Name"
        />
      </div>
      <div className="table-container">
        <table className="table table-hover receipt-table">
          <thead>
            <tr>
              {Object.entries(props.listColumn).map((titleHeader) => {
                if (titleHeader[1]) {
                  arrayHeaders.push(titleHeader[0]);
                }
              })}
              {arrayHeaders != null
                ? arrayHeaders.map((column, index) => (
                    <th key={index} scope="col">
                      {toSentence(editHeader(column))}
                    </th>
                  ))
                : ""}
            </tr>
          </thead>
          <tbody>
            {props.listData != null ? (
              props.listData.map((purchaseOrder, index) => (
                <tr key={index} onClick={() => props.onRowClick(purchaseOrder)}>
                  {/* {console.log(Object.keys(purchaseOrder))} */}
                  {/* { Object.entries(purchaseOrder).map(item=>{
                        if(arrayHeaders.includes(item[0])){
                           return <td>{item[1]}</td>
                        }
                        
                    })} */}

                  {arrayHeaders.map((header) => {
                    // indexHeaders.indexOf(header) lay thu tu trong list
                    return (
                      <td>
                        {
                          Object.entries(purchaseOrder)[
                            Object.entries(purchaseOrder)
                              .map((item) => item[0])
                              .indexOf(header)
                          ][1]
                        }
                      </td>
                    );
                  })}

                  {/* <th scope="row"><input type="checkbox" /></th> */}
                  {/* <td>{purchaseOrder.purchaseOrderNumber}</td>
                        <td>{purchaseOrder.confirmedByName}</td>
                        <td>{purchaseOrder.status}</td>
                        <td>{purchaseOrder.totalPrice}</td>
                        <td>{purchaseOrder.deliveryDate.split("T")[0]}</td>
                        <td>{purchaseOrder.createdDate.split("T")[0]}</td> */}
                </tr>
              ))
            ) : (
              <tr>No data</tr>
            )}
            {props.listData != null && props.listData.length < props.sizePerPage
              ? Array(props.sizePerPage - props.listData.length).map(() => (
                  <tr></tr>
                ))
              : ""}
          </tbody>
        </table>
      </div>
      <div className="paging-container">
        <div>
          <span>
            Showing result {props.currentPage} - {props.pageCount} out of{" "}
            {props.currentPage}
          </span>
        </div>
        <div className="button-paging">
          <img
            onClick={() => props.backPagingClick()}
            src="..\src\js\images\left-arrow.svg"
          />{" "}
          {props.currentPage}
          <img
            onClick={() => props.nextPagingClick()}
            src="..\src\js\images\right-arrow.svg"
          />
        </div>
      </div>
    </div>
  );
}
