import React from "react";

import "./goodissue.css";
import PrinterModal from "./printer";
export default function progressing() {
  return (
    <div className="home_content">
      {/* todo: task heading */}
      {/* todo: gop chung 2 page voi 2 nut khâc nhau  */}
      <div className=" tab-fixed container-fluid  fixed-top">
        {/* todo: task heading */}
        <div className=" tab-fixed container-fluid  fixed-top">
          <div className=" d-flex mb-3 justify-content-end mt-4 ">
            <h2>Back</h2>
            <div class="me-auto">
              <h2 class="id-color fw-bold">272005181</h2>
              <div class="form-text id-color">Packing</div>
            </div>
            <div>
              <button className="btn btn-danger me-3 button-tab">Cancel</button>
              <button
                type="button"
                data-bs-target="#PrinterModal"
                data-bs-toggle="modal"
                className="btn btn-primary button-tab me-3 text-white"
              >
                Shipping
              </button>
              <button className="btn btn-primary button-tab me-3 text-white">
                Confirm
              </button>
              <button
                type="button"
                className="btn btn-primary button-tab me-3 text-white"
              >
                Submit
              </button>
              <button className="btn btn-primary me-3 button--create-goodIssue text-white">
                Create good issue
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* content */}
      <div className="wrapper space-top">
        {/* Details Info  */}
        <div className="row g-3 justify-content-between me-3">
          <div className="col-4">
            <p>
              <strong>Created by: </strong> Huy Nguyen
            </p>
            <p>
              <strong>Customer: </strong> Huy Nguyen
            </p>
            <p>
              <strong>Create date:</strong> 05/12/2021
            </p>
            <p>
              <strong>Delivery method:</strong> GHTK
            </p>
          </div>
          <div className="col-4">
            <p>
              <strong>Email</strong> hoatt@gmail.com
            </p>
            <p>
              <strong>Phone No.</strong> 0909.004.002
            </p>
            <p>
              <strong>Delivery date:</strong> 05/12/2021
            </p>
          </div>
        </div>
      </div>
      <PrinterModal />
    </div>
  );
}
