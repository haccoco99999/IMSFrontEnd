import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import BootstrapTable from "react-bootstrap-table-next";
import moment from "moment";
//css
import "../goodreceipt.css";
// import Table from "../../list-products-table/ListProductsTable";

//components
// import { getConfirmedPODetailsAction } from "../create/action";
import NavigationBar from "../../components/navbar/navbar-component";
import GetDetailsAction from "./action";
import { TableLoading } from "../../components/loading/loading-component";
import { RESET } from "./constants";
export default function details() {
  let history = useHistory();
  let location = useLocation();
  let dispatch = useDispatch();

  const [returnData, setReturnData] = useState(false);

  //todo: declare bootstrap table
  const columns = [
    {
      dataField: "productVariantId",
      text: "Variant ID",
      hidden: true,
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
    getGoodsReceiptDetailsReducer,
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
    getGoodsReceiptDetailsReducer: state.getGoodsReceiptDetailsReducer,
  }));

  // console.log(suppliers);

  useEffect(() => {
    dispatch(
      GetDetailsAction({ id: location.state.goodsreceiptId, token: token })
    );

    if (location.state.fromPage !== "ManagerPage") {
      setIsFromManagerPage(false);
    }

    return () => {
      dispatch({ type: RESET });
    };
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

  useEffect(() => {
    if (getGoodsReceiptDetailsReducer.successful) {
      setReturnData(true);
    }
  }, [getGoodsReceiptDetailsReducer]);
  return (
    <div>
      {returnData ? (
        <>
          <NavigationBar
            listButton={listButton}
            titleBar={location.state.goodsreceiptId}
            actionGoBack={goBackClick}
            status=""
            home="Goods receipt"
            currentPage="Goods receipt details"
          />
          <div className="wrapper">
            <div class="card">
              <div class="card-header fw-bold">Goods receipt Information</div>
              <ul class="list-group list-group-flush">
                <li class="list-group-item">
                  <div className="row g-3 justify-content-between me-3">
                    <div className="col-4">
                      <p>
                        <strong>Goods Receipt ID:</strong> {goodsreceiptId}
                      </p>
                      <p>
                        <strong>Purchase Order ID:</strong> {purchaseOrderId}
                      </p>
                      <p>
                        <strong>Created Date: </strong>{" "}
                        {moment(transactionRecordStore[0].date.split("T")[0])
                          .add(7, "h")
                          .format("DD-MM-YYYY")}
                      </p>
                      <p>
                        <strong>Created By:</strong>{" "}
                        {transactionRecordStore[0].applicationUser.fullname}
                      </p>
                    </div>
                    <div className="col-4">
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

                
                </li>
                <li class="list-group-item">
                  <h5 class="card-title">List of received products</h5>
                  <BootstrapTable
                    keyField="productVariantId"
                    noDataIndication="Table is Empty"
                    columns={columns}
                    data={listProductsStore}
                  />
                </li>
                {/* <li class="list-group-item">A third item</li> */}
              </ul>
            </div>
            {/* <div className="wrapper-content shadow">
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
                  <div className="shadow wrapper-content"></div>
                </div>
                <div
                  class="tab-pane fade"
                  id="nav-received"
                  role="tabpanel"
                  aria-labelledby="nav-received-tab"
                >
                  <div className="shadow wrapper-content mt-3"></div>
                </div>
              </div>
            </div> */}
          </div>
        </>
      ) : (
        <TableLoading />
      )}
    </div>
  );
}
