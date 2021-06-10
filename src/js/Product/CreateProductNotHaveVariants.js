import React from "react";
import "./product.css";
export default function CreateProductNotHaveVariants() {
  return (
    <div className="wrapper">
      <div className=" tab-fixed fixed-top border-bottom shadow">
        <div className=" d-flex mb-3 justify-content-end mt-4">
          <h2 className=" supplierid-color me-auto">Create new product</h2>
          <button className="btn btn-default">Cancel</button>
          <button className="btn btn-primary button me-3 text-white">
            Continue
          </button>
          {/* <button className="btn btn-warning button me-3">Add Value</button> */}
        </div>
      </div>

      <div className="d-flex flex-column align-items-center wrapper-spacetop">
        <div className="wrapper-table mt-3">
          <h1 className="id-color">Dell monitor 27" U2720DE </h1>
          <div class="d-flex justify-content-around ">
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
        </div>

        <div className="wrapper_create  mt-3 shadow ">
          <form className="ms-3 me-3">
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

   
        <div className="wrapper_create  mt-3 shadow ">
          <div className="d-flex justify-content-center">
            <div className="wrapper-table">
              <table class="table ">
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
