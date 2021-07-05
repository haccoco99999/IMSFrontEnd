import React, { useState, useEffect, useReducer } from "react";
import { useHistory,useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
//css
import "../stocktake.css";
//components
import AdjustInventory from "./adjust-inventory";
import { getDetailsStockTakeAction } from "./action";
import TableProduct from '../../list-products-table/ListProductsTable'

export default function details() {
  let history = useHistory();
  let dispatch = useDispatch();
  let location = useLocation();

  const { token, listCheckItemsStore, stocktakeDetailsStore } = useSelector(
    (state) => ({
      token: state.client.token,
      listCheckItemsStore:
        state.getDetailsStocktakeReducer.goodIssue.checkItems,
      stocktakeDetailsStore: state.getDetailsStocktakeReducer.goodIssue,
    })
  );
  function goBackClick() {
    history.goBack();
  }

  useEffect(() => {
    dispatch(
      getDetailsStockTakeAction({
        id: location.state.stocktakeId,
        token: token,
      })
    );
  }, []);
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
              <h2 class="id-color fw-bold">{stocktakeDetailsStore.id}</h2>
              <div class="form-text id-color">Stock take complete</div>
            </div>
            <div>
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
            </div>
          </div>
        </div>
      </div>

      <div className="wrapper space-top">
        <div className="wrapper-content shadow">
          {/* Show info */}

          {/* <div className="row g-3 justify-content-between me-3">
            <div className="col-4">
              <p>
                <strong>Created by:</strong> Huy Nguyen
              </p>
              <p>
                <strong>Submitted by:</strong> Huy Nguyen{" "}
              </p>
              <p>
                <strong>Adjusted by:</strong> Mr. Hung
              </p>
            </div>
            <div className="col-4">
              <p>
                <strong>Create date:</strong> 05/12/2021
              </p>
              <p>
                <strong>Submit date:</strong> 05/12/2021
              </p>
              <p>
                <strong>Adjust date:</strong> 05/21/2021
              </p>
            </div>
          </div> */}
          <div className="mt-3">

          </div>
        </div>
      </div>
      <AdjustInventory />
    </div>
  );
}
