import React from "react";

import "./product.css";
import hinhlogo from "../../assets/images/shopping.png";
export default function Empty() {
  return (
    <div className="wrapper">
      <h1>Supplier</h1>
      <div className="d-flex justify-content-center ">
        <div className="wrapper-empty align-items-center d-flex justify-content-center">
          <div className="text-center">
            <h3>Your inventory does not have any goods receipt</h3>{" "}
            <h5>Long list gonna be show here</h5>{" "}
            <img src={hinhlogo} class="imagelogo mt-3" alt="..." />{" "}
            <div className="d-flex justify-content-center mt-4">
              <button className="btn btn-warning">
                Create the first goods receipt
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
