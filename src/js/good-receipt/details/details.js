import React from "react";

import "../goodreceipt.css";
export default function details() {
  return (
    <div className="home_content ">
      {/* todo: task heading */}
      {/* todo: gop chung 2 page voi 2 nut khâc nhau  */}
      <div className=" tab-fixed container-fluid  fixed-top">
        {/* todo: task heading */}
        <div className=" tab-fixed tab-fixed--details container-fluid  fixed-top">
          <div className=" d-flex  mb-3 justify-content-start mt-4 ">
            <h2>Back</h2>
          </div>
        </div>
      </div>

      {/* content */}
      <div className="wrapper space-top">
        {/* content details */}
        <div className="shadow wrapper-content">
          {/* Details Title*/}
          <div class="d-flex justify-content-between mb-3">
            <div>
              <h5>Goods Receipt ID</h5>
              <h5 className="id-color">282170181</h5>
            </div>
            <div>
              <h5>Purchase Order ID</h5>
              <h5 className="id-color"> SGH12008</h5>
            </div>
            <div>
              <h5>Create Date</h5>
              <h5 className="id-color">05/21/2021</h5>
            </div>
          </div>
          {/* Details Info Small  */}
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
        </div>
      </div>
    </div>
  );
}
