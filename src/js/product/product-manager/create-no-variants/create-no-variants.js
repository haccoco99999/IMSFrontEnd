import React from "react";

import "../../product.css";

export default function () {
  //   todo: gop chung 2 bang , sau do tach ra
  return (
    <div className="home_content ">
      {/* todo: task heading */}
      <div className=" tab-fixed container-fluid  fixed-top">
        <div className=" d-flex mb-3 justify-content-end mt-4 ">
          <h2>Back</h2>
          <h2 className="id-color fw-bold me-auto">Create new Product</h2>
          <div>
            {/* <button className="btn btn-default button-tab">Cancel</button> */}
            <button className="btn btn-primary button-tab me-3 text-white">
              Continue
            </button>
            <button className="btn btn-primary button-tab me-3 text-white">
              Save
            </button>
          </div>
        </div>
      </div>

      {/* content */}
      <div className="wrapper space-top">
        {/* show product details */}
        <h2 className="id-color fw-bold mb-3">Dell monitor 27" U2720DE</h2>
        <div class="d-flex justify-content-around  mb-3">
          <div>
            <h5>Product ID</h5>
            <h5 className="id-color">282170181</h5>
          </div>
          <div>
            <h5>Barcode</h5>
            <h5 className="id-color"> SGH12008</h5>
          </div>
          <div>
            <h5>Category</h5>
            <h5 className="id-color">Ultrasharp</h5>
          </div>
          <div>
            <h5>Brand</h5>
            <h5 className="id-color">Dell</h5>
          </div>
        </div>

        {/* content  */}

        <div className="wrapper-content shadow">
          <form>
            <div class="mb-3">
              <label for="sku" class="col-form-label">
                SKU
              </label>{" "}
              <input type="text" id="sku" class="form-control" />
            </div>
            <div class="mb-3">
              <div class="row g-3 align-items-center">
                <div class="col">
                  <label for="salesprice" class="col-form-label">
                    Salesprice
                  </label>{" "}
                  <input type="text" id="salesprice" class="form-control" />
                </div>
                <div class="col">
                  <label for="quantity" class="col-form-label">
                    Quantity
                  </label>{" "}
                  <input type="text" id="quantity" class="form-control" />
                </div>
                <div class="mb-3">
                  <label for="salesprice" class="col-form-label">
                    Location
                  </label>{" "}
                  <textarea
                    class="form-control"
                    id="salesprice"
                    rows="3"
                    placeholder="Write product location here"
                  ></textarea>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
