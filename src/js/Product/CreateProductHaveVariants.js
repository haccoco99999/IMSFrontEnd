import React from "react";
import "./product.css";
export default function CreateProductHaveVariants() {
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
          <h3>Dell monitor 27" U2720DE</h3>
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
        {/* todo: Chu y den ID */}
        <div class="mt-3">
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
            <li class="nav-item" role="presentation">
              <button
                class="nav-link"
                id="profile-tab"
                data-bs-toggle="tab"
                data-bs-target="#profile"
                type="button"
                role="tab"
                aria-controls="profile"
                aria-selected="false"
              >
                Black-M
              </button>
            </li>
          </ul>
          <div class="tab-content" id="myTabContent">
            <div
              class="tab-pane fade show active  wrapper_create  shadow"
              id="home"
              role="tabpanel"
              aria-labelledby="home-tab"
            >
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
                  </div></div>
            </div>
            {/* Cai tab thu 2  */}
            <div
              class="tab-pane fade  wrapper_create  shadow"
              id="profile"
              role="tabpanel"
              aria-labelledby="profile-tab"
            >
               <div className="d-flex justify-content-center">
                  <div className="wrapper-table">
                    <table class="table ">
                      <thead>
                        <tr>
                          <th scope="col">Second</th>
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
        {/* <div class="mt-3">
          <nav>
            <div class="nav nav-tabs" id="nav-tab" role="tablist">
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
                  Black S
                </button>
              </li>
              <li class="nav-item" role="presentation">
                <button
                  class="nav-link"
                  id="profile-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#profile"
                  type="button"
                  role="tab"
                  aria-controls="profile"
                  aria-selected="false"
                >
                  Black M
                </button>
              </li>
            </div>
          </nav>
          <div class="tab-content" id="nav-tabContent">
            <div
              class="tab-pane wrapper_create  shadow fade show active"
              id="home"
              role="tabpanel"
              aria-labelledby="home-tab"
            >
              <div className=" ">
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
            
            <div
              class="tab-pane wrapper_create shadow fade"
              id="profile"
              role="tabpanel"
              aria-labelledby="profile-tab"
            >
              <div className=" ">
                <div className="d-flex justify-content-center">
                  <div className="wrapper-table">
                    <table class="table ">
                      <thead>
                        <tr>
                          <th scope="col">Second</th>
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
        </div> */}
      </div>
    </div>
  );
}
