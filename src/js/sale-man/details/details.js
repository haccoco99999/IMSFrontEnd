import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";

import "../sale-man.css";

import Table from "../../list-products-table/ListProductsTable";
import { getPRDetailsAction } from "./action";

export default function details() {
  let history = useHistory();
  let dispatch = useDispatch();
  let location = useLocation();

  const [listValueColumn, setListColumn] = useState([
    {
      productVariantId: "Product Id",
    },
    {
      name: "Product Name",
    },
    {
      orderQuantity: "Order Quantity",
    },
  ]);

  const { status, createdBy, createDate, listGetProducts } = useSelector(
    (state) => ({
      status:
        state.getDetailsPurchaseRequisitionReducer.purchaseRequisitionDetails
          .purchaseOrderStatus,
      createdBy:
        state.getDetailsPurchaseRequisitionReducer.purchaseRequisitionDetails
          .transaction.createdBy.userName,
      createDate:
        state.getDetailsPurchaseRequisitionReducer.purchaseRequisitionDetails
          .transaction.createdDate,
      listGetProducts:
        state.getDetailsPurchaseRequisitionReducer.purchaseRequisitionDetails
          .purchaseOrderProduct,
    })
  );

  const [cleanJson, setCleanJson] = useState();

  const [returnData, setReturnData] = useState(false);

  function goBackClick() {
    history.goBack();
  }

  useEffect(() => {
    dispatch(getPRDetailsAction({ id: location.state.purchaseRequisitionId }));
  }, []);

  useEffect(() => {
    if (listGetProducts !== null) {
      setCleanJson(
        listGetProducts.map((product) => {
          product.name = product.productVariant.name;
          delete product["productVariant"];
          return product;
        })
      );
      setReturnData(true);
    }
  }, [listGetProducts]);
  console.log("LIST", cleanJson);

  return (
    <div>
      {/* todo: task heading */}
      {/* todo: gop chung 2 page voi 2 nut khâc nhau  */}
      <div className=" tab-fixed container-fluid  fixed-top">
        {/* todo: task heading */}
        <div className=" tab-fixed container-fluid  fixed-top">
          <div className=" d-flex mb-3 justify-content-end mt-4 ">
            <a className="me-2" onClick={goBackClick}>
              <h3>Back</h3>
            </a>
            <div class="me-auto">
              <h2 class="id-color fw-bold">
                {location.state.purchaseRequisitionId}
              </h2>
              <div class="form-text id-color">{status}</div>
            </div>
            {/* <div>
          <button className="btn btn-danger button-tab me-3 text-white">
            Reject
          </button>
          <button
            type="button"
            data-bs-target="#AdjustInventoryModal"
            data-bs-toggle="modal"
            className="btn btn-primary button-tab--adjust me-3 text-white"
          >
            Adjust Inventory
          </button>
        </div> */}
          </div>
        </div>
      </div>
      <div className="wrapper space-top">
        <div className="wrapper-content shadow">
          {/* Show info */}

          <div className="row g-3 justify-content-between me-3">
            <div className="col-4">
              <p>
                <strong>Created by:</strong> {createdBy}
              </p>
              {/* <p>
                    <strong>Submitted by:</strong> Huy Nguyen{" "}
                </p>
                <p>
                    <strong>Adjusted by:</strong> Mr. Hung
                </p> */}
            </div>
            <div className="col-4">
              <p>
                <strong>Create date:</strong>
                {createDate.split("T")[0]}
              </p>
              {/* <p>
                    <strong>Submit date:</strong> 05/12/2021
                </p>
                <p>
                    <strong>Adjust date:</strong> 05/21/2021
                </p> */}
            </div>
          </div>
        </div>

        {returnData && (
          <div className="wrapper-content shadow mt-3">
            <Table listColumn={listValueColumn} listData={cleanJson} />
          </div>
        )}
      </div>
    </div>
  );
}
