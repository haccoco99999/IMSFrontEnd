import React from "react";

import "./stocktake.css";

export default function AddjustInventoryModal() {
  return (
    <div>
      <div
        className="modal"
        tabIndex="-1"
        id="AdjustInventoryModal"
        data-bs-keyboard="false"
        data-bs-backdrop="static"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Adjust inventory </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <p>
                Inventory balance will change the amount of inventory in the
                system with the following products
              </p>
              <div>
                <table class="table">
                  <thead>
                    <th>Product</th> <th>Quantity</th>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Dell monitor 24" U2419H - Black</td>
                      <td>60</td>
                    </tr>
                    <tr>
                      <td>Dell monitor 24" U2419H - Black</td>
                      <td>60</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p>
                <strong>Are you sure you want to adjust the stock?</strong>
              </p>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-default"
                data-bs-dismiss="modal"
              >
                No
              </button>
              <button
                type="button"
                className="btn btn-default addaccountmodal-done "
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
