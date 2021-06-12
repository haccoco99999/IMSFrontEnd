import React from "react";

import "./goodreceipt.css";

export default function () {
  return (
    <div className="home_content ">
      {/* todo: task heading */}
      {/* todo: gop chung 2 page voi 2 nut khâc nhau  */}
      <div className=" tab-fixed container-fluid  fixed-top">
        {/* todo: task heading */}
        <div className=" tab-fixed container-fluid  fixed-top">
          <div className=" d-flex mb-3 justify-content-end mt-4 ">
            <h2>Back</h2>
            <h2 className="id-color fw-bold me-auto">Create Goods Receipt</h2>
            <div>
              <button className="btn btn-danger me-3 button-tab">Cancel</button>

              <button className="btn btn-primary button-tab me-3 text-white">
                Save
              </button>
            </div>
          </div>
        </div>

        {/* content */}
        <div className="wrapper space-top">
          <div className="shadow wrapper-content">
            <form>
              <div className="mt-3">
                {/* search */}
                <label for="search" class="form-label">
                  Purchase Order ID
                </label>
                <select class="form-select" aria-label="Default select example">
                  <option selected disabled>
                    Select Order ID
                  </option>
                  <option value="1">One</option>
                  <option value="2">Two</option>
                  <option value="3">Three</option>
                </select>
              </div>
              {/* Details  */}
              <div className="mt-3">
                <p>
                  <strong>Supplier:</strong> TNHH ABC
                </p>
                <p>
                  <strong>Email:</strong> THNHHABC@gmail.com
                </p>
                <p>
                  <strong>Phone No:</strong> 0909. 004. 002{" "}
                </p>
              </div>
            </form>
          </div>
        </div>



      </div>
    </div>
  );
}
