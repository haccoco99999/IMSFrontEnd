import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
//css
import "../goodreceipt.css";
import Table from "../../list-products-table/ListProductsTable";

//components
// import { getConfirmedPODetailsAction } from "../create/action";
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

  // const [listEditHeader, setListHeader] = useState({
  //   id: "Product ID",
  //   productVariantName: "Name",
  // });

  const [isFromManagerPage, setIsFromManagerPage] = useState(true);

  const {
    list_Products,
    suppliers,
    goodsreceiptId,
    purchaseOrderId,
    createDate,
    token,
  } = useSelector((state) => ({
    list_Products:
      state.getGoodsReceiptDetailsReducer.receivingOrder.receivedOrderItems,
    suppliers: state.getGoodsReceiptDetailsReducer.receivingOrder.supplier,
    goodsreceiptId: state.getGoodsReceiptDetailsReducer.receivingOrder.id,
    purchaseOrderId:
      state.getGoodsReceiptDetailsReducer.receivingOrder.purchaseOrderId,
    createDate:
      state.getGoodsReceiptDetailsReducer.receivingOrder.transaction
        .createdDate,
    token: state.client.token,
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

  return (
    <div>

      <div className=" tab-fixed container-fluid  fixed-top">
        {/* todo: task heading */}
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
      </div>
      {returnData && (
        <div className="wrapper space-top">
          {/* content details */}
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
                <h5 className="id-color">{createDate.split("T")[0]}</h5>
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
      )}
      {returnData && (
        <div className="wrapper mt-3">
          <Table
            //   listHeaderEdit={listEditHeader}
            listColumn={listValueColumn}
            listData={list_Products}
          />
        </div>
      )}{" "}
      *
    </div>
  );
}
