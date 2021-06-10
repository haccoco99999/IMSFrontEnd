import React from "react";
import "./stocktake.css";
import AddMultipleModal from "./AddMultipleModal";
export default function Create() {
  return (
    <div className="wrapper">
      <div className=" tab-fixed fixed-top border-bottom shadow">
        <div className=" d-flex mb-3 justify-content-end mt-4">
          <h2 className=" supplierid-color me-auto">Create Stock Take</h2>
          <button className="btn btn-default">Cancel</button>
          <button className="btn btn-warning button me-3 text-white">
            Save
          </button>
          <button className="btn btn-primary button me-3">Submit</button>
        </div>
      </div>

      <div className="d-flex flex-column align-items-center wrapper-spacetop">
        <div className="wrapper_create d-flex justify-content-center mt-3 shadow ">
          <form className="ms-4 me-4">
            {/* seatrch */}
            <div class="row g-3 align-items-center mt-3">
              <div class="col searchaccount">
                <div class=" ">
                  <div class="input-group input-group-sm mb-3 ">
                    <div class="input-group-prepend ">
                      <span
                        class="input-group-text span-searchiconslot  border-dark"
                        id="inputGroup-sizing-sm"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="18"
                          height="18"
                          fill="currentColor"
                          class="bi bi-search"
                          viewBox="0 0 16 16"
                        >
                          <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                        </svg>
                      </span>
                    </div>

                    <input
                      type="text"
                      class="form-control searchfield-borderless  border-dark"
                      aria-label="Small"
                      aria-describedby="inputGroup-sizing-sm"
                      placeholder="Search by Email, Account ID, Name"
                    />
                  </div>
                </div>
              </div>
              <div class="col-auto">
                <button type="button" class="btn btn-default btn-outline-dark"
                data-bs-target="#AddMultipleModal"
                data-bs-toggle="modal"
                >
                  Add multiple
                </button>
              </div>
            </div>

            {/* table */}
            <div className="d-flex justify-content-center">
              <div className="wrapper-table">
                <table class="table ">
                  <thead>
                    <tr>
                      <th scope="col">Product ID</th>
                      <th colspan="2" scope="col">Product Name </th>
                      <th scope="col">Quantity</th>
                      <th scope="col">Actual Quantity</th>
                      <th scope="col">Note </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="supplierid-color">272005181</td>
                      <td colspan="2">Dell monitor 24” U2419H - Black</td>
                      <td>120</td>
                      <td></td>
                      <td></td>
                    </tr>
                    <tr>
                      <td className="supplierid-color">272005181</td>
                      <td colspan="2">Dell monitor 24” U2419H - Black</td>
                      <td>120</td>
                      <td></td>
                      <td></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </form>
        </div>
      </div>
      <AddMultipleModal/>
    </div>
  );
}
