import React from "react";

export default function CreateNewSupplier() {
  return (
    <div className="wrapper overflow-scroll">
      <div className=" tab-fixed fixed-top">
        <div className=" d-flex mb-3 justify-content-end mt-4">
          <h2>Back</h2>
          <h2 className=" supplierid-color me-auto">Create new supplier</h2>
          <button className="btn btn-danger button me-3">Cancel</button>
          <button className="btn btn-primary button me-3">Save</button>
        </div>
      </div>

      <div className="d-flex flex-column align-items-center wrapper-spacetop">
        <div className="wrapper_create d-flex justify-content-center mt-3 shadow ">
          <form>
            <div className="wrapper_suppliername mt-3">
              <label for="search" class="form-label">
                Supplier Name
              </label>
              <input type="text" class="form-control" id="search" />
            </div>
            <div className="wrapper_suppliername">
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
            </div>
          </form>
        </div>

        <div className="wrapper_create d-flex justify-content-center mt-3 shadow ">
          <form>
            <h1 className="mt-3"> Address</h1>

            <div className="wrapper_suppliername">
              <div class="row g-3 align-items-center">
                <div class="col">
                  <label for="inputEmail" class="col-form-label">
                    City
                  </label>{" "}
                  <select
                    class="form-select"
                    aria-label="Default select example"
                  >
                    <option selected disabled>
                      Select Role
                    </option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                  </select>
                </div>
                <div class="col">
                  <label for="inputphoneno" class="col-form-label">
                    District
                  </label>{" "}
                  <select
                    class="form-select"
                    aria-label="Default select example"
                  >
                    <option selected disabled>
                      Select Role
                    </option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="wrapper_suppliername mt-3">
              <label for="search" class="form-label">
                Address 1
              </label>
              <input type="text" class="form-control" id="search" />
            </div>
            <div>
              <a
                class="btn btn-default me-md-2 add"
                //  data-bs-target="#AddjustDisplayTableModal"
                //    data-bs-toggle="modal"
              >
                {/* <AddAccountModal isShowing={isShowing} hide={toggle} /> */}
                <svg
                  class="svg-icon"
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="#4caf50"
                  class="bi bi-plus-lg"
                  viewBox="0 0 20 20"
                >
                  <path d="M8 0a1 1 0 0 1 1 1v6h6a1 1 0 1 1 0 2H9v6a1 1 0 1 1-2 0V9H1a1 1 0 0 1 0-2h6V1a1 1 0 0 1 1-1z"></path>
                </svg>
                Add another address
              </a>
            </div>
          </form>
        </div>
      </div>

    </div>
  );
}
