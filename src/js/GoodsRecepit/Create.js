import React from "react";
import "./goodsreceipt.css";
export default function Add() {
  return (
    <div className="wrapper overflow-scroll">
      <div className=" tab-fixed fixed-top">
        <div className=" d-flex mb-3 justify-content-end mt-4">
          <h2>Back</h2>
          <h2 className=" supplierid-color me-auto">Create goods receipt </h2>
          <button className="btn btn-danger button me-3">Cancel</button>
          <button className="btn btn-primary button me-3">Save</button>
        </div>
      </div>

      <div className="d-flex flex-column align-items-center wrapper-spacetop">
        <div className="wrapper_create d-flex justify-content-center mt-3 shadow ">
          <form>
            <div className="wrapper_suppliername mt-3">
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
            <div className="wrapper_suppliername">
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
            {/* <div className="wrapper_suppliername">
                <div class="row g-3 align-items-center">
                  <div class="col">
                    <label for="inputEmail" class="col-form-label">
                      Email
                    </label>{" "}
                    <input
                      type="text"
                      id="inputEmail"
                      class="form-control"
                      //aria-describedby="passwordHelpInline"
                    />
                  </div>
                  <div class="col">
                    <label for="inputphoneno" class="col-form-label">
                      Phone No.
                    </label>{" "}
                    <input
                      type="tel"
                      id="inputphoneno"
                      class="form-control"
                      // aria-describedby="passwordHelpInline"
                    />
                  </div>
                </div>
              </div>
  
              <div class=" wrapper_suppliername mb-3 mt-3">
                <label for="note" class="form-label">
                  Note
                </label>
                <textarea class="form-control" id="note" rows="3"></textarea>
              </div> */}
          </form>
        </div>

        <div className="wrapper_create d-flex justify-content-center mt-3 shadow ">
          <table class="table ">
            <thead>
              <tr>
                <th>Product No.</th>
                <th colspan="3">Product Name</th>
                <th>Quantity</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td colspan="3">Dell Monitor U2491H - Black</td>
                <td>42</td>
              </tr>
            </tbody>
          </table>
        </div>
        {/* details */}
        <div className="wrapper_create mt-3 shadow ">
          <div class="d-flex justify-content-around ">
            <div>
              <h5>Goods receipt ID</h5>
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
          {/* content */}
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
