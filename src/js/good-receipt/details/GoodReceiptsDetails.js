import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import BootstrapTable from "react-bootstrap-table-next";
//css
import "../goodreceipt.css";
// import Table from "../../list-products-table/ListProductsTable";

//components
// import { getConfirmedPODetailsAction } from "../create/action";
import NavigationBar from "../../stock-take/components/navbar-component";
import GetDetailsAction from "./action";

export default function details() {
  let history = useHistory();
  let location = useLocation();
  let dispatch = useDispatch();

  const [returnData, setReturnData] = useState(false);

  const [listValueColumn, setListColumn] = useState([
    {
      id: "Product ID",
    },
    {
      productVariantName: "Name",
    },
    {
      quantityReceived: "Quantity",
    },
  ]);

  //todo: declare bootstrap table
  const columns = [
    
    {
      dataField: "productVariantId",
      text: "Variant ID",
    },
    {
      dataField: "productVariantName",
      text: "Variant Name",
    },
    { dataField: "quantityReceived", text: "Received " },
  ];

  const [isFromManagerPage, setIsFromManagerPage] = useState(true);

  const {
    listProductsStore,
    suppliers,
    goodsreceiptId,
    purchaseOrderId,
    // createDate,
    transactionRecordStore,
    token,
  } = useSelector((state) => ({
    listProductsStore:
      state.getGoodsReceiptDetailsReducer.receivingOrder.receivedOrderItems,
    suppliers: state.getGoodsReceiptDetailsReducer.receivingOrder.supplier,
    goodsreceiptId: state.getGoodsReceiptDetailsReducer.receivingOrder.id,
    purchaseOrderId:
      state.getGoodsReceiptDetailsReducer.receivingOrder.purchaseOrderId,
    createDate:
      state.getGoodsReceiptDetailsReducer.receivingOrder.transaction
        .createdDate,
    token: state.client.token,
    transactionRecordStore:
      state.getGoodsReceiptDetailsReducer.receivingOrder.transaction
        .transactionRecord,
  }));

  console.log(suppliers);

  useEffect(() => {
    dispatch(
      GetDetailsAction({ id: location.state.goodsreceiptId, token: token })
    );

    // check khi true false
    setReturnData(true);

    // check tu page nao toi

    if (location.state.fromPage !== "ManagerPage") {
      setIsFromManagerPage(false);
    }
  }, []);

  function goBackClick() {
    history.goBack();
  }

  function goToManagerPage() {
    history.push("/homepage/good-receipt/");
  }
  //todo: function navBar button
  const listButton = setListButtonNav();

  function setListButtonNav() {
    return [{}];
  }

  return (
    <div>
      {/* <div className=" tab-fixed container-fluid  fixed-top">
        <div className=" tab-fixed tab-fixed--details container-fluid  fixed-top">
          <div className=" d-flex  mb-3 justify-content-start mt-4 ">
            {isFromManagerPage ? (
              <a className="me-2" onClick={goBackClick}>
                <h3>Back</h3>
              </a>
            ) : (
              <a className="me-2" onClick={goToManagerPage}>
                <h3>Home Page</h3>
              </a>
            )}
          </div>
        </div>
      </div> */}
      <NavigationBar
        listButton={listButton}
        titleBar="Details"
        actionGoBack={goBackClick}
        status=""
      />

      {returnData && (
        <>
          <div className="wrapper space-top">
            <div className="wrapper-content shadow">
              <div className="title-heading mt-2">
                <span>Goods Receipt Details</span>
              </div>
              <nav>
                <div className="nav nav-tabs" id="nav-tab" role="tablist">
                  <button
                    className="nav-link active"
                    id="nav-info-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#nav-info"
                    type="button"
                    role="tab"
                    aria-controls="nav-info"
                    aria-selected="true"
                  >
                    General Information
                  </button>
                  <button
                    className="nav-link"
                    id="nav-received-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#nav-received"
                    type="button"
                    role="tab"
                    aria-controls="nav-received"
                    aria-selected="false"
                  >
                    List Received Items
                  </button>
                </div>
              </nav>
              <div class="tab-content" id="nav-tabContent">
                <div
                  className="tab-pane fade show active"
                  id="nav-info"
                  role="tabpanel"
                  aria-labelledby="nav-info-tab"
                >
                  <div className="shadow wrapper-content">
                    {/* Details Title*/}
                    <div class="d-flex justify-content-between mb-3">
                      <div>
                        <h5>Goods Receipt ID</h5>
                        <h5 className="id-color">{goodsreceiptId}</h5>
                      </div>
                      <div>
                        <h5>Purchase Order ID</h5>
                        <h5 className="id-color"> {purchaseOrderId}</h5>
                      </div>
                      <div>
                        <h5>Create Date</h5>
                        <h5 className="id-color">
                          {/* {createDate.split("T")[0]} */}
                          {transactionRecordStore[0].date.split("T")[0]}
                        </h5>
                      </div>
                      <div>
                        <h5>Created By</h5>
                        <h5 className="id-color">
                          {transactionRecordStore[0].applicationUser.userName}
                        </h5>
                      </div>
                    </div>
                    {/* Details Info Small  */}
                    <div className="mt-3">
                      <p>
                        <strong>Supplier:</strong> {suppliers.supplierName}
                      </p>
                      <p>
                        <strong>Email:</strong> {suppliers.email}
                      </p>
                      <p>
                        <strong>Phone No:</strong> {suppliers.phoneNumber}
                      </p>
                    </div>
                  </div>
                </div>
                <div
                  class="tab-pane fade"
                  id="nav-received"
                  role="tabpanel"
                  aria-labelledby="nav-received-tab"
                >
                  <div className="shadow wrapper-content mt-3">
                    <BootstrapTable
                      keyField="productVariantId"
                      noDataIndication="Table is Empty"
                      columns={columns}
                      data={listProductsStore}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>{" "}
        </>
      )}
      {/* {returnData && (
        <div className="shadow wrapper-content mt-3">
          <Table
            listColumn={listValueColumn}
            listData={list_Products}
          />
          <BootstrapTable
            keyField="id"
            noDataIndication="Table is Empty"
            columns={columns}
            data={listProductsStore}
          />
        </div>
      )}{" "} */}
    </div>
  );
}
