import React from "react";

import "./product.css";

export default function () {
  return (
    <div className="home_content wrapper">
      <div className="title-heading mt-2">
        <span>Product Manager </span>
      </div>
      <div className="wrapper-empty wrapper-content align-items-center d-flex justify-content-center">
        <div className="text-center">
          <h3>Your inventory does not have any product</h3>{" "}
          <h5>Long list gonna be showed here</h5>{" "}
          <img
            src="..\src\js\images\shopping.png"
            class="image-empty mt-3"
            alt="..."
          />{" "}
          <div className="d-flex justify-content-center mt-4">
            <button className="btn btn-warning">
              Create the first product
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
