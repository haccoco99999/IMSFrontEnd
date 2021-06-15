import React from "react";

import "../../product.css";
export default function () {
  return (
    //   todo: gop chung 2 bang , sau do tach ra
    <div className="home_content overflow-scroll ">
      {/* todo: task heading */}
      {/* todo: gop chung 2 page voi 2 nut khâc nhau  */}
      <div className=" tab-fixed container-fluid  fixed-top">
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
      </div>

      {/* content */}
      <div className="wrapper space-top">
        {/* show product details */}
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

        {/* content details create each variants */}
        {/* one  */}
        <div className="wrapper-content shadow">
          {/* name variant  */}
          <div className="title-heading mt-2">
            <span>Dell monitor 27" U2720DE</span>
          </div>

          {/* content change */}
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

        {/* two */}
        <div className="wrapper-content shadow mt-3"></div>

        {/* details component */}
        <div className="mt-3">
          {/* tab */}
          <ul class="nav nav-tabs" id="myTab" role="tablist">
            <li class="nav-item" role="presentation">
              <button
                class="nav-link active"
                id="home-tab"
                data-bs-toggle="tab"
                data-bs-target="#home"
                type="button"
                role="tab"
                aria-controls="home"
                aria-selected="true"
              >
                Black-S
              </button>
            </li>
          </ul>

          {/* table */}
          <div class="tab-content" id="myTabContent">
            <div
              class="tab-pane fade show active  wrapper_create  shadow"
              id="home"
              role="tabpanel"
              aria-labelledby="home-tab"
            >
              <table class="table shadow ">
                <thead>
                  <tr>
                    <th scope="col">SKU</th>
                    <th scope="col">Salesprice</th>
                    <th scope="col">Unit</th>
                    <th scope="col">Quantity</th>
                    <th scope="col"> Location </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>865943946447</td>
                    <td>VND 6300000</td>
                    <td>Unit</td>
                    <td>20</td>
                    <td>Zone A,line A, shelfB, fl3</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
