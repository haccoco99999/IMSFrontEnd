import React from "react";

import "./stocktake.css";
import AdjustInventoryModal from "./AdjustInventoryModal";
export default function Details() {
  return (
    <div class="wrapper">
      <div className=" tab-fixed fixed-top border-bottom shadow">
        <div className=" d-flex mb-3 justify-content-end mt-4">
          {/* me-auto */}
          <div class="me-auto">
            <h2 class="id-color">272005181</h2>
            <div class="form-text id-color">Stock take complete</div>
          </div>
          <button className="btn btn-danger btn-reject text-white me-3">
            Reject
          </button>
          <button
            type="button"
            data-bs-target="#AdjustInventoryModal"
            data-bs-toggle="modal"
            className="btn btn-primary btn-adjust  me-3 text-white"
          >
            Adjust inventory
          </button>
        </div>
      </div>

      <div className="d-flex justify-content-center wrapper-spacetop">
        <div class="d-flex justify-content-center ">
          <div className="wrapper-content  mt-3 shadow ">
            {/* Show info */}
            <div className=" d-flex justify-content-center">
              <div className="row  wrapper-table mt-3">
                <div className="col">
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
                <div className="col">
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
              </div>
            </div>

            {/* Table */}
            <div className="d-flex justify-content-center">
              <div class="wrapper-table">
                <table class="table ">
                  <thead>
                    <tr>
                      <th scope="col">Product ID</th>
                      <th scope="col">Product Name</th>
                      <th scope="col">Quantity</th>
                      <th scope="col">Actual Quantity </th>

                      <th scope="col">Note </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="id-color">272005181</td>
                      <td>Progressing</td>
                      <td>05/22/2021</td>
                      <td>05/22/2021</td>
                      <td></td>
                    </tr>

                    <tr>
                      <td className="id-color">272005181</td>
                      <td>Huy</td>
                      <td>Complete</td>
                      <td>05/22/2021</td>
                      <td>05/22/2021</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      <AdjustInventoryModal />
    </div>
  );
}
